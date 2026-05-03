import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTokenFromRequest, verifyToken } from "@/lib/auth";
import type { ApiResponse } from "@/lib/types";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const token = getTokenFromRequest(req);
    if (!token) {
      return NextResponse.json({ success: false, error: "No autenticado" }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, error: "Token inválido" }, { status: 401 });
    }

    const reserva = await prisma.reserva.findUnique({
      where: { id },
    });

    if (!reserva) {
      return NextResponse.json({ success: false, error: "Reserva no encontrada" }, { status: 404 });
    }

    if (reserva.userId !== payload.userId && payload.role !== "ADMIN") {
      return NextResponse.json({ success: false, error: "Sin permisos" }, { status: 403 });
    }

    if (reserva.estado === "CANCELADA") {
      return NextResponse.json({ success: false, error: "La reserva ya está cancelada" }, { status: 400 });
    }

    const updated = await prisma.reserva.update({
      where: { id },
      data: { estado: "CANCELADA" },
      include: { oficina: { select: { nombre: true } } },
    });

    return NextResponse.json({
      success: true,
      data: { reserva: updated },
      message: "Reserva cancelada",
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Error interno" }, { status: 500 });
  }
}