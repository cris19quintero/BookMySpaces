"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./components/Navbar";

const TABS = ["Office space", "Coworking", "Meeting rooms"] as const;
type Tab = typeof TABS[number];

const TAB_DATA: Record<Tab, {
  img: string; title: string; desc: string;
  features: string[]; price: string; period: string; color: string;
}> = {
  "Office space": {
    img: "/imagenes/ofice space.png",
    title: "Oficinas Privadas",
    desc: "Espacios completamente equipados, diseñados para que alcances el máximo rendimiento en un ambiente profesional y enfocado.",
    features: ["WiFi de alta velocidad", "Escritorio ergonómico", "Acceso 24/7", "Climatización incluida"],
    price: "Desde $150 USD", period: "por mes", color: "#2563EB",
  },
  "Coworking": {
    img: "/imagenes/coworking.png",
    title: "Espacios Coworking",
    desc: "Conecta con profesionales en un ambiente dinámico. Áreas comunes, cafetería y una comunidad activa que inspira.",
    features: ["Áreas comunes", "Cafetería incluida", "Networking activo", "Salas de reuniones"],
    price: "Desde $80 USD", period: "por mes", color: "#059669",
  },
  "Meeting rooms": {
    img: "/imagenes/meeting.png",
    title: "Salas de Reuniones",
    desc: "Salas profesionales totalmente equipadas para reuniones, presentaciones y videoconferencias de alto nivel.",
    features: ["Proyector HD", "Videoconferencia", "Pizarra interactiva", "Servicio de catering"],
    price: "Desde $30 USD", period: "por hora", color: "#7c3aed",
  },
};

export default function HomePage() {
  const [tab, setTab] = useState<Tab>("Office space");
  const data = TAB_DATA[tab];

  return (
    <div>
      <Navbar />
      <main style={{ paddingTop: "68px", minHeight: "100vh" }}>

        {/* ── HERO ── */}
        <section style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #2563EB 100%)",
          color: "#fff", padding: "5rem 1.5rem 5rem",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", width: "600px", height: "600px",
            background: "rgba(96,165,250,0.08)", borderRadius: "50%",
            top: "-250px", right: "-150px", pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", width: "350px", height: "350px",
            background: "rgba(245,158,11,0.07)", borderRadius: "50%",
            bottom: "-100px", left: "5%", pointerEvents: "none",
          }} />

          <div style={{ maxWidth: "820px", margin: "0 auto", position: "relative", textAlign: "center" }}>
            <span className="anim-up" style={{
              display: "inline-block",
              background: "rgba(245,158,11,0.15)", color: "#fbbf24",
              border: "1px solid rgba(245,158,11,0.3)",
              padding: "5px 16px", borderRadius: "99px",
              fontSize: "0.78rem", fontWeight: 700, letterSpacing: "1.5px",
              textTransform: "uppercase", marginBottom: "1.5rem",
            }}>🏙️ Ciudad de Panamá · Disponible ahora</span>

            <h1 className="anim-up d1" style={{
              fontSize: "clamp(2.4rem, 6vw, 4rem)",
              fontWeight: 800, lineHeight: 1.08, marginBottom: "1.25rem",
              letterSpacing: "-1.5px",
            }}>
              Tu espacio ideal para{" "}
              <span style={{
                background: "linear-gradient(90deg, #60a5fa 0%, #f59e0b 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>trabajar y crecer</span>
            </h1>

            <p className="anim-up d2" style={{
              fontSize: "1.1rem", color: "rgba(255,255,255,0.72)",
              maxWidth: "540px", margin: "0 auto 2.5rem", lineHeight: 1.75,
            }}>
              Oficinas privadas, coworking y salas de reuniones en las mejores
              ubicaciones de Panamá. Flexibles, equipadas y listas para ti.
            </p>

            <div className="anim-up d3" style={{
              display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap",
            }}>
              <Link href="/alquiler" style={{
                background: "#f59e0b", color: "#0f172a",
                padding: "0.95rem 2.25rem", borderRadius: "12px",
                textDecoration: "none", fontWeight: 800, fontSize: "1rem",
                boxShadow: "0 4px 20px rgba(245,158,11,0.35)",
              }}>Ver espacios →</Link>
              <Link href="/about" style={{
                background: "rgba(255,255,255,0.1)", color: "#fff",
                padding: "0.95rem 2.25rem", borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.2)",
                textDecoration: "none", fontWeight: 600, fontSize: "1rem",
              }}>Conocer más</Link>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section style={{
          background: "#fff", borderBottom: "1px solid #e2e8f0",
        }}>
          <div style={{
            maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "1.5rem", textAlign: "center",
          }}>
            {[
              { value: "8+",   label: "Ubicaciones",     icon: "📍" },
              { value: "500+", label: "Clientes activos", icon: "👥" },
              { value: "24/7", label: "Disponibilidad",   icon: "🕐" },
              { value: "98%",  label: "Satisfacción",     icon: "⭐" },
            ].map(s => (
              <div key={s.label} style={{ padding: "0.5rem" }}>
                <div style={{ fontSize: "1.4rem", marginBottom: "4px" }}>{s.icon}</div>
                <div style={{
                  fontSize: "1.9rem", fontWeight: 800, color: "#2563EB",
                  fontFamily: "'Bricolage Grotesque', sans-serif", lineHeight: 1,
                }}>{s.value}</div>
                <div style={{ fontSize: "0.82rem", color: "#64748b", marginTop: "4px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section style={{ padding: "3rem 1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.25rem",
          }}>
            {[
              { src: "/imagenes/image1.png", alt: "Espacio de trabajo moderno" },
              { src: "/imagenes/image2.png", alt: "Área colaborativa" },
            ].map(img => (
              <div key={img.src} style={{
                borderRadius: "18px", overflow: "hidden", height: "280px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.1)", position: "relative",
              }}>
                <Image src={img.src} alt={img.alt} fill
                  style={{ objectFit: "cover", transition: "transform 0.5s" }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ── TABS SECTION ── */}
        <section style={{
          padding: "0 1.5rem 5rem",
          maxWidth: "1200px", margin: "0 auto",
        }}>
          {/* Heading */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{
              display: "inline-block", background: "#eff6ff", color: "#2563EB",
              padding: "4px 14px", borderRadius: "99px",
              fontSize: "0.78rem", fontWeight: 700, marginBottom: "0.75rem",
              letterSpacing: "1px", textTransform: "uppercase",
            }}>Nuestros espacios</span>
            <h2 style={{
              fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", fontWeight: 800,
              color: "#0f172a", marginBottom: "0.75rem", letterSpacing: "-0.5px",
            }}>
              Diseñados para cada necesidad
            </h2>
            <p style={{
              color: "#64748b", maxWidth: "440px", margin: "0 auto",
              lineHeight: 1.75, fontSize: "1rem",
            }}>
              Elige el tipo de espacio que mejor se adapta a ti y a tu equipo.
            </p>
          </div>

          {/* Tab buttons */}
          <div style={{
            display: "flex", gap: "0.5rem", justifyContent: "center",
            flexWrap: "wrap", marginBottom: "2rem",
          }}>
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: "0.7rem 1.6rem", borderRadius: "99px",
                border: tab === t ? "none" : "1.5px solid #e2e8f0",
                cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700, fontSize: "0.9rem",
                transition: "all 0.25s",
                background: tab === t ? data.color : "#fff",
                color: tab === t ? "#fff" : "#64748b",
                boxShadow: tab === t ? `0 4px 16px ${data.color}55` : "none",
              }}>{t}</button>
            ))}
          </div>

          {/* Tab card */}
          <div key={tab} className="anim-fade" style={{
            background: "#fff", borderRadius: "24px", overflow: "hidden",
            boxShadow: "0 8px 40px rgba(0,0,0,0.09)",
            border: "1px solid #e2e8f0",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}>
            {/* Image side */}
            <div style={{ position: "relative", minHeight: "340px" }}>
              <Image src={data.img} alt={data.title} fill
                style={{ objectFit: "cover" }}
              />
              {/* Overlay gradient */}
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(135deg, ${data.color}CC 0%, transparent 60%)`,
              }} />
              <div style={{
                position: "absolute", bottom: "1.5rem", left: "1.5rem",
              }}>
                <span style={{
                  background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
                  color: "#fff", padding: "6px 14px", borderRadius: "99px",
                  fontSize: "0.8rem", fontWeight: 700, border: "1px solid rgba(255,255,255,0.25)",
                }}>{tab}</span>
              </div>
            </div>

            {/* Content side */}
            <div style={{
              padding: "2.5rem 2rem",
              display: "flex", flexDirection: "column", justifyContent: "center",
            }}>
              <h3 style={{
                fontSize: "1.8rem", fontWeight: 800, color: "#0f172a",
                marginBottom: "0.75rem", letterSpacing: "-0.5px",
              }}>{data.title}</h3>
              <p style={{
                color: "#64748b", lineHeight: 1.75, marginBottom: "1.5rem", fontSize: "0.95rem",
              }}>{data.desc}</p>

              <ul style={{ listStyle: "none", marginBottom: "2rem" }}>
                {data.features.map(f => (
                  <li key={f} style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    marginBottom: "0.65rem", color: "#374151", fontSize: "0.93rem",
                  }}>
                    <span style={{
                      width: "22px", height: "22px", borderRadius: "50%", flexShrink: 0,
                      background: `${data.color}18`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.65rem", color: data.color, fontWeight: 900,
                    }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <div style={{
                display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "1.75rem",
              }}>
                <span style={{
                  fontSize: "2.2rem", fontWeight: 800,
                  color: data.color,
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                }}>{data.price}</span>
                <span style={{ color: "#94a3b8", fontSize: "0.9rem" }}>{data.period}</span>
              </div>

              <Link href="/alquiler" style={{
                background: data.color,
                color: "#fff",
                padding: "1rem 1.75rem", borderRadius: "12px",
                textDecoration: "none", fontWeight: 700, textAlign: "center",
                fontSize: "0.95rem", display: "block",
                boxShadow: `0 4px 16px ${data.color}44`,
              }}>
                Ver disponibilidad →
              </Link>
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section style={{
          background: "#fff", borderTop: "1px solid #e2e8f0",
          padding: "5rem 1.5rem",
        }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2 style={{
                fontSize: "clamp(1.7rem, 3.5vw, 2.4rem)", fontWeight: 800,
                color: "#0f172a", marginBottom: "0.75rem",
              }}>¿Por qué BookMySpaces?</h2>
              <p style={{ color: "#64748b", maxWidth: "440px", margin: "0 auto", lineHeight: 1.7 }}>
                Más que un espacio, una experiencia diseñada para tu éxito.
              </p>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1.25rem",
            }}>
              {[
                { icon: "⚡", title: "Reserva en minutos",  desc: "Proceso 100% digital. Elige, paga y confirma tu espacio sin burocracia." },
                { icon: "💳", title: "Sin contratos largos", desc: "Paga por día o por mes. Sin permanencia mínima ni costos ocultos." },
                { icon: "🌐", title: "WiFi garantizado",     desc: "Conectividad de fibra óptica de alta velocidad en todos los espacios." },
                { icon: "🔒", title: "Acceso seguro",        desc: "Control de acceso, vigilancia 24/7 y personal de seguridad permanente." },
              ].map((item, i) => (
                <div key={item.title} className={`anim-up d${i+1}`} style={{
                  background: "#f8fafc", borderRadius: "16px", padding: "1.75rem",
                  border: "1px solid #e2e8f0", transition: "all 0.25s",
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "#fff";
                    el.style.transform = "translateY(-4px)";
                    el.style.boxShadow = "0 12px 32px rgba(37,99,235,0.1)";
                    el.style.borderColor = "#bfdbfe";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "#f8fafc";
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "none";
                    el.style.borderColor = "#e2e8f0";
                  }}
                >
                  <div style={{
                    width: "50px", height: "50px", borderRadius: "14px",
                    background: "#eff6ff", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontSize: "1.4rem", marginBottom: "1rem",
                  }}>{item.icon}</div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0f172a", marginBottom: "0.5rem" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
          padding: "5rem 1.5rem", textAlign: "center", color: "#fff",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", width: "400px", height: "400px",
            background: "rgba(96,165,250,0.07)", borderRadius: "50%",
            top: "-150px", right: "-100px", pointerEvents: "none",
          }} />
          <div style={{ position: "relative" }}>
            <h2 style={{
              fontSize: "clamp(1.9rem, 4vw, 3rem)", fontWeight: 800,
              marginBottom: "1rem", letterSpacing: "-1px",
            }}>
              ¿Listo para comenzar?
            </h2>
            <p style={{
              color: "rgba(255,255,255,0.65)", maxWidth: "420px",
              margin: "0 auto 2.5rem", lineHeight: 1.75, fontSize: "1.05rem",
            }}>
              Explora nuestros espacios y haz tu primera reserva hoy.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/alquiler" style={{
                background: "#f59e0b", color: "#0f172a",
                padding: "1rem 2.5rem", borderRadius: "12px",
                textDecoration: "none", fontWeight: 800, fontSize: "1rem",
                boxShadow: "0 4px 20px rgba(245,158,11,0.35)",
              }}>Ver Alquileres</Link>
              <Link href="/login" style={{
                background: "rgba(255,255,255,0.1)", color: "#fff",
                padding: "1rem 2.5rem", borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.2)",
                textDecoration: "none", fontWeight: 600, fontSize: "1rem",
              }}>Crear cuenta</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}