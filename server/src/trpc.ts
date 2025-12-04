import { initTRPC, TRPCError } from '@trpc/server';
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { verifyToken, TokenPayload } from './lib/auth.js';

export interface Context {
  user: TokenPayload | null;
}

export const createContext = ({ req }: CreateExpressContextOptions): Context => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader?.startsWith('Bearer ')) {
    return { user: null };
  }
  
  const token = authHeader.substring(7);
  
  try {
    const user = verifyToken(token);
    return { user };
  } catch {
    return { user: null };
  }
};

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Você precisa estar logado para acessar este recurso',
    });
  }
  
  return next({
    ctx: {
      ...ctx,
      user: ctx.user, // Agora garantidamente não é null
    },
  });
});

// Procedure admin - requer autenticação e role admin
export const adminProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Você precisa estar logado para acessar este recurso',
    });
  }
  
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Você não tem permissão para acessar este recurso',
    });
  }
  
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});
