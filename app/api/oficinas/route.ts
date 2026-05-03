import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { ApiResponse } from "@/lib/types";

export async function GET() {
  try {
    const oficinas = await prisma.oficina.findMany({
      where: { disponible: true },
      include: {
        resenas: {
          select: { rating: true },
        },
        _count: {
          select: { reservas: true },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    // Calcular rating promedio
    const oficinasConRating = oficinas.map(o => ({
      ...o,
      ratingPromedio: o.resenas.length > 0
        ? o.resenas.reduce((acc, r) => acc + r.rating, 0) / o.resenas.length
        : null,
      totalReservas: o._count.reservas,
    }));

    return NextResponse.json<ApiResponse>({ success: true, data: oficinasConRating });
  } catch (error) {
    console.error("Oficinas GET error:", error);
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Error al obtener oficinas" },
      { status: 500 }
    );
  }
}