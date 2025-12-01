import { z } from 'zod';
import { router, adminProcedure } from '../trpc';
import { db } from '../db';
import { users, doctors, medications, appointments } from '../db/schema';
import { sql, count, eq } from 'drizzle-orm';

export const adminRouter = router({
  /**
   * Stats - estatísticas gerais da plataforma
   */
  stats: adminProcedure.query(async ({ ctx }) => {
    // Total de usuários
    const [totalUsersResult] = await db
      .select({ count: count() })
      .from(users);

    // Total de médicos cadastrados
    const [totalDoctorsResult] = await db
      .select({ count: count() })
      .from(doctors);

    // Total de medicamentos
    const [totalMedicationsResult] = await db
      .select({ count: count() })
      .from(medications);

    // Total de consultas
    const [totalAppointmentsResult] = await db
      .select({ count: count() })
      .from(appointments);

    return {
      totalUsers: totalUsersResult.count,
      totalDoctors: totalDoctorsResult.count,
      totalMedications: totalMedicationsResult.count,
      totalAppointments: totalAppointmentsResult.count,
      // Placeholder para taxa de satisfação
      satisfactionRate: 98.5,
    };
  }),

  /**
   * Users - lista todos os usuários
   */
  users: adminProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ input }) => {
      const usersList = await db
        .select({
          id: users.id,
          email: users.email,
          name: users.name,
          role: users.role,
          avatarUrl: users.avatarUrl,
          createdAt: users.createdAt,
        })
        .from(users)
        .limit(input.limit)
        .offset(input.offset)
        .orderBy(users.createdAt);

      return usersList;
    }),

  /**
   * User Stats - estatísticas de um usuário específico
   */
  userStats: adminProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      // Total de médicos do usuário
      const [doctorsCount] = await db
        .select({ count: count() })
        .from(doctors)
        .where(eq(doctors.userId, input.userId));

      // Total de medicamentos do usuário
      const [medicationsCount] = await db
        .select({ count: count() })
        .from(medications)
        .where(eq(medications.userId, input.userId));

      // Total de consultas do usuário
      const [appointmentsCount] = await db
        .select({ count: count() })
        .from(appointments)
        .where(eq(appointments.userId, input.userId));

      return {
        userId: input.userId,
        totalDoctors: doctorsCount.count,
        totalMedications: medicationsCount.count,
        totalAppointments: appointmentsCount.count,
      };
    }),

  /**
   * Recent Activity - atividade recente na plataforma
   */
  recentActivity: adminProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(50).default(10),
      })
    )
    .query(async ({ input }) => {
      // Buscar usuários recentes
      const recentUsers = await db
        .select({
          id: users.id,
          name: users.name,
          email: users.email,
          createdAt: users.createdAt,
        })
        .from(users)
        .orderBy(users.createdAt)
        .limit(input.limit);

      return recentUsers.map((user) => ({
        type: 'user_registered' as const,
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        timestamp: user.createdAt,
      }));
    }),

  /**
   * Growth Stats - estatísticas de crescimento
   */
  growthStats: adminProcedure
    .input(
      z.object({
        period: z.enum(['week', 'month', 'year']).default('month'),
      })
    )
    .query(async ({ input }) => {
      const now = new Date();
      let startDate = new Date();

      // Calcular data de início baseado no período
      switch (input.period) {
        case 'week':
          startDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          startDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      // Contar novos usuários no período
      const [newUsersResult] = await db
        .select({ count: count() })
        .from(users)
        .where(sql`${users.createdAt} >= ${startDate}`);

      return {
        period: input.period,
        newUsers: newUsersResult.count,
        startDate,
        endDate: now,
      };
    }),
});
