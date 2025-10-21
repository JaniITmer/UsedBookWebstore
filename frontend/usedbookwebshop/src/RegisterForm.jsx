import { useState } from "react";

const API_URL = "https://localhost:7122/api/auth/register";

export default function RegisterForm({ onClose }) {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          fullName,
          displayName,
          password,
          phonenumber,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data?.message) {
          setMessage(data.message);
        } else if (Array.isArray(data)) {
          const messages = data.map((err) => err.description).join("\n");
          setMessage(messages);
        } else {
          setMessage("Registration failed");
        }
        return;
      }

      setMessage("Registration successful! You can log in now.");
      setEmail("");
      setFullName("");
      setDisplayName("");
      setPassword("");
      setPhoneNumber("");
    } catch (err) {
      console.error(err);
      setMessage("Network error.");
    }
  };

   return (
    <div style={styles.wrapper}>
      
      <div
        style={{
          ...styles.sideImage,
          backgroundImage: "url('/images/pexels-element5-1370295.jpg')",
          opacity: 0.85
        }}
        aria-hidden="true"
      />

      
      <div style={styles.container}>
        <h2>Register</h2>
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Display name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Phone number"
          value={phonenumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={styles.input}
        />

        <div>
          <button onClick={handleRegister} style={styles.button}>
            Register
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>

        {message && <p style={{ whiteSpace: "pre-line" }}>{message}</p>}
      </div>

      
      <div
        style={{
          ...styles.sideImage,
          backgroundImage: "url('/images/pexels-element5-1370295.jpg')",
           opacity:0.85
        }}
        aria-hidden="true"
      />
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    width: "100vw",
  },
  sideImage: {
    flex: 1,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  container: {
    flex: "0 0 400px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderLeft: "1px solid #ccc",
    borderRight: "1px solid #ccc",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
  },
  input: {
    display: "block",
    marginBottom: "10px",
    width: "100%",
    padding: "8px",
  },
  button: {
    marginRight: "10px",
    padding: "8px 16px",
    cursor: "pointer",
  },
};