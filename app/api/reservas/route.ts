import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTokenFromRequest, verifyToken } from "@/lib/auth";
import type { ApiResponse, ReservaInput } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    // Autenticar
    const token = getTokenFromRequest(req);
    if (!token) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Debes iniciar sesión para reservar" },
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

    const body: ReservaInput = await req.json();
    const { oficinaId, tipoAlquiler, fechaInicio, fechaFin, metodoPago } = body;

    if (!oficinaId || !tipoAlquiler || !fechaInicio || !metodoPago) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Obtener oficina y calcular total
    const oficina = await prisma.oficina.findUnique({
      where: { id: oficinaId },
    });

    if (!oficina || !oficina.disponible) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Oficina no disponible" },
        { status: 404 }
      );
    }

    // Verificar disponibilidad (sin traslape de fechas)
    const inicio = new Date(fechaInicio);
    const fin = fechaFin ? new Date(fechaFin) : inicio;

    const traslape = await prisma.reserva.findFirst({
      where: {
        oficinaId,
        estado: { in: ["PENDIENTE", "CONFIRMADA"] },
        AND: [
          { fechaInicio: { lte: fin } },
          { OR: [{ fechaFin: null }, { fechaFin: { gte: inicio } }] },
        ],
      },
    });

    if (traslape) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "El espacio no está disponible en esas fechas" },
        { status: 409 }
      );
    }

    // Calcular total
    let total = 0;
    if (tipoAlquiler === "DIARIO") {
      total = oficina.precioDia;
    } else {
      const meses = fechaFin
        ? Math.ceil((fin.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24 * 30))
        : 1;
      total = oficina.precioMes * meses;
    }

    // Crear reserva
    const reserva = await prisma.reserva.create({
      data: {
        userId: payload.userId,
        oficinaId,
        tipoAlquiler,
        fechaInicio: inicio,
        fechaFin: fechaFin ? fin : null,
        total,
        metodoPago,
        estado: "CONFIRMADA",
      },
      include: { oficina: true, user: { select: { name: true, email: true } } },
    });

    return NextResponse.json<ApiResponse>(
      { success: true, data: { reserva }, message: "Reserva confirmada exitosamente" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Reserva POST error:", error);
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Error al crear reserva" },
      { status: 500 }
    );
  }
}

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

    const reservas = await prisma.reserva.findMany({
      where: { userId: payload.userId },
      include: {
        oficina: {
          select: { nombre: true, ubicacion: true, imagen: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json<ApiResponse>({ success: true, data: { reservas } });
  } catch (error) {
    console.error("Reservas GET error:", error);
    return NextResponse.json<ApiResponse>(
      { success: false, error: "Error al obtener reservas" },
      { status: 500 }
    );
  }
}