"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import RentalModal from "../components/RentalModal";

type Office = {
  id: number;
  name: string;
  location: string;
  description: string;
  priceMonthly: string;
  priceDaily: string;
  badge?: string;
  badgeColor?: string;
  image: string;
};

const OFFICES: Office[] = [
  {
    id: 1, name: "PH Atlantic Plaza",
    location: "Cuatro Altos, Colón, PAN",
    description: "Únase a cientos de empresas exitosas con espacios flexibles en esta codiciada zona. Inspiración en una ciudad históricamente rica.",
    priceMonthly: "$149 USD /mes", priceDaily: "$39 USD /día",
    badge: "Destacado", badgeColor: "#f59e0b",
    image: "/imagenes/PH Atlanic.png",
  },
  {
    id: 2, name: "Tower Financial Centre",
    location: "Calle 50, Ciudad de Panamá, PAN",
    description: "Impresionantes vistas desde el piso 35. En el corazón comercial de la Encrucijada del mundo.",
    priceMonthly: "$229 USD /mes", priceDaily: "$59 USD /día",
    image: "/imagenes/Tower financial.png",
  },
  {
    id: 3, name: "Banistmo Tower",
    location: "Aquilino de la Guardia, Panama City, PAN",
    description: "Proyecte confianza desde el corazón del distrito financiero, junto a Banistmo, Banesco y más.",
    priceMonthly: "$275 USD /mes", priceDaily: "$79 USD /día",
    image: "/imagenes/Banistmo tower.png",
  },
  {
    id: 4, name: "Plaza 2000",
    location: "Vía España, Ciudad de Panamá, PAN",
    description: "Espacios flexibles en zona privilegiada de Panamá City con fácil acceso a transporte y servicios.",
    priceMonthly: "$219 USD /mes", priceDaily: "$65 USD /día",
    image: "/imagenes/plaza 2000.png",
  },
  {
    id: 5, name: "F&F Tower",
    location: "Calle 50 & 56, Área Bancaria, PAN",
    description: "Uno de los edificios más emblemáticos de Panamá, estratégicamente ubicado en el distrito financiero.",
    priceMonthly: "$305 USD /mes", priceDaily: "$85 USD /día",
    badge: "Premium", badgeColor: "#10b981",
    image: "/imagenes/F&F.png",
  },
  {
    id: 6, name: "Oceania Business Plaza",
    location: "Punta Pacífica, Panama City, PAN",
    description: "Zona exclusiva con impresionantes vistas al Pacífico, junto al distrito financiero.",
    priceMonthly: "$209 USD /mes", priceDaily: "$65 USD /día",
    badge: "Vista al Mar", badgeColor: "#2563EB",
    image: "/imagenes/Oceania Business.png",
  },
  {
    id: 7, name: "Financial Park Tower",
    location: "Costa del Este, Panama City, PAN",
    description: "Pisos 34 y 35, a 15 min del Aeropuerto de Tocumen. Vistas panorámicas y servicios premium.",
    priceMonthly: "$249 USD /mes", priceDaily: "$65 USD /día",
    image: "/imagenes/Financial park.png",
  },
  {
    id: 8, name: "PH City Mall",
    location: "Av. Domingo Díaz, Panama City, PAN",
    description: "Cerca de la zona bancaria principal. Base perfecta para conectar con empresas y proveedores locales.",
    priceMonthly: "Precios variados", priceDaily: "$39 USD /día",
    badge: "Céntrico", badgeColor: "#7c3aed",
    image: "/imagenes/PH city mall.png",
  },
];

const FILTERS = [
  { key: "todos",     label: "Todos" },
  { key: "premium",   label: "Premium" },
  { key: "economico", label: "Económico" },
  { key: "mar",       label: "Vista al Mar" },
];

