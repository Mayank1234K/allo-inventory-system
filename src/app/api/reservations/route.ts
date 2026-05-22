import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest
) {

  try {

    const body = await request.json();

    const {
      productId,
      warehouseId,
      quantity
    } = body;

    const result =
      await prisma.$transaction(
        async (tx) => {

          const inventory =
            await tx.inventory.findFirst({
              where: {
                productId,
                warehouseId
              }
            });

          if (!inventory) {
            throw new Error(
              "Inventory not found"
            );
          }

          const available =
            inventory.totalStock -
            inventory.reservedStock;

          if (available < quantity) {
            throw new Error(
              "INSUFFICIENT_STOCK"
            );
          }

          await tx.inventory.update({
            where: {
              id: inventory.id
            },
            data: {
              reservedStock: {
                increment: quantity
              }
            }
          });

          const reservation =
            await tx.reservation.create({
              data: {
                productId,
                warehouseId,
                quantity,
                expiresAt: new Date(
                  Date.now() +
                  10 * 60 * 1000
                )
              }
            });

          return reservation;
        }
      );

    return NextResponse.json(result);

  } catch (error: any) {

    console.error(error);

    if (
      error.message ===
      "INSUFFICIENT_STOCK"
    ) {

      return NextResponse.json(
        {
          error: "Not enough stock"
        },
        {
          status: 409
        }
      );
    }

    return NextResponse.json(
      {
        error: "Internal server error"
      },
      {
        status: 500
      }
    );
  }
}