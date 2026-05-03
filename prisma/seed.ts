import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const oficinas = [
    {
      nombre: "PH Atlantic Plaza", ubicacion: "Cuatro Altos, Colón, PAN",
      descripcion: "Únase a cientos de empresas exitosas con espacios flexibles en esta codiciada zona.",
      imagen: "/imagenes/PH Atlanic.png", precioMes: 149, precioDia: 39,
      badge: "Destacado", badgeColor: "#f59e0b",
    },
    {
      nombre: "Tower Financial Centre", ubicacion: "Calle 50, Ciudad de Panamá, PAN",
      descripcion: "Impresionantes vistas desde el piso 35. En el corazón comercial de Panamá.",
      imagen: "/imagenes/Tower financial.png", precioMes: 229, precioDia: 59,
    },
    {
      nombre: "Banistmo Tower", ubicacion: "Aquilino de la Guardia, Panama City, PAN",
      descripcion: "Proyecte confianza desde el corazón del distrito financiero.",
      imagen: "/imagenes/Banistmo tower.png", precioMes: 275, precioDia: 79,
    },
    {
      nombre: "Plaza 2000", ubicacion: "Vía España, Ciudad de Panamá, PAN",
      descripcion: "Espacios flexibles en zona privilegiada con fácil acceso.",
      imagen: "/imagenes/plaza 2000.png", precioMes: 219, precioDia: 65,
    },
    {
      nombre: "F&F Tower", ubicacion: "Calle 50 & 56, Área Bancaria, PAN",
      descripcion: "Uno de los edificios más emblemáticos del distrito financiero.",
      imagen: "/imagenes/F&F.png", precioMes: 305, precioDia: 85,
      badge: "Premium", badgeColor: "#10b981",
    },
    {
      nombre: "Oceania Business Plaza", ubicacion: "Punta Pacífica, Panama City, PAN",
      descripcion: "Zona exclusiva con impresionantes vistas al Pacífico.",
      imagen: "/imagenes/Oceania Business.png", precioMes: 209, precioDia: 65,
      badge: "Vista al Mar", badgeColor: "#2563EB",
    },
    {
      nombre: "Financial Park Tower", ubicacion: "Costa del Este, Panama City, PAN",
      descripcion: "Pisos 34 y 35, a 15 min del Aeropuerto de Tocumen.",
      imagen: "/imagenes/Financial park.png", precioMes: 249, precioDia: 65,
    },
    {
      nombre: "PH City Mall", ubicacion: "Av. Domingo Díaz, Panama City, PAN",
      descripcion: "Cerca de la zona bancaria principal de Panamá.",
      imagen: "/imagenes/PH city mall.png", precioMes: 219, precioDia: 39,
      badge: "Céntrico", badgeColor: "#7c3aed",
    },
  ];

  for (const o of oficinas) {
    await prisma.oficina.upsert({
      where: { nombre: o.nombre } as never,
      update: o,
      create: o,
    });
  }

  console.log("✅ Seed completado —", oficinas.length, "oficinas creadas");
}

main().catch(console.error).finally(() => prisma.$disconnect());