const { PrismaClient } = require('@prisma/client');
const { createMultipleUsers } = require('../src/factories/userFactory');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    // Clear existing data (optional - uncomment if you want to reset)
    // await prisma.user.deleteMany();
    // console.log('Cleared existing users');

    // Generate 25 dummy users
    const usersData = createMultipleUsers(25);

    // Insert users one by one to handle unique email constraint
    let successCount = 0;
    for (const userData of usersData) {
        try {
            await prisma.user.create({
                data: userData
            });
            successCount++;
        } catch (error) {
            // Skip if email already exists
            if (error.code === 'P2002') {
                console.log(`Skipped duplicate email: ${userData.email}`);
            } else {
                throw error;
            }
        }
    }

    console.log(`✅ Successfully created ${successCount} users`);

    // Display some sample data
    const sampleUsers = await prisma.user.findMany({
        take: 5,
        select: {
            id: true,
            email: true,
            username: true,
            isActive: true
        }
    });

    console.log('\nSample users:');
    console.table(sampleUsers);
}

main()
    .catch((e) => {
        console.error('Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
