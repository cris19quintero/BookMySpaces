export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export type UserPayload = {
  userId: string;
  email: string;
  role: string;
};

export type ReservaInput = {
  oficinaId: string;
  tipoAlquiler: "DIARIO" | "MENSUAL";
  fechaInicio: string;
  fechaFin?: string;
  metodoPago: "TARJETA" | "TRANSFERENCIA";
};