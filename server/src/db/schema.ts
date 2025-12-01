import { pgTable, text, timestamp, boolean, uuid, varchar } from 'drizzle-orm/pg-core';

/**
 * Users table
 * Armazena informações dos usuários (pacientes, médicos, admins)
 */
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull().default('patient'), // patient, doctor, admin
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

/**
 * Doctors table
 * Cadastro de médicos vinculados aos usuários
 */
export const doctors = pgTable('doctors', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  specialty: varchar('specialty', { length: 255 }).notNull(),
  crm: varchar('crm', { length: 50 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  email: varchar('email', { length: 255 }),
  city: varchar('city', { length: 100 }),
  state: varchar('state', { length: 2 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

/**
 * Medications table
 * Controle de medicamentos dos usuários
 */
export const medications = pgTable('medications', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  dosage: varchar('dosage', { length: 100 }).notNull(),
  frequency: varchar('frequency', { length: 100 }).notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date'),
  notes: text('notes'),
  active: boolean('active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

/**
 * Exams table
 * Registro de exames realizados
 */
export const exams = pgTable('exams', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  date: timestamp('date').notNull(),
  laboratory: varchar('laboratory', { length: 255 }),
  result: text('result'),
  fileUrl: text('file_url'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

/**
 * Appointments table
 * Agendamento de consultas
 */
export const appointments = pgTable('appointments', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  doctorId: uuid('doctor_id').references(() => doctors.id, { onDelete: 'set null' }),
  title: varchar('title', { length: 255 }).notNull(),
  date: timestamp('date').notNull(),
  location: varchar('location', { length: 255 }),
  notes: text('notes'),
  status: varchar('status', { length: 50 }).default('scheduled').notNull(), // scheduled, completed, cancelled
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Export types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Doctor = typeof doctors.$inferSelect;
export type NewDoctor = typeof doctors.$inferInsert;

export type Medication = typeof medications.$inferSelect;
export type NewMedication = typeof medications.$inferInsert;

export type Exam = typeof exams.$inferSelect;
export type NewExam = typeof exams.$inferInsert;

export type Appointment = typeof appointments.$inferSelect;
export type NewAppointment = typeof appointments.$inferInsert;
