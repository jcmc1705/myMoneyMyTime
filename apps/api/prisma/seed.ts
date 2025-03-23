import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.transactions.createMany({
        data: [
            { description: 'Salário', value: 1500, typeTransaction: 'income' },
            { description: 'Extra', value: 500, typeTransaction: 'income' },
            { description: 'Aluguel da casa', value: 800, typeTransaction: 'expense' },
            { description: 'Conta de luz', value: 150, typeTransaction: 'expense' },
            { description: 'Alimentação', value: 1000, typeTransaction: 'expense' },
        ],
    });

    console.log('Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error('Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
