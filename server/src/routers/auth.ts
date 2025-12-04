import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { router, publicProcedure, protectedProcedure } from '../trpc.js';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { generateToken, hashPassword, comparePassword, TokenPayload } from '../lib/auth.js';
import { randomUUID } from 'crypto';

export const authRouter = router({
  /**
   * Login - autentica usuário e retorna token JWT
   */
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email('Email inválido'),
        password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
      })
    )
    .mutation(async ({ input }) => {
      // Buscar usuário por email
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, input.email))
        .limit(1);

      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Email ou senha incorretos',
        });
      }

      // Verificar senha
      const isValidPassword = await comparePassword(input.password, user.password);
      
      if (!isValidPassword) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Email ou senha incorretos',
        });
      }

      // Gerar token JWT
      const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role as 'patient' | 'admin' | 'professional',
      });

      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          avatarUrl: user.avatarUrl,
        },
      };
    }),

  /**
   * Register - cria nova conta de usuário
   */
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email('Email inválido'),
        password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
        name: z.string().min(1, 'Nome é obrigatório'),
      })
    )
    .mutation(async ({ input }) => {
      // Verificar se email já existe
      const [existingUser] = await db
        .select()
        .from(users)
        .where(eq(users.email, input.email))
        .limit(1);

      if (existingUser) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'Este email já está cadastrado',
        });
      }

      // Hash da senha
      const hashedPassword = await hashPassword(input.password);

      // Criar usuário
      const userId = randomUUID();
      const now = new Date();

      await db.insert(users).values({
        id: userId,
        email: input.email,
        password: hashedPassword,
        name: input.name,
        role: 'patient',
        createdAt: now,
        updatedAt: now,
      });

      // Gerar token JWT
      const token = generateToken({
        userId,
        email: input.email,
        role: 'patient',
      });

      return {
        token,
        user: {
          id: userId,
          email: input.email,
          name: input.name,
          role: 'patient',
          avatarUrl: null,
        },
      };
    }),

  /**
   * Me - retorna dados do usuário autenticado
   */
  me: protectedProcedure.query(async ({ ctx }) => {
    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
        avatarUrl: users.avatarUrl,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, ctx.user.userId))
      .limit(1);

    if (!user) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Usuário não encontrado',
      });
    }

    return user;
  }),

  /**
   * Update Profile - atualiza dados do perfil
   */
  updateProfile: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, 'Nome é obrigatório').optional(),
        avatarUrl: z.string().url('URL inválida').optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await db
        .update(users)
        .set({
          ...input,
          updatedAt: new Date(),
        })
        .where(eq(users.id, ctx.user.userId));

      return { success: true };
    }),

  /**
   * Change Password - altera senha do usuário
   */
  changePassword: protectedProcedure
    .input(
      z.object({
        currentPassword: z.string().min(6),
        newPassword: z.string().min(6, 'Nova senha deve ter no mínimo 6 caracteres'),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Buscar usuário
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, ctx.user.userId))
        .limit(1);

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Usuário não encontrado',
        });
      }

      // Verificar senha atual
      const isValidPassword = await comparePassword(
        input.currentPassword,
        user.password
      );

      if (!isValidPassword) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Senha atual incorreta',
        });
      }

      // Hash da nova senha
      const hashedPassword = await hashPassword(input.newPassword);

      // Atualizar senha
      await db
        .update(users)
        .set({
          password: hashedPassword,
          updatedAt: new Date(),
        })
        .where(eq(users.id, ctx.user.userId));

      return { success: true };
    }),
});
