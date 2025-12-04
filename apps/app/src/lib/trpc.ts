import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../../server/src/routers/index.js';

export const trpc = createTRPCReact<AppRouter>();

// Função para obter token do localStorage
function getAuthToken(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('rotinacare_token') || '';
}

export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_API_URL 
        ? `${import.meta.env.VITE_API_URL}/api/trpc`
        : 'http://localhost:4000/api/trpc',
      headers() {
        const token = getAuthToken();
        return token ? { authorization: `Bearer ${token}` } : {};
      },
    }),
  ],
});