export default function AlquilerPage() {
  const [selected, setSelected] = useState<Office | null>(null);
  const [filter, setFilter]     = useState("todos");

  const filtered = OFFICES.filter(o => {
    if (filter === "todos")     return true;
    if (filter === "premium")   return o.badge === "Premium";
    if (filter === "mar")       return o.badge === "Vista al Mar";
    if (filter === "economico") return parseInt(o.priceDaily.replace(/\D/g,"")) <= 55;
    return true;
  });

  return (
    <div>
      <Navbar />
      <main style={{ paddingTop: "68px", minHeight: "100vh" }}>

        {/* ── HEADER ── */}
        <section style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
          padding: "4rem 1.5rem 3rem", color: "#fff",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", width: "400px", height: "400px",
            background: "rgba(96,165,250,0.07)", borderRadius: "50%",
            top: "-150px", right: "-80px", pointerEvents: "none",
          }} />
          <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
            <Link href="/" style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)",
              textDecoration: "none", padding: "6px 14px", borderRadius: "8px",
              fontSize: "0.82rem", marginBottom: "1.5rem",
              border: "1px solid rgba(255,255,255,0.15)",
            }}>← Volver al inicio</Link>
            <h1 style={{
              fontSize: "clamp(1.9rem,4vw,3rem)", fontWeight: 800,
              marginBottom: "0.75rem", letterSpacing: "-1px",
            }}>
              Espacios de Oficina en{" "}
              <span style={{
                background: "linear-gradient(90deg, #60a5fa, #f59e0b)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Panamá</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem" }}>
              {OFFICES.length} espacios disponibles · Reserva al instante
            </p>
          </div>
        </section>

        {/* ── FILTERS ── */}
        <div style={{
          background: "#fff", borderBottom: "1px solid #e2e8f0",
          padding: "0.875rem 1.5rem",
          position: "sticky", top: "68px", zIndex: 100,
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}>
          <div style={{
            maxWidth: "1200px", margin: "0 auto",
            display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap",
          }}>
            <span style={{ fontSize: "0.8rem", color: "#94a3b8", fontWeight: 600, marginRight: "4px" }}>
              Filtrar:
            </span>
            {FILTERS.map(f => (
              <button key={f.key} onClick={() => setFilter(f.key)} style={{
                padding: "6px 18px", borderRadius: "99px",
                border: filter === f.key ? "none" : "1.5px solid #e2e8f0",
                cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700, fontSize: "0.82rem",
                transition: "all 0.2s",
                background: filter === f.key ? "#0f172a" : "#fff",
                color: filter === f.key ? "#fff" : "#64748b",
              }}>{f.label}</button>
            ))}
            <span style={{
              marginLeft: "auto", fontSize: "0.8rem", color: "#94a3b8",
            }}>{filtered.length} resultado{filtered.length !== 1 ? "s" : ""}</span>
          </div>
        </div>

        {/* ── GRID ── */}
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "2.5rem 1.5rem 4rem" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "1.5rem",
          }}>
            {filtered.map((office, i) => (
              <div key={office.id} className={`anim-up d${(i%4)+1}`} style={{
                background: "#fff", borderRadius: "20px",
                overflow: "hidden", display: "flex", flexDirection: "column",
                border: "1px solid #e2e8f0",
                transition: "transform 0.25s, box-shadow 0.25s",
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-6px)";
                  el.style.boxShadow = "0 20px 48px rgba(37,99,235,0.13)";
                  el.style.borderColor = "#bfdbfe";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                  el.style.borderColor = "#e2e8f0";
                }}
              >
                {/* Image */}
                <div style={{ height: "210px", overflow: "hidden", position: "relative" }}>
                  <Image src={office.image} alt={office.name} fill
                    style={{ objectFit: "cover", transition: "transform 0.5s" }}
                  />
                  {office.badge && (
                    <span style={{
                      position: "absolute", top: "12px", right: "12px",
                      background: office.badgeColor, color: "#fff",
                      padding: "5px 13px", borderRadius: "99px",
                      fontSize: "0.73rem", fontWeight: 800,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    }}>{office.badge}</span>
                  )}
                  {/* Location pill */}
                  <div style={{
                    position: "absolute", bottom: "12px", left: "12px",
                    background: "rgba(15,23,42,0.75)", backdropFilter: "blur(8px)",
                    color: "#fff", padding: "4px 12px", borderRadius: "99px",
                    fontSize: "0.72rem", fontWeight: 500,
                  }}>📍 {office.location}</div>
                </div>

                {/* Body */}
                <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3 style={{
                    fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.6rem",
                  }}>{office.name}</h3>
                  <p style={{
                    color: "#64748b", fontSize: "0.87rem", lineHeight: 1.65,
                    marginBottom: "1.25rem", flex: 1,
                  }}>{office.description}</p>

                  {/* Pricing */}
                  <div style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr",
                    gap: "0.6rem", marginBottom: "1.25rem",
                  }}>
                    {[
                      { label: "Mensual", value: office.priceMonthly },
                      { label: "Por día",  value: office.priceDaily   },
                    ].map(p => (
                      <div key={p.label} style={{
                        background: "#f8fafc", borderRadius: "10px",
                        padding: "0.75rem", border: "1px solid #e2e8f0",
                      }}>
                        <div style={{
                          fontSize: "0.68rem", color: "#94a3b8",
                          fontWeight: 700, textTransform: "uppercase",
                          letterSpacing: "0.5px", marginBottom: "3px",
                        }}>{p.label}</div>
                        <div style={{
                          fontSize: "0.95rem", fontWeight: 800, color: "#2563EB",
                          fontFamily: "'Bricolage Grotesque', sans-serif",
                        }}>{p.value}</div>
                      </div>
                    ))}
                  </div>

                  <button onClick={() => setSelected(office)} style={{
                    background: "linear-gradient(135deg, #2563EB, #1d4ed8)",
                    color: "#fff", border: "none", borderRadius: "12px",
                    padding: "0.9rem", fontWeight: 700, fontSize: "0.9rem",
                    cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif",
                    transition: "opacity 0.2s",
                  }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                  >Reservar espacio</button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "5rem 1rem", color: "#94a3b8" }}>
              <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🔍</div>
              <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#64748b" }}>
                No hay espacios con este filtro
              </p>
            </div>
          )}
        </section>
      </main>

      {selected && (
        <RentalModal
          officeName={selected.name}
          priceMonthly={selected.priceMonthly}
          priceDaily={selected.priceDaily}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}