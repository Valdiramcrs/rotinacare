import { z } from 'zod';

export const createDoctorSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  specialty: z.string().min(1, 'Especialidade é obrigatória'),
  crm: z.string().min(1, 'CRM é obrigatório'),
  phone: z.string().optional(),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  city: z.string().optional(),
  state: z.string().optional(),
});

export type CreateDoctorInput = z.infer<typeof createDoctorSchema>;
