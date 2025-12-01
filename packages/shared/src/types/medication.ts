export interface Medication {
  id: string;
  userId: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMedicationInput {
  name: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate?: Date;
  notes?: string;
}
