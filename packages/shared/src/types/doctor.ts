export interface Doctor {
  id: string;
  userId: string;
  name: string;
  specialty: string;
  crm: string;
  phone?: string;
  email?: string;
  city?: string;
  state?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDoctorInput {
  name: string;
  specialty: string;
  crm: string;
  phone?: string;
  email?: string;
  city?: string;
  state?: string;
}
