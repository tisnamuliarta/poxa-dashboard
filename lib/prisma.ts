// lib/prisma.ts
/**
 * Instantiates a single instance of PrismaClient and saves it on the global object.
 * Will be used during hot reloads to prevent instantiating extra PrismaClient instances.
 * @link https://www.prisma.io/docs/support/help-center/nextjs-prisma-client-dev-cycles
 */

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log:
            process.env.NODE_ENV === 'development'
                ? ['query', 'error', 'warn']
                : ['error'],
    });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
