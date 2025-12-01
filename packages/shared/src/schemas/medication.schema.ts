import { z } from 'zod';

export const createMedicationSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  dosage: z.string().min(1, 'Dosagem é obrigatória'),
  frequency: z.string().min(1, 'Frequência é obrigatória'),
  startDate: z.date(),
  endDate: z.date().optional(),
  notes: z.string().optional(),
});

export type CreateMedicationSchema = z.infer<typeof createMedicationSchema>;
