import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BookMySpaces — Espacios de trabajo en Panamá",
  description: "Alquiler de oficinas privadas, coworking y salas de reuniones en Panamá.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}