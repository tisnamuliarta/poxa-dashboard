// app/api/auth/[...nextauth]/route.ts
import { handlers } from '@/lib/auth-handlers';

export const { GET, POST } = handlers;
