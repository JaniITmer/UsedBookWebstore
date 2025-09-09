import { useState } from "react";

const API_URL = "https://localhost:7122/api/auth";

export default function AuthForm({ mode, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const endpoint = mode === "login" ? "login" : "register";
      const res = await fetch(`${API_URL}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        const text = await res.text();
        setMessage(text || "Hiba történt");
        return;
      }

      const data = await res.json();
      if (mode === "login" && data.token) {
        onLoginSuccess(data.token); // Token átadása az App.js-nek
        setMessage("Sikeres bejelentkezés!");
      } else if (mode === "register") {
        setMessage("Sikeres regisztráció! Most már be tudsz jelentkezni.");
      } else {
        setMessage("Hiba történt.");
      }

    } catch (error) {
      console.error(error);
      setMessage("Hiba történt a kapcsolat során.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", padding: "20px", border: "1px solid #ccc" }}>
      <h2>{mode === "login" ? "Login" : "Registration"}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: "10px", width: "100%" }}
      />
      <button onClick={handleSubmit} style={{ marginRight: "10px" }}>
        {mode === "login" ? "Login" : "Registration"}
      </button>
      <button onClick={onClose}>Cancel</button>
      {message && <p>{message}</p>}
    </div>
  );
}