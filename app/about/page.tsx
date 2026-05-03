"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";


const FEATURES = [
{
    icon: "🏢",
    title: "Espacios Flexibles",
    desc: "Escritorios individuales, oficinas privadas y salas de reuniones disponibles 24/7 según tus necesidades.",
},
{
    icon: "👥",
    title: "Comunidad Activa",
    desc: "Conecta con profesionales, estudiantes y emprendedores. Networking natural en un ambiente inspirador.",
},
{
    icon: "⭐",
    title: "Alta Calidad",
    desc: "Internet de alta velocidad, salas equipadas, zonas de descanso y todo lo que necesitas para ser productivo.",
},
{
    icon: "📍",
    title: "Mejores Ubicaciones",
    desc: "Presentes en los distritos financieros más importantes de Panamá City y Colón.",
},
{
    icon: "💳",
    title: "Pagos Flexibles",
    desc: "Paga por día, mes o sesiones puntuales. Sin contratos largos ni costos ocultos.",
},
{
    icon: "🔒",
    title: "Seguridad Total",
    desc: "Acceso controlado, videovigilancia y personal de seguridad en todos nuestros espacios.",
},
];

    export default function AboutPage() {
    return (
        <div>
        <Navbar />
        <main style={{ paddingTop: "68px", minHeight: "100vh" }}>

            {/* ── HERO ── */}
            <section style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
            color: "#fff", padding: "5rem 1.5rem",
            position: "relative", overflow: "hidden",
            }}>
            <div style={{
                position: "absolute", width: "400px", height: "400px",
                background: "rgba(96,165,250,0.08)", borderRadius: "50%",
                top: "-150px", right: "-80px", pointerEvents: "none",
            }} />
            <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
                <Link href="/" style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)",
                textDecoration: "none", padding: "6px 14px", borderRadius: "8px",
                fontSize: "0.85rem", marginBottom: "2rem",
                border: "1px solid rgba(255,255,255,0.15)",
                }}>← Volver al inicio</Link>

                <h1 className="anim-up" style={{
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                fontWeight: 800, lineHeight: 1.1, marginBottom: "1.25rem",
                }}>
                Bienvenido a{" "}
                <span style={{
                    background: "linear-gradient(90deg, #60a5fa, #f59e0b)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>BookMySpaces</span>
                </h1>
                <p className="anim-up delay-1" style={{
                fontSize: "1.1rem", opacity: 0.8, maxWidth: "600px", lineHeight: 1.7,
                marginBottom: "2rem",
                }}>
                Ofrecemos alquiler de oficinas y áreas de trabajo por día o mes, en las mejores
                ubicaciones de Panamá. Diseñamos cada espacio para potenciar tu productividad.
                </p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                
                    <a href="https://utpac-my.sharepoint.com"
                    target="_blank" rel="noopener noreferrer"
                    style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    background: "#f59e0b", color: "#0f172a",
                    padding: "0.85rem 1.75rem", borderRadius: "12px",
                    textDecoration: "none", fontWeight: 800, fontSize: "0.95rem",
                    }}
                >📄 Documentación</a>
                <Link href="/alquiler" style={{
                    display: "inline-flex", alignItems: "center",
                    background: "rgba(255,255,255,0.1)", color: "#fff",
                    padding: "0.85rem 1.75rem", borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    textDecoration: "none", fontWeight: 600, fontSize: "0.95rem",
                }}>Ver espacios →</Link>
                </div>
            </div>
            </section>

            {/* ── FEATURES GRID ── */}
            <section style={{ padding: "5rem 1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <span style={{
                display: "inline-block",
                background: "#eff6ff", color: "#2563EB",
                padding: "4px 14px", borderRadius: "99px",
                fontSize: "0.8rem", fontWeight: 600, marginBottom: "1rem",
                }}>¿Por qué elegirnos?</span>
                <h2 style={{
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, color: "#0f172a",
                marginBottom: "0.75rem",
                }}>Todo lo que necesitas para progresar</h2>
                <p style={{ color: "#64748b", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
                Nuestra plataforma te ofrece, al alcance de un click, todo lo que necesitas.
                </p>
            </div>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1.25rem",
            }}>
                {FEATURES.map((f, i) => (
                <div key={f.title} className={`anim-up delay-${i % 4 + 1}`} style={{
                    background: "#fff", borderRadius: "16px", padding: "1.75rem",
                    border: "1px solid #e2e8f0",
                    transition: "transform 0.25s, box-shadow 0.25s",
                    cursor: "default",
                }}
                    onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-4px)";
                    el.style.boxShadow = "0 12px 32px rgba(37,99,235,0.1)";
                    }}
                    onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "none";
                    }}
                >
                    <div style={{
                    width: "52px", height: "52px", borderRadius: "14px",
                    background: "#eff6ff", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontSize: "1.4rem", marginBottom: "1.1rem",
                    }}>{f.icon}</div>
                    <h3 style={{
                    fontSize: "1.1rem", fontWeight: 700, color: "#0f172a",
                    marginBottom: "0.6rem",
                    }}>{f.title}</h3>
                    <p style={{ color: "#64748b", lineHeight: 1.65, fontSize: "0.9rem" }}>{f.desc}</p>
                </div>
                ))}
            </div>
            </section>

            {/* ── TEAM / MISSION ── */}
            <section style={{
            background: "#fff", borderTop: "1px solid #e2e8f0",
            padding: "5rem 1.5rem",
            }}>
            <div style={{
                maxWidth: "1100px", margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "3rem", alignItems: "center",
            }}>
                <div>
                <span style={{
                    display: "inline-block",
                    background: "#fff7ed", color: "#f59e0b",
                    padding: "4px 14px", borderRadius: "99px",
                    fontSize: "0.8rem", fontWeight: 600, marginBottom: "1rem",
                }}>Nuestra misión</span>
                <h2 style={{
                    fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800,
                    color: "#0f172a", marginBottom: "1rem", lineHeight: 1.2,
                }}>Democratizar el acceso a espacios de trabajo profesionales</h2>
                <p style={{ color: "#64748b", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                    Creemos que todo profesional, emprendedor o estudiante merece un espacio
                    digno y bien equipado para desarrollar su potencial, sin importar el tamaño
                    de su empresa o presupuesto.
                </p>
                <Link href="/alquiler" style={{
                    display: "inline-block",
                    background: "#2563EB", color: "#fff",
                    padding: "0.85rem 1.75rem", borderRadius: "12px",
                    textDecoration: "none", fontWeight: 700,
                }}>Comienza hoy →</Link>
                </div>
                <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem",
                }}>
                {[
                    { n: "8+",   l: "Ubicaciones"    },
                    { n: "500+", l: "Clientes"        },
                    { n: "3",    l: "Años de servicio"},
                    { n: "98%",  l: "Satisfacción"   },
                ].map(s => (
                    <div key={s.l} style={{
                    background: "#f8fafc", borderRadius: "16px",
                    padding: "1.5rem", textAlign: "center",
                    border: "1px solid #e2e8f0",
                    }}>
                    <div style={{
                        fontSize: "2rem", fontWeight: 800, color: "#2563EB",
                        fontFamily: "'Bricolage Grotesque', sans-serif",
                    }}>{s.n}</div>
                    <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "4px" }}>{s.l}</div>
                    </div>
                ))}
                </div>
            </div>
            </section>

            {/* ── CTA ── */}
            <section style={{
            background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
            padding: "5rem 1.5rem", textAlign: "center", color: "#fff",
            }}>
            <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, marginBottom: "1rem" }}>
                ¿Listo para elevar tu productividad?
            </h2>
            <p style={{ opacity: 0.75, maxWidth: "460px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
                Alquila hoy mismo tu espacio ideal y transforma tu vida laboral.
            </p>
            <Link href="/alquiler" style={{
                background: "#f59e0b", color: "#0f172a",
                padding: "1rem 2.5rem", borderRadius: "12px",
                textDecoration: "none", fontWeight: 800, fontSize: "1rem",
            }}>
                Comenzar mi primer alquiler
            </Link>
            </section>
        </main>
        </div>
    );
    }