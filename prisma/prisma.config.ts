import { defineConfig } from '@prisma/internals';
import path from 'path';

export default defineConfig({
    datasources: {
        db: {
            url: process.env.DATABASE_URL || `file:${path.join(process.cwd(), 'prisma', 'dev.db')}`,
        },
    },
});
