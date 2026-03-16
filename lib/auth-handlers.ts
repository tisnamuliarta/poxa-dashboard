// lib/auth-handlers.ts
import NextAuth from 'next-auth';
import { authOptions } from './auth';

export const handlers = NextAuth(authOptions);
