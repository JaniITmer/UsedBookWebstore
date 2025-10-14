import React, { useEffect, useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

export default function Chat({ token }) {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("Connecting...");

 useEffect(() => {
  let newConnection = null;

  const connect = async () => {
    try {
      newConnection = new HubConnectionBuilder()
        .withUrl(`https://localhost:7122/chatHub?access_token=${token}`)
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build();

      newConnection.off("ReceiveMessage"); // remove old handlers just in case
      newConnection.on("ReceiveMessage", (senderId, msg) => {
        setMessages((prev) => [...prev, { senderId, text: msg }]);
      });

      await newConnection.start();
      setConnection(newConnection);
      setStatus("Connected ✅");
    } catch (e) {
      console.error("SignalR connection failed: ", e);
      setStatus("Connection failed ❌");
    }
  };

  connect();

  return () => {
    if (newConnection) {
      newConnection.stop();
    }
  };
}, [token]);

  const sendMessage = async () => {
    if (connection && message && receiver) {
      try {
        await connection.invoke("SendMessage", receiver, message);
        setMessages((prev) => [...prev, { senderId: "You", text: message }]);
        setMessage("");
      } catch (e) {
        console.error("Send failed: ", e);
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2>💬 Real-time Chat</h2>
      <p>{status}</p>

      <div style={styles.chatBox}>
        {messages.map((m, i) => (
          <div key={i} style={styles.message}>
            <strong>{m.senderId}:</strong> {m.text}
          </div>
        ))}
      </div>

      <div style={styles.inputBox}>
        <input
          type="text"
          placeholder="Receiver user ID"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "30px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  chatBox: {
    border: "1px solid #ddd",
    padding: "10px",
    height: "300px",
    overflowY: "auto",
    marginBottom: "10px",
    textAlign: "left",
  },
  message: { marginBottom: "5px" },
  inputBox: { display: "flex", gap: "5px" },
  input: { flex: 1, padding: "5px" },
  button: { padding: "5px 10px" },
};