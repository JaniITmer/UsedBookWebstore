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
        phonenumber 
      })
    });

    const data = await res.json();

    if (!res.ok) {
      
      if (data?.message) {
        setMessage(data.message);
      } 
      
      else if (Array.isArray(data)) {
        const messages = data.map(err => err.description).join("\n");
        setMessage(messages);
      } else {
        setMessage("Registration failed");
      }
      return;
    }

    
    setMessage("Registration successful! You can log in now.");
    
    setEmail(""); setFullName(""); setDisplayName(""); setPassword(""); setPhoneNumber("");
  } catch (err) {
    console.error(err);
    setMessage("Network error.");
  }
};

  return (
    <div style={styles.container}>
      <h2>Registration</h2>
    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
  <label htmlFor="email" style={{ width: "120px" }}>Email:</label>
  <input
    id="email"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    style={{ flex: 1 }}
  />
</div>
<div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
  <label htmlFor="fullname" style={{ width: "120px" }}>Full name:</label>
  <input
    id="fullname"
    type="text"
    value={fullName}
    onChange={(e) => setFullName(e.target.value)}
    style={{ flex: 1 }}
  />
</div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
  <label htmlFor="displayname" style={{ width: "120px" }}>Display name:</label>
  <input
    id="displayname"
    type="text"
    value={displayName}
    onChange={(e) => setDisplayName(e.target.value)}
    style={{ flex: 1 }}
  />
</div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
  <label htmlFor="password" style={{ width: "120px" }}>Password:</label>
  <input
    id="password"
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    style={{ flex: 1 }}
  />
</div>
<div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
  <label htmlFor="phonenumber" style={{ width: "120px" }}>Phone number:</label>
  <input
    id="phonenumber"
    type="text"
    value={displayName}
    onChange={(e) => setPhoneNumber(e.target.value)}
    style={{ flex: 1 }}
  />
</div>
     
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