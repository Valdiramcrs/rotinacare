import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { router, protectedProcedure } from '../trpc.js';
import { createDoctorSchema } from '@rotinacare/shared';
import { db } from '../db/index.js';
import { doctors } from '../db/schema.js';
import { eq, and } from 'drizzle-orm';
import { randomUUID } from 'crypto';

export const doctorsRouter = router({
  /**
   * List - lista todos os médicos do usuário
   */
  list: protectedProcedure.query(async ({ ctx }) => {
    const doctorsList = await db
      .select()
      .from(doctors)
      .where(eq(doctors.userId, ctx.user.userId))
      .orderBy(doctors.createdAt);

    return doctorsList;
  }),

  /**
   * Get - busca um médico específico
   */
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const [doctor] = await db
        .select()
        .from(doctors)
        .where(
          and(
            eq(doctors.id, input.id),
            eq(doctors.userId, ctx.user.userId)
          )
        )
        .limit(1);

      if (!doctor) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Médico não encontrado',
        });
      }

      return doctor;
    }),

  /**
   * Create - cria um novo médico
   */
  create: protectedProcedure
    .input(createDoctorSchema)
    .mutation(async ({ input, ctx }) => {
      const doctorId = randomUUID();
      const now = new Date();

      await db.insert(doctors).values({
        id: doctorId,
        userId: ctx.user.userId,
        name: input.name,
        specialty: input.specialty,
        crm: input.crm,
        phone: input.phone || null,
        email: input.email || null,
        city: input.city || null,
        state: input.state || null,
        createdAt: now,
        updatedAt: now,
      });

      return {
        id: doctorId,
        userId: ctx.user.userId,
        ...input,
        createdAt: now,
        updatedAt: now,
      };
    }),

  /**
   * Update - atualiza um médico existente
   */
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: createDoctorSchema.partial(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Verificar se o médico existe e pertence ao usuário
      const [existingDoctor] = await db
        .select()
        .from(doctors)
        .where(
          and(
            eq(doctors.id, input.id),
            eq(doctors.userId, ctx.user.userId)
          )
        )
        .limit(1);

      if (!existingDoctor) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Médico não encontrado',
        });
      }

      // Atualizar médico
      await db
        .update(doctors)
        .set({
          ...input.data,
          updatedAt: new Date(),
        })
        .where(eq(doctors.id, input.id));

      return { success: true };
    }),

  /**
   * Delete - remove um médico
   */
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // Verificar se o médico existe e pertence ao usuário
      const [existingDoctor] = await db
        .select()
        .from(doctors)
        .where(
          and(
            eq(doctors.id, input.id),
            eq(doctors.userId, ctx.user.userId)
          )
        )
        .limit(1);

      if (!existingDoctor) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Médico não encontrado',
        });
      }

      // Deletar médico
      await db.delete(doctors).where(eq(doctors.id, input.id));

      return { success: true };
    }),
});
