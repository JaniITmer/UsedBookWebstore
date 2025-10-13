import { useState } from "react";

const API_URL = "https://localhost:7122/api/auth/login";

export default function LoginForm({ onLoginSuccess, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        const text = await res.text();
        setMessage(text || "Invalid credentials");
        return;
      }

      const data = await res.json();
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        onLoginSuccess(data.token);
        setMessage("Login successful!");
      }
    } catch (err) {
      console.error(err);
      setMessage("Network error.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleLogin} style={styles.button}>Login</button>
      <button onClick={onClose}>Cancel</button>
      {message && <p>{message}</p>}
    </div>
  );
}

const styles = {
  container: { maxWidth: "400px", margin: "20px auto", padding: "20px", border: "1px solid #ccc" },
  input: { display: "block", marginBottom: "10px", width: "100%" },
  button: { marginRight: "10px" }
};