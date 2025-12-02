import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';

// Usar tipo genérico ao invés de importar AppRouter do servidor
export const trpc = createTRPCReact<any>();

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
