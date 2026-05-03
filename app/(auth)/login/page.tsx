"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";

type Mode = "login" | "register";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode]         = useState<Mode>("register");
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState("");

  const inp: React.CSSProperties = {
    width: "100%", padding: "0.85rem 1rem 0.85rem 2.75rem",
    border: `1.5px solid ${error ? "#fca5a5" : "#e2e8f0"}`,
    borderRadius: "12px", fontSize: "0.95rem",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    outline: "none", color: "#0f172a", background: "#fff",
    transition: "border-color 0.2s",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const body = mode === "login"
        ? { email, password }
        : { name, email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Ocurrió un error");
        return;
      }

      setSuccess(mode === "login" ? "¡Bienvenido de vuelta!" : "¡Cuenta creada exitosamente!");
      setTimeout(() => router.push("/dashboard"), 1200);
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <main style={{
        paddingTop: "68px", minHeight: "100vh",
        background: "linear-gradient(135deg, #eff6ff 0%, #f8fafc 50%, #fff7ed 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "2rem 1rem",
      }}>
        <Link href="/" style={{
          position: "fixed", top: "84px", left: "1rem",
          display: "inline-flex", alignItems: "center", gap: "6px",
          background: "#fff", color: "#374151", textDecoration: "none",
          padding: "8px 14px", borderRadius: "10px", fontSize: "0.85rem",
          fontWeight: 500, border: "1px solid #e2e8f0",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}>← Volver</Link>

        <div style={{ width: "100%", maxWidth: "440px" }}>
          <div className="anim-scale" style={{
            background: "#fff", borderRadius: "24px", padding: "2.5rem",
            boxShadow: "0 8px 40px rgba(37,99,235,0.1)", border: "1px solid #e2e8f0",
          }}>
            {/* Logo */}
            <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
              <Link href="/" style={{ textDecoration: "none" }}>
                <span style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800, fontSize: "1.6rem", color: "#2563EB",
                }}>
                  Book<span style={{ color: "#0f172a" }}>my</span>
                  <span style={{ color: "#f59e0b" }}>Spaces</span>
                </span>
              </Link>
              <p style={{ color: "#64748b", fontSize: "0.9rem", marginTop: "4px" }}>
                {mode === "login" ? "Bienvenido de vuelta 👋" : "Crea tu cuenta gratis 🚀"}
              </p>
            </div>

            {/* Tabs */}
            <div style={{
              display: "flex", background: "#f1f5f9",
              borderRadius: "14px", padding: "4px", marginBottom: "2rem",
            }}>
              {(["login", "register"] as Mode[]).map(m => (
                <button key={m} onClick={() => { setMode(m); setError(""); setSuccess(""); }} style={{
                  flex: 1, padding: "0.75rem", borderRadius: "11px",
                  border: "none", cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700, fontSize: "0.88rem", transition: "all 0.25s",
                  background: mode === m ? "#fff" : "transparent",
                  color: mode === m ? "#0f172a" : "#94a3b8",
                  boxShadow: mode === m ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                }}>
                  {m === "login" ? "Iniciar sesión" : "Registrarse"}
                </button>
              ))}
            </div>

            {/* Error / Success */}
            {error && (
              <div style={{
                background: "#fef2f2", border: "1px solid #fecaca",
                borderRadius: "10px", padding: "0.75rem 1rem",
                marginBottom: "1rem", color: "#dc2626", fontSize: "0.88rem",
                display: "flex", gap: "8px", alignItems: "center",
              }}>
                ⚠️ {error}
              </div>
            )}
            {success && (
              <div style={{
                background: "#f0fdf4", border: "1px solid #bbf7d0",
                borderRadius: "10px", padding: "0.75rem 1rem",
                marginBottom: "1rem", color: "#16a34a", fontSize: "0.88rem",
                display: "flex", gap: "8px", alignItems: "center",
              }}>
                ✅ {success}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {mode === "register" && (
                <div style={{ position: "relative" }}>
                  <span style={{
                    position: "absolute", left: "1rem", top: "50%",
                    transform: "translateY(-50%)", pointerEvents: "none",
                  }}>👤</span>
                  <input type="text" placeholder="Nombre completo"
                    value={name} onChange={e => setName(e.target.value)}
                    required style={inp}
                    onFocus={e => (e.target.style.borderColor = "#2563EB")}
                    onBlur={e  => (e.target.style.borderColor = error ? "#fca5a5" : "#e2e8f0")}
                  />
                </div>
              )}

              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute", left: "1rem", top: "50%",
                  transform: "translateY(-50%)", pointerEvents: "none",
                }}>✉️</span>
                <input type="email" placeholder="Correo electrónico"
                  value={email} onChange={e => setEmail(e.target.value)}
                  required style={inp}
                  onFocus={e => (e.target.style.borderColor = "#2563EB")}
                  onBlur={e  => (e.target.style.borderColor = error ? "#fca5a5" : "#e2e8f0")}
                />
              </div>

              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute", left: "1rem", top: "50%",
                  transform: "translateY(-50%)", pointerEvents: "none",
                }}>🔒</span>
                <input type={showPass ? "text" : "password"} placeholder="Contraseña (mín. 6 caracteres)"
                  value={password} onChange={e => setPassword(e.target.value)}
                  required style={{ ...inp, paddingRight: "3rem" }}
                  onFocus={e => (e.target.style.borderColor = "#2563EB")}
                  onBlur={e  => (e.target.style.borderColor = error ? "#fca5a5" : "#e2e8f0")}
                />
                <button type="button" onClick={() => setShowPass(v => !v)} style={{
                  position: "absolute", right: "1rem", top: "50%",
                  transform: "translateY(-50%)", background: "none",
                  border: "none", cursor: "pointer", color: "#94a3b8",
                }}>{showPass ? "🙈" : "👁️"}</button>
              </div>

              {mode === "login" && (
                <div style={{ textAlign: "right" }}>
                  <a href="#" style={{ fontSize: "0.82rem", color: "#2563EB", textDecoration: "none" }}>
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              )}

              <button type="submit" disabled={loading} style={{
                background: loading
                  ? "#93c5fd"
                  : "linear-gradient(135deg, #2563EB, #1d4ed8)",
                color: "#fff", border: "none", borderRadius: "12px",
                padding: "1rem", fontWeight: 800, fontSize: "1rem",
                cursor: loading ? "not-allowed" : "pointer",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                marginTop: "0.25rem", transition: "all 0.2s",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              }}>
                {loading && (
                  <span style={{
                    width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "#fff", borderRadius: "50%",
                    display: "inline-block", animation: "spin 0.7s linear infinite",
                  }} />
                )}
                {loading ? "Cargando..." : mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
              </button>

              <div style={{
                display: "flex", alignItems: "center", gap: "1rem",
                color: "#94a3b8", fontSize: "0.85rem",
              }}>
                <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
                o continúa con
                <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
              </div>

              <button type="button" style={{
                width: "100%", padding: "0.9rem",
                background: "#fff", color: "#374151",
                border: "1.5px solid #e2e8f0", borderRadius: "12px",
                fontWeight: 600, fontSize: "0.95rem", cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                display: "flex", alignItems: "center",
                justifyContent: "center", gap: "8px",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "#d1d5db";
                  e.currentTarget.style.background = "#f9fafb";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "#e2e8f0";
                  e.currentTarget.style.background = "#fff";
                }}
              >
                <span style={{ fontWeight: 900, color: "#4285F4", fontSize: "1.1rem" }}>G</span>
                {mode === "login" ? "Iniciar con Google" : "Registrarse con Google"}
              </button>
            </form>
          </div>

          <p style={{ textAlign: "center", marginTop: "1.5rem", color: "#94a3b8", fontSize: "0.82rem" }}>
            © 2025 BookMySpaces · Todos los derechos reservados
          </p>
        </div>
      </main>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}