import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  context: {
    params: Promise<{ id: string }>
  }
) {

  try {

    const params =
      await context.params;

    const reservation =
      await prisma.reservation.findUnique({
        where: {
          id: params.id
        }
      });

    if (!reservation) {

      return NextResponse.json(
        {
          error:
            "Reservation not found"
        },
        {
          status: 404
        }
      );
    }

    if (
      reservation.expiresAt <
      new Date()
    ) {

      return NextResponse.json(
        {
          error:
            "Reservation expired"
        },
        {
          status: 410
        }
      );
    }

    await prisma.inventory.updateMany({
      where: {
        productId:
          reservation.productId,
        warehouseId:
          reservation.warehouseId
      },
      data: {
        totalStock: {
          decrement:
            reservation.quantity
        },
        reservedStock: {
          decrement:
            reservation.quantity
        }
      }
    });

    const updated =
      await prisma.reservation.update({
        where: {
          id: reservation.id
        },
        data: {
          status: "CONFIRMED"
        }
      });

    return NextResponse.json(
      updated
    );

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Internal server error"
      },
      {
        status: 500
      }
    );
  }
}