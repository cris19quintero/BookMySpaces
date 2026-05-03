"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

type Reserva = {
  id: string;
  tipoAlquiler: string;
  fechaInicio: string;
  fechaFin: string | null;
  total: number;
  estado: string;
  metodoPago: string;
  oficina: { nombre: string; ubicacion: string; imagen: string };
};

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

const ESTADO_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  CONFIRMADA:  { bg: "#dcfce7", color: "#16a34a", label: "Confirmada"  },
  PENDIENTE:   { bg: "#fef9c3", color: "#ca8a04", label: "Pendiente"   },
  CANCELADA:   { bg: "#fee2e2", color: "#dc2626", label: "Cancelada"   },
  COMPLETADA:  { bg: "#e0e7ff", color: "#4338ca", label: "Completada"  },
};

export default function DashboardPage() {
  const router  = useRouter();
  const [user, setUser]         = useState<User | null>(null);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading]   = useState(true);
  const [canceling, setCanceling] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [meRes, resRes] = await Promise.all([
        fetch("/api/auth/me"),
        fetch("/api/reservas"),
      ]);

      if (meRes.status === 401) { router.push("/login"); return; }

      const meData  = await meRes.json();
      const resData = await resRes.json();

      if (meData.success)  setUser(meData.data.user);
      if (resData.success) setReservas(resData.data.reservas);
    } catch {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }

  async function cancelarReserva(id: string) {
    setCanceling(id);
    try {
      const res  = await fetch(`/api/reservas/${id}`, { method: "PATCH" });
      const data = await res.json();
      if (data.success) {
        setReservas(prev =>
          prev.map(r => r.id === id ? { ...r, estado: "CANCELADA" } : r)
        );
      }
    } finally {
      setCanceling(null);
    }
  }

  async function logout() {
    await fetch("/api/auth/login", { method: "DELETE" });
    router.push("/");
  }

  if (loading) {
    return (
      <div>
        <Navbar />
        <main style={{
          paddingTop: "68px", minHeight: "100vh",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "#f8fafc",
        }}>
          <div style={{ textAlign: "center", color: "#64748b" }}>
            <div style={{
              width: "40px", height: "40px", border: "3px solid #e2e8f0",
              borderTopColor: "#2563EB", borderRadius: "50%",
              animation: "spin 0.7s linear infinite",
              margin: "0 auto 1rem",
            }} />
            <p>Cargando tu dashboard...</p>
          </div>
        </main>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const stats = {
    total:      reservas.length,
    activas:    reservas.filter(r => r.estado === "CONFIRMADA").length,
    canceladas: reservas.filter(r => r.estado === "CANCELADA").length,
    gastado:    reservas
                  .filter(r => r.estado !== "CANCELADA")
                  .reduce((acc, r) => acc + r.total, 0),
  };

  return (
    <div>
      <Navbar />
      <main style={{ paddingTop: "68px", minHeight: "100vh", background: "#f8fafc" }}>

        {/* ── HEADER ── */}
        <section style={{
          background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
          padding: "3rem 1.5rem", color: "#fff",
        }}>
          <div style={{
            maxWidth: "1100px", margin: "0 auto",
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-start", flexWrap: "wrap", gap: "1rem",
          }}>
            <div>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem", marginBottom: "4px" }}>
                Panel de usuario
              </p>
              <h1 style={{ fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 800 }}>
                Hola, {user?.name?.split(" ")[0]} 👋
              </h1>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem", marginTop: "4px" }}>
                {user?.email}
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link href="/alquiler" style={{
                background: "#f59e0b", color: "#0f172a",
                padding: "0.75rem 1.5rem", borderRadius: "10px",
                textDecoration: "none", fontWeight: 800, fontSize: "0.9rem",
              }}>+ Nueva reserva</Link>
              <button onClick={logout} style={{
                background: "rgba(255,255,255,0.1)", color: "#fff",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "0.75rem 1.5rem", borderRadius: "10px",
                cursor: "pointer", fontWeight: 600, fontSize: "0.9rem",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}>Cerrar sesión</button>
            </div>
          </div>
        </section>

        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>

          {/* ── STATS ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem", marginBottom: "2.5rem",
          }}>
            {[
              { label: "Total reservas", value: stats.total,      icon: "📋", color: "#2563EB" },
              { label: "Reservas activas", value: stats.activas,  icon: "✅", color: "#10b981" },
              { label: "Canceladas",  value: stats.canceladas,    icon: "❌", color: "#ef4444" },
              { label: "Total gastado", value: `$${stats.gastado.toFixed(0)} USD`, icon: "💳", color: "#f59e0b" },
            ].map(s => (
              <div key={s.label} style={{
                background: "#fff", borderRadius: "16px", padding: "1.5rem",
                border: "1px solid #e2e8f0",
                display: "flex", alignItems: "center", gap: "1rem",
              }}>
                <div style={{
                  width: "48px", height: "48px", borderRadius: "12px",
                  background: `${s.color}15`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.4rem", flexShrink: 0,
                }}>{s.icon}</div>
                <div>
                  <div style={{
                    fontSize: "0.78rem", color: "#94a3b8",
                    fontWeight: 600, textTransform: "uppercase",
                    letterSpacing: "0.5px", marginBottom: "2px",
                  }}>{s.label}</div>
                  <div style={{
                    fontSize: "1.5rem", fontWeight: 800, color: s.color,
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                  }}>{s.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ── RESERVAS ── */}
          <div style={{
            background: "#fff", borderRadius: "20px",
            border: "1px solid #e2e8f0", overflow: "hidden",
          }}>
            <div style={{
              padding: "1.5rem 1.75rem",
              borderBottom: "1px solid #f1f5f9",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a" }}>
                Mis Reservas
              </h2>
              <span style={{
                background: "#f1f5f9", color: "#64748b",
                padding: "4px 12px", borderRadius: "99px", fontSize: "0.8rem", fontWeight: 600,
              }}>{reservas.length} total</span>
            </div>

            {reservas.length === 0 ? (
              <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🏢</div>
                <h3 style={{ fontWeight: 700, color: "#374151", marginBottom: "0.5rem" }}>
                  Aún no tienes reservas
                </h3>
                <p style={{ color: "#94a3b8", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
                  Explora nuestros espacios y haz tu primera reserva
                </p>
                <Link href="/alquiler" style={{
                  background: "#2563EB", color: "#fff",
                  padding: "0.75rem 1.75rem", borderRadius: "10px",
                  textDecoration: "none", fontWeight: 700, fontSize: "0.9rem",
                }}>Ver espacios disponibles</Link>
              </div>
            ) : (
              <div>
                {reservas.map((r, i) => {
                  const estado = ESTADO_COLORS[r.estado] ?? ESTADO_COLORS.PENDIENTE;
                  return (
                    <div key={r.id} style={{
                      padding: "1.25rem 1.75rem",
                      borderBottom: i < reservas.length - 1 ? "1px solid #f1f5f9" : "none",
                      display: "flex", gap: "1.25rem",
                      alignItems: "flex-start", flexWrap: "wrap",
                    }}>
                      {/* Image */}
                      <div style={{
                        width: "72px", height: "72px", borderRadius: "12px",
                        overflow: "hidden", flexShrink: 0,
                        background: "#f1f5f9",
                      }}>
                        <img src={r.oficina.imagen} alt={r.oficina.nombre}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: "180px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
                          <h3 style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.95rem" }}>
                            {r.oficina.nombre}
                          </h3>
                          <span style={{
                            background: estado.bg, color: estado.color,
                            padding: "2px 10px", borderRadius: "99px",
                            fontSize: "0.72rem", fontWeight: 700,
                          }}>{estado.label}</span>
                        </div>
                        <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: "4px" }}>
                          📍 {r.oficina.ubicacion}
                        </p>
                        <p style={{ fontSize: "0.8rem", color: "#64748b" }}>
                          {r.tipoAlquiler === "DIARIO" ? "📅 Diario" : "📅 Mensual"} ·{" "}
                          {new Date(r.fechaInicio).toLocaleDateString("es-PA")}
                          {r.fechaFin ? ` → ${new Date(r.fechaFin).toLocaleDateString("es-PA")}` : ""}
                        </p>
                      </div>

                      {/* Price + actions */}
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{
                          fontSize: "1.1rem", fontWeight: 800, color: "#2563EB",
                          fontFamily: "'Bricolage Grotesque', sans-serif", marginBottom: "8px",
                        }}>${r.total.toFixed(2)} USD</div>
                        {r.estado === "CONFIRMADA" && (
                          <button
                            onClick={() => cancelarReserva(r.id)}
                            disabled={canceling === r.id}
                            style={{
                              background: "#fee2e2", color: "#dc2626",
                              border: "none", borderRadius: "8px",
                              padding: "6px 14px", cursor: "pointer",
                              fontWeight: 600, fontSize: "0.8rem",
                              fontFamily: "'Plus Jakarta Sans', sans-serif",
                              opacity: canceling === r.id ? 0.6 : 1,
                            }}
                          >
                            {canceling === r.id ? "Cancelando..." : "Cancelar"}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}