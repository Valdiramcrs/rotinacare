import { router } from '../trpc';
import { authRouter } from './auth';
import { doctorsRouter } from './doctors';
import { medicationsRouter } from './medications';
import { adminRouter } from './admin';

export const appRouter = router({
  auth: authRouter,
  doctors: doctorsRouter,
  medications: medicationsRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
