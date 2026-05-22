import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

  try {

    const inventories =
      await prisma.inventory.findMany({
        include: {
          product: true,
          warehouse: true
        }
      });

    const products = inventories.map(
      (item) => ({
        productId: item.product.id,
        productName: item.product.name,
        warehouseId: item.warehouse.id,
        warehouse: item.warehouse.name,
        availableStock:
          item.totalStock -
          item.reservedStock
      })
    );

    return NextResponse.json(products);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch products"
      },
      {
        status: 500
      }
    );
  }
}