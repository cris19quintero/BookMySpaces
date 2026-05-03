"use client";

import { useState } from "react";

type Props = {
  officeName: string;
  priceMonthly: string;
  priceDaily: string;
  onClose: () => void;
};

type Step = "form" | "success";

export default function RentalModal({ officeName, priceMonthly, priceDaily, onClose }: Props) {
  const [step, setStep]            = useState<Step>("form");
  const [rentalType, setRentalType] = useState("");
  const [payment, setPayment]      = useState("");
  const [startDate, setStartDate]  = useState("");
  const [endDate, setEndDate]      = useState("");
  // Card fields
  const [cardNum, setCardNum]   = useState("");
  const [expiry, setExpiry]     = useState("");
  const [cvv, setCvv]           = useState("");
  const [cardName, setCardName] = useState("");

  const total = rentalType === "monthly" ? priceMonthly
              : rentalType === "daily"   ? priceDaily
              : "—";

  const inp: React.CSSProperties = {
    width: "100%", padding: "0.75rem 1rem",
    border: "1.5px solid #e2e8f0", borderRadius: "10px",
    fontSize: "0.9rem", fontFamily: "'Plus Jakarta Sans', sans-serif",
    outline: "none", color: "#0f172a", background: "#fff",
    transition: "border-color 0.2s",
  };

  const lbl: React.CSSProperties = {
    display: "block", marginBottom: "6px",
    fontSize: "0.82rem", fontWeight: 600, color: "#374151",
  };

  // ── SUCCESS ──
  if (step === "success") {
    return (
      <Overlay onClose={onClose}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "72px", height: "72px", borderRadius: "50%",
            background: "#dcfce7", display: "flex",
            alignItems: "center", justifyContent: "center",
            fontSize: "2rem", margin: "0 auto 1.5rem",
          }}>✅</div>
          <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#16a34a", marginBottom: "0.75rem" }}>
            ¡Reserva Confirmada!
          </h2>
          <p style={{ color: "#64748b", marginBottom: "0.5rem" }}>
            Has reservado <strong>{officeName}</strong> exitosamente.
          </p>
          <p style={{ color: "#64748b", marginBottom: "0.5rem" }}>
            Tipo: {rentalType === "monthly" ? "Mensual" : "Diario"} · Total: <strong>{total}</strong>
          </p>
          <p style={{ color: "#94a3b8", fontSize: "0.85rem", marginBottom: "2rem" }}>
            Recibirás un correo con los detalles de tu reserva.
          </p>
          <button onClick={onClose} style={{
            background: "#2563EB", color: "#fff", border: "none",
            borderRadius: "10px", padding: "0.85rem 2.5rem",
            fontWeight: 700, cursor: "pointer",
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.95rem",
          }}>Cerrar</button>
        </div>
      </Overlay>
    );
  }

  // ── FORM ──
  return (
    <Overlay onClose={onClose}>
      {/* Header */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "flex-start",
        marginBottom: "1.25rem", paddingBottom: "1rem", borderBottom: "1px solid #f1f5f9",
      }}>
        <div>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0f172a" }}>
            Alquiler de Espacio
          </h2>
          <p style={{ color: "#64748b", fontSize: "0.85rem", marginTop: "2px" }}>{officeName}</p>
        </div>
        <button onClick={onClose} style={{
          background: "#f1f5f9", border: "none", cursor: "pointer",
          width: "32px", height: "32px", borderRadius: "8px",
          fontSize: "1rem", color: "#64748b", display: "flex",
          alignItems: "center", justifyContent: "center",
        }}>✕</button>
      </div>

      {/* Price chips */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {[
          { type: "monthly", label: "Mensual", price: priceMonthly },
          { type: "daily",   label: "Diario",  price: priceDaily   },
        ].map(opt => (
          <button
            key={opt.type}
            onClick={() => setRentalType(opt.type)}
            style={{
              flex: 1, minWidth: "120px",
              padding: "0.75rem", borderRadius: "10px",
              border: rentalType === opt.type ? "2px solid #2563EB" : "1.5px solid #e2e8f0",
              background: rentalType === opt.type ? "#eff6ff" : "#fff",
              cursor: "pointer", transition: "all 0.2s", textAlign: "left",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            <div style={{
              fontSize: "0.75rem", fontWeight: 600, color: "#64748b",
              textTransform: "uppercase", letterSpacing: "0.5px",
            }}>{opt.label}</div>
            <div style={{
              fontSize: "1.05rem", fontWeight: 800, color: "#2563EB",
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}>{opt.price}</div>
          </button>
        ))}
      </div>

      <form
        onSubmit={e => { e.preventDefault(); setStep("success"); }}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {/* Dates */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          <div>
            <label style={lbl}>Fecha inicio</label>
            <input type="date" value={startDate}
              onChange={e => setStartDate(e.target.value)}
              required style={inp}
              onFocus={e => (e.target.style.borderColor = "#2563EB")}
              onBlur={e  => (e.target.style.borderColor = "#e2e8f0")}
            />
          </div>
          {rentalType === "monthly" && (
            <div>
              <label style={lbl}>Fecha fin</label>
              <input type="date" value={endDate}
                onChange={e => setEndDate(e.target.value)}
                style={inp}
                onFocus={e => (e.target.style.borderColor = "#2563EB")}
                onBlur={e  => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
          )}
        </div>

        {/* Payment method */}
        <div>
          <label style={lbl}>Método de pago</label>
          <select value={payment} onChange={e => setPayment(e.target.value)}
            required style={{ ...inp, cursor: "pointer" }}
            onFocus={e => (e.target.style.borderColor = "#2563EB")}
            onBlur={e  => (e.target.style.borderColor = "#e2e8f0")}
          >
            <option value="">— Seleccionar —</option>
            <option value="card">Tarjeta de Crédito / Débito</option>
            <option value="transfer">Transferencia Bancaria</option>
          </select>
        </div>

        {/* Credit card fields */}
        {payment === "card" && (
          <div style={{
            background: "#f8fafc", borderRadius: "12px", padding: "1rem",
            display: "flex", flexDirection: "column", gap: "0.75rem",
            border: "1px solid #e2e8f0",
          }}>
            <div>
              <label style={lbl}>Número de tarjeta</label>
              <input type="text" placeholder="0000 0000 0000 0000"
                value={cardNum} onChange={e => setCardNum(e.target.value)}
                maxLength={19} style={inp}
                onFocus={e => (e.target.style.borderColor = "#2563EB")}
                onBlur={e  => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div>
                <label style={lbl}>Vencimiento</label>
                <input type="text" placeholder="MM/AA"
                  value={expiry} onChange={e => setExpiry(e.target.value)}
                  maxLength={5} style={inp}
                  onFocus={e => (e.target.style.borderColor = "#2563EB")}
                  onBlur={e  => (e.target.style.borderColor = "#e2e8f0")}
                />
              </div>
              <div>
                <label style={lbl}>CVV</label>
                <input type="text" placeholder="123"
                  value={cvv} onChange={e => setCvv(e.target.value)}
                  maxLength={4} style={inp}
                  onFocus={e => (e.target.style.borderColor = "#2563EB")}
                  onBlur={e  => (e.target.style.borderColor = "#e2e8f0")}
                />
              </div>
            </div>
            <div>
              <label style={lbl}>Nombre en la tarjeta</label>
              <input type="text" placeholder="JUAN PÉREZ"
                value={cardName} onChange={e => setCardName(e.target.value)}
                style={inp}
                onFocus={e => (e.target.style.borderColor = "#2563EB")}
                onBlur={e  => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
          </div>
        )}

        {/* Bank transfer */}
        {payment === "transfer" && (
          <div style={{
            background: "#f8fafc", borderRadius: "12px", padding: "1rem",
            border: "1px solid #e2e8f0", fontSize: "0.88rem", lineHeight: 1.8,
            color: "#374151",
          }}>
            <p style={{ fontWeight: 700, marginBottom: "0.5rem" }}>Datos bancarios:</p>
            <p>🏦 Banco Nacional de Panamá</p>
            <p>📋 Cuenta: 123-456-789</p>
            <p>👤 Beneficiario: BookMySpaces S.A.</p>
            <p>📝 Concepto: Alquiler — {officeName}</p>
          </div>
        )}

        {/* Total */}
        {rentalType && (
          <div style={{
            background: "#eff6ff", borderRadius: "12px", padding: "1rem 1.25rem",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ color: "#374151", fontWeight: 600 }}>Total a pagar</span>
            <span style={{
              fontSize: "1.25rem", fontWeight: 800, color: "#2563EB",
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}>{total}</span>
          </div>
        )}

        <button type="submit" style={{
          background: "linear-gradient(135deg, #2563EB, #1d4ed8)",
          color: "#fff", border: "none", borderRadius: "12px",
          padding: "1rem", fontWeight: 700, fontSize: "1rem",
          cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif",
          letterSpacing: "0.3px", transition: "opacity 0.2s",
        }}>
          Confirmar Reserva
        </button>
      </form>
    </Overlay>
  );
}

// ── Helper overlay ──
function Overlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(15,23,42,0.55)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="anim-scale"
        style={{
          background: "#fff", borderRadius: "20px",
          padding: "2rem", width: "100%", maxWidth: "520px",
          maxHeight: "90vh", overflowY: "auto",
          boxShadow: "0 24px 64px rgba(0,0,0,0.2)",
        }}
      >
        {children}
      </div>
    </div>
  );
}