import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Encryptor() {
  const [mode, setMode] = useState("encrypt");
  const [plainText, setPlainText] = useState("");
  const [cipherText, setCipherText] = useState("");
  const [history, setHistory] = useState([]);

  const handleProcess = async () => {
    const text = mode === "encrypt" ? plainText : cipherText;
    const res = await axios.post("http://127.0.0.1:8000/api/process/", {
      mode,
      text,
    });
    if (mode === "encrypt") setCipherText(res.data.result);
    else setPlainText(res.data.result);
    fetchHistory();
  };

  const fetchHistory = async () => {
    const res = await axios.get("http://127.0.0.1:8000/api/history/");
    setHistory(res.data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #0d47a1, #42a5f5)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 10px",
        color: "#fff",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: 30, textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
        🔐 CryptoPhone — Chiffreur / Déchiffreur
      </h1>

      {/* Sélecteur du mode */}
      <div
        style={{
          background: "rgba(255,255,255,0.2)",
          borderRadius: 20,
          padding: 10,
          marginBottom: 20,
        }}
      >
        <label style={{ marginRight: 10 }}>Mode :</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          style={{
            borderRadius: 10,
            padding: 5,
            border: "none",
            background: "#fff",
            color: "#0d47a1",
            fontWeight: "600",
          }}
        >
          <option value="encrypt">Chiffrer</option>
          <option value="decrypt">Déchiffrer</option>
        </select>
      </div>

      {/* Les deux "téléphones" */}
      <div
        style={{
          display: "flex",
          gap: 30,
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Téléphone gauche : texte clair */}
        <div
          style={{
            width: 250,
            height: 480,
            borderRadius: 40,
            background: "#fff",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 20,
            position: "relative",
          }}
        >
          {/* Encoche */}
          <div
            style={{
              width: 120,
              height: 30,
              background: "#000",
              borderRadius: "0 0 15px 15px",
              marginBottom: 10,
            }}
          ></div>

          <h3 style={{ color: "#0d47a1", marginBottom: 10 }}>Texte clair</h3>
          <textarea
            rows="10"
            value={plainText}
            onChange={(e) => setPlainText(e.target.value)}
            readOnly={mode === "decrypt"}
            placeholder="Saisissez le texte ici..."
            style={{
              flex: 1,
              width: "100%",
              border: "none",
              resize: "none",
              borderRadius: 15,
              padding: 10,
              background: "#e3f2fd",
              color: "#0d47a1",
              fontSize: 14,
              outline: "none",
            }}
          />
        </div>

        {/* Téléphone droit : texte chiffré */}
        <div
          style={{
            width: 250,
            height: 480,
            borderRadius: 40,
            background: "#fff",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 20,
            position: "relative",
          }}
        >
          {/* Encoche */}
          <div
            style={{
              width: 120,
              height: 30,
              background: "#000",
              borderRadius: "0 0 15px 15px",
              marginBottom: 10,
            }}
          ></div>

          <h3 style={{ color: "#0d47a1", marginBottom: 10 }}>Texte chiffré</h3>
          <textarea
            rows="10"
            value={cipherText}
            onChange={(e) => setCipherText(e.target.value)}
            readOnly={mode === "encrypt"}
            placeholder="Résultat chiffré..."
            style={{
              flex: 1,
              width: "100%",
              border: "none",
              resize: "none",
              borderRadius: 15,
              padding: 10,
              background: "#e3f2fd",
              color: "#0d47a1",
              fontSize: 14,
              outline: "none",
            }}
          />
        </div>
      </div>

      {/* Bouton d'action */}
      <button
        onClick={handleProcess}
        style={{
          marginTop: 30,
          background: "#fff",
          color: "#0d47a1",
          fontWeight: "700",
          border: "none",
          padding: "12px 40px",
          borderRadius: 30,
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          cursor: "pointer",
          transition: "0.3s",
        }}
        onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
      >
        {mode === "encrypt" ? "🔒 Chiffrer" : "🔓 Déchiffrer"}
      </button>

      {/* Historique */}
      <div
        style={{
          marginTop: 40,
          width: "80%",
          background: "rgba(255,255,255,0.15)",
          borderRadius: 20,
          padding: 20,
          maxWidth: 700,
        }}
      >
        <h3 style={{ textAlign: "center" }}>📜 Historique</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {history.map((item) => (
            <li
              key={item.id}
              style={{
                background: "rgba(255,255,255,0.2)",
                borderRadius: 10,
                padding: 10,
                margin: "8px 0",
              }}
            >
              <b>[{item.mode}]</b> {item.date_operation} —{" "}
              {item.mode === "encrypt"
                ? item.texte_clair.slice(0, 30)
                : item.texte_chiffre.slice(0, 30)}
              ...
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
