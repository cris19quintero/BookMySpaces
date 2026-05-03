import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTokenFromRequest, verifyToken } from "@/lib/auth";
import type { ApiResponse } from "@/lib/types";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = getTokenFromRequest(req);
    if (!token) return NextResponse.json<ApiResponse>({ success: false, error: "No autenticado" }, { status: 401 });

    const payload = verifyToken(token);
    if (!payload) return NextResponse.json<ApiResponse>({ success: false, error: "Token inválido" }, { status: 401 });

    const reserva = await prisma.reserva.findUnique({
      where: { id: params.id },
    });

    if (!reserva) return NextResponse.json<ApiResponse>({ success: false, error: "Reserva no encontrada" }, { status: 404 });

    // Solo el dueño o admin puede cancelar
    if (reserva.userId !== payload.userId && payload.role !== "ADMIN") {
      return NextResponse.json<ApiResponse>({ success: false, error: "Sin permisos" }, { status: 403 });
    }

    if (reserva.estado === "CANCELADA") {
      return NextResponse.json<ApiResponse>({ success: false, error: "La reserva ya está cancelada" }, { status: 400 });
    }

    const updated = await prisma.reserva.update({
      where: { id: params.id },
      data: { estado: "CANCELADA" },
      include: { oficina: { select: { nombre: true } } },
    });

    return NextResponse.json<ApiResponse>({
      success: true,
      data: { reserva: updated },
      message: "Reserva cancelada",
    });
  } catch (error) {
    console.error("Reserva PATCH error:", error);
    return NextResponse.json<ApiResponse>({ success: false, error: "Error interno" }, { status: 500 });
  }
}