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
        body: JSON.stringify({ email, password }),
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
    <div style={styles.wrapper}>
     
      <div style={{ ...styles.sideImage, backgroundImage: "url('/images/pexels-pixabay-207662.jpg')",opacity:0.85 }} />

      
      <div style={styles.container}>
        <h2 style={styles.title}>Login</h2>

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

        <div style={styles.buttonRow}>
          <button onClick={handleLogin} style={styles.buttonPrimary}>
            Login
          </button>
          <button onClick={onClose} style={styles.buttonSecondary}>
            Cancel
          </button>
        </div>

        {message && <p style={styles.message}>{message}</p>}
      </div>

      
      <div style={{ ...styles.sideImage, backgroundImage: "url('/images/pexels-pixabay-207662.jpg')",opacity:0.85 }} />
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f7f7f7",
  },
  sideImage: {
    flex: 1,
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  container: {
    width: "400px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "40px 30px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    textAlign: "center",
    margin: "0 40px",
  },
  title: {
    marginBottom: "25px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  buttonPrimary: {
    flex: 1,
    backgroundColor: "#DEB887",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    marginRight: "10px",
  },
  buttonSecondary: {
    flex: 1,
    backgroundColor: "#ccc",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
  message: {
    marginTop: "15px",
    color: "#444",
  },
};