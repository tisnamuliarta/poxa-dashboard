// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Clean existing data
    await prisma.user.deleteMany({});
    await prisma.dashboardSettings.deleteMany({});

    // Create admin user
    const adminPassword = await hash(
        process.env.ADMIN_PASSWORD || 'admin123',
        10
    );

    const adminUser = await prisma.user.create({
        data: {
            email: process.env.ADMIN_EMAIL || 'admin@poxa.local',
            password: adminPassword,
            name: 'Admin',
            role: 'admin',
        },
    });

    console.log('✅ Created admin user:', adminUser.email);

    // Create default settings
    const settings = await prisma.dashboardSettings.create({
        data: {
            id: 'default',
            theme: 'system',
            refreshInterval: 5000,
            maxLogSize: 500,
            timezone: 'UTC',
            notifications: false,
        },
    });

    console.log('✅ Created default settings');

    console.log('✨ Seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
