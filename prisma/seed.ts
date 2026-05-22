import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  await prisma.reservation.deleteMany();
  await prisma.inventory.deleteMany();
  await prisma.product.deleteMany();
  await prisma.warehouse.deleteMany();

  const bangaloreWarehouse =
    await prisma.warehouse.create({
      data: {
        name: "Bangalore Warehouse",
        location: "Bangalore"
      }
    });

  const mumbaiWarehouse =
    await prisma.warehouse.create({
      data: {
        name: "Mumbai Warehouse",
        location: "Mumbai"
      }
    });

  const iphone17 =
    await prisma.product.create({
      data: {
        name: "iPhone 17",
        description:
          "Apple flagship smartphone"
      }
    });

  const samsungS24 =
    await prisma.product.create({
      data: {
        name: "Samsung S24",
        description:
          "Samsung premium device"
      }
    });

  const macbook =
    await prisma.product.create({
      data: {
        name: "MacBook Pro M4",
        description:
          "Apple laptop"
      }
    });

  await prisma.inventory.createMany({
    data: [

      {
        productId: iphone17.id,
        warehouseId:
          bangaloreWarehouse.id,
        totalStock: 5,
        reservedStock: 0
      },

      {
        productId: samsungS24.id,
        warehouseId:
          mumbaiWarehouse.id,
        totalStock: 3,
        reservedStock: 0
      },

      {
        productId: macbook.id,
        warehouseId:
          bangaloreWarehouse.id,
        totalStock: 2,
        reservedStock: 0
      }

    ]
  });

  console.log(
    "Database seeded successfully"
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });