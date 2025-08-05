import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.transaction.deleteMany();
  await prisma.transaction.createMany({
    data: [
      { description: "Salário", value: 1500, transactionType: "income" },
      { description: "Extra", value: 500, transactionType: "income" },
      {
        description: "Aluguel da casa",
        value: 800,
        transactionType: "expense",
      },
      { description: "Conta de luz", value: 150, transactionType: "expense" },
      { description: "Alimentação", value: 1000, transactionType: "expense" },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
