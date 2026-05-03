"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname                = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { href: "/",         label: "Inicio",    icon: "🏠" },
    { href: "/about",    label: "Nosotros",  icon: "👥" },
    { href: "/alquiler", label: "Alquiler",  icon: "🏢" },
    { href: "/login",    label: "Mi cuenta", icon: "🔐" },
  ];

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        height: "68px",
        background: scrolled ? "rgba(255,255,255,0.95)" : "#fff",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: "1px solid #e2e8f0",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.07)" : "none",
        transition: "all 0.25s",
        display: "flex", alignItems: "center",
        padding: "0 1.5rem", gap: "1rem",
      }}>
        {/* Hamburger */}
        <button onClick={() => setOpen(v => !v)} aria-label="Menú" style={{
          background: "none", border: "none", cursor: "pointer",
          display: "flex", flexDirection: "column", gap: "5px", padding: "4px",
          flexShrink: 0,
        }}>
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: "block", width: "22px", height: "2px",
              background: "#0f172a", borderRadius: "2px", transition: "all 0.3s",
              ...(open && i===0 ? { transform: "translateY(7px) rotate(45deg)" }  : {}),
              ...(open && i===1 ? { opacity: 0 }                                   : {}),
              ...(open && i===2 ? { transform: "translateY(-7px) rotate(-45deg)" } : {}),
            }} />
          ))}
        </button>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px", marginRight: "auto" }}>
          <Image src="/imagenes/logo.png" alt="BookMySpaces" width={36} height={36}
            style={{ borderRadius: "8px", objectFit: "contain" }} />
          <span style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 800, fontSize: "1.2rem", color: "#2563EB", letterSpacing: "-0.5px",
          }}>
            Book<span style={{ color: "#0f172a" }}>my</span>
            <span style={{ color: "#f59e0b" }}>Spaces</span>
          </span>
        </Link>

        {/* Search */}
        <div style={{ position: "relative", flex: 1, maxWidth: "380px" }}>
          <span style={{
            position: "absolute", left: "12px", top: "50%",
            transform: "translateY(-50%)", fontSize: "14px", pointerEvents: "none",
          }}>🔍</span>
          <input type="search" placeholder="Buscar espacios..." style={{
            width: "100%", height: "38px",
            border: "1.5px solid #e2e8f0", borderRadius: "10px",
            padding: "0 1rem 0 2.25rem", fontSize: "0.85rem",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            outline: "none", background: "#f8fafc", transition: "border-color 0.2s",
          }}
            onFocus={e => (e.target.style.borderColor = "#2563EB")}
            onBlur={e  => (e.target.style.borderColor = "#e2e8f0")}
          />
        </div>

        {/* Icons */}
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          {[
            { icon: "/imagenes/notficacion.png", alt: "Notificaciones" },
            { icon: "/imagenes/correo.png",      alt: "Correo"         },
          ].map(item => (
            <button key={item.alt} style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "6px", borderRadius: "8px", transition: "background 0.2s",
              display: "flex", alignItems: "center",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "#f1f5f9")}
              onMouseLeave={e => (e.currentTarget.style.background = "none")}
            >
              <Image src={item.icon} alt={item.alt} width={22} height={22} style={{ objectFit: "contain" }} />
            </button>
          ))}
          <Link href="/login" style={{
            width: "36px", height: "36px", borderRadius: "50%",
            background: "linear-gradient(135deg, #2563EB, #1d4ed8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            textDecoration: "none", marginLeft: "4px", overflow: "hidden",
          }}>
            <Image src="/imagenes/perfil.png" alt="Perfil" width={22} height={22}
              style={{ objectFit: "contain", filter: "brightness(10)" }} />
          </Link>
        </div>
      </header>

      {/* Backdrop */}
      <div onClick={() => setOpen(false)} style={{
        position: "fixed", inset: 0, zIndex: 998,
        background: "rgba(15,23,42,0.4)", backdropFilter: "blur(3px)",
        opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none",
        transition: "opacity 0.3s",
      }} />

      {/* Drawer */}
      <aside style={{
        position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 999,
        width: "270px", background: "#fff",
        boxShadow: "4px 0 30px rgba(0,0,0,0.12)",
        transform: open ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        display: "flex", flexDirection: "column",
      }}>
        {/* Drawer header */}
        <div style={{
          padding: "1.25rem 1.5rem",
          borderBottom: "1px solid #f1f5f9",
          display: "flex", alignItems: "center", gap: "10px",
          background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
        }}>
          <Image src="/imagenes/logo_en_blanco.png" alt="Logo" width={36} height={36}
            style={{ borderRadius: "8px", objectFit: "contain" }} />
          <div>
            <div style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800, fontSize: "1.1rem", color: "#fff",
            }}>
              Bookmy<span style={{ color: "#f59e0b" }}>Spaces</span>
            </div>
            <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.55)", marginTop: "1px" }}>
              Espacios de trabajo · Panamá
            </p>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "1rem 0.75rem" }}>
          <p style={{
            fontSize: "0.68rem", fontWeight: 700, color: "#94a3b8",
            textTransform: "uppercase", letterSpacing: "1.5px",
            padding: "0 0.75rem", marginBottom: "0.5rem",
          }}>Navegación</p>
          {links.map(l => {
            const active = pathname === l.href;
            return (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "0.75rem", borderRadius: "10px",
                textDecoration: "none", marginBottom: "2px",
                fontWeight: active ? 700 : 500, fontSize: "0.93rem",
                color: active ? "#2563EB" : "#374151",
                background: active ? "#eff6ff" : "transparent",
                borderLeft: active ? "3px solid #2563EB" : "3px solid transparent",
                transition: "all 0.15s",
              }}>
                <span>{l.icon}</span>
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid #f1f5f9" }}>
          <p style={{ fontSize: "0.72rem", color: "#94a3b8" }}>© 2025 BookMySpaces</p>
        </div>
      </aside>
    </>
  );
}