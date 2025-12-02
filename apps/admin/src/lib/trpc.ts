import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@rotinacare/api-types';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_API_URL || 'http://localhost:4000/api/trpc',
      headers() {
        return {
          authorization: localStorage.getItem('admin_token') || '',
        };
      },
    }),
  ],
});
