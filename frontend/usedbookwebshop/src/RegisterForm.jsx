import { useState } from "react";

const API_URL = "https://localhost:7122/api/auth/register";

export default function RegisterForm({ onClose }) {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber,setPhoneNumber]=useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email,fullName, password,phonenumber})
      });

       const data = await res.json(); 
    if (!res.ok) {
      
      if (Array.isArray(data)) {
        const messages = data.map(err => err.description).join("\n");
        setMessage(messages);
      } else {
        setMessage(data || "Registration failed");
      }
      return;
    }

      setMessage("Registration successful! You can log in now.");
    } catch (err) {
      console.error(err);
      setMessage("Network error.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Registration</h2>
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
      <button onClick={handleRegister} style={styles.button}>Register</button>
      <button onClick={onClose}>Cancel</button>
      {message && <p style={{ whiteSpace: "pre-line" }}>{message}</p>}
    </div>
  );
}

const styles = {
  container: { maxWidth: "400px", margin: "20px auto", padding: "20px", border: "1px solid #ccc" },
  input: { display: "block", marginBottom: "10px", width: "100%" },
  button: { marginRight: "10px" }
};