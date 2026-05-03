import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTokenFromRequest, verifyToken } from "@/lib/auth";
import type { ApiResponse } from "@/lib/types";

export async function GET(req: NextRequest) {
  try {
    const token = getTokenFromRequest(req);
    if (!token) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "No autenticado" },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Token inválido" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true, name: true, email: true, role: true, createdAt: true,
        reservas: {
          include: { oficina: true },
          orderBy: { createdAt: "desc" },
          take: 5,
        },
      },
    });

    if (!user) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json<ApiResponse>({ success: true, data: { user } });
  } catch (error) {
    console.error("Me error:", error);
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Error interno" },
      { status: 500 }
    );
  }
}