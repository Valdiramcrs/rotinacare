import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { router, protectedProcedure } from '../trpc';
import { createMedicationSchema } from '@rotinacare/shared';
import { db } from '../db';
import { medications } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import { randomUUID } from 'crypto';

export const medicationsRouter = router({
  /**
   * List - lista todos os medicamentos do usuário
   */
  list: protectedProcedure.query(async ({ ctx }) => {
    const medicationsList = await db
      .select()
      .from(medications)
      .where(eq(medications.userId, ctx.userId))
      .orderBy(medications.startDate);

    return medicationsList;
  }),

  /**
   * Get - busca um medicamento específico
   */
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const [medication] = await db
        .select()
        .from(medications)
        .where(
          and(
            eq(medications.id, input.id),
            eq(medications.userId, ctx.userId)
          )
        )
        .limit(1);

      if (!medication) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Medicamento não encontrado',
        });
      }

      return medication;
    }),

  /**
   * Create - cria um novo medicamento
   */
  create: protectedProcedure
    .input(createMedicationSchema)
    .mutation(async ({ input, ctx }) => {
      const medicationId = randomUUID();
      const now = new Date();

      await db.insert(medications).values({
        id: medicationId,
        userId: ctx.userId,
        name: input.name,
        dosage: input.dosage,
        frequency: input.frequency,
        startDate: input.startDate,
        endDate: input.endDate || null,
        notes: input.notes || null,
        createdAt: now,
        updatedAt: now,
      });

      return {
        id: medicationId,
        userId: ctx.userId,
        ...input,
        createdAt: now,
        updatedAt: now,
      };
    }),

  /**
   * Update - atualiza um medicamento existente
   */
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: createMedicationSchema.partial(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Verificar se o medicamento existe e pertence ao usuário
      const [existingMedication] = await db
        .select()
        .from(medications)
        .where(
          and(
            eq(medications.id, input.id),
            eq(medications.userId, ctx.userId)
          )
        )
        .limit(1);

      if (!existingMedication) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Medicamento não encontrado',
        });
      }

      // Atualizar medicamento
      await db
        .update(medications)
        .set({
          ...input.data,
          updatedAt: new Date(),
        })
        .where(eq(medications.id, input.id));

      return { success: true };
    }),

  /**
   * Delete - remove um medicamento
   */
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      // Verificar se o medicamento existe e pertence ao usuário
      const [existingMedication] = await db
        .select()
        .from(medications)
        .where(
          and(
            eq(medications.id, input.id),
            eq(medications.userId, ctx.userId)
          )
        )
        .limit(1);

      if (!existingMedication) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Medicamento não encontrado',
        });
      }

      // Deletar medicamento
      await db.delete(medications).where(eq(medications.id, input.id));

      return { success: true };
    }),

  /**
   * Active - lista medicamentos ativos (sem data de término ou com data futura)
   */
  active: protectedProcedure.query(async ({ ctx }) => {
    const now = new Date();
    
    const activeMedications = await db
      .select()
      .from(medications)
      .where(eq(medications.userId, ctx.userId))
      .orderBy(medications.startDate);

    // Filtrar medicamentos ativos no código (sem endDate ou endDate > now)
    return activeMedications.filter(
      (med) => !med.endDate || new Date(med.endDate) > now
    );
  }),
});
