import { router } from '../trpc';
import { authRouter } from './auth.js';
import { doctorsRouter } from './doctors.js';
import { medicationsRouter } from './medications.js';
import { adminRouter } from './admin.js';

export const appRouter = router({
  auth: authRouter,
  doctors: doctorsRouter,
  medications: medicationsRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
