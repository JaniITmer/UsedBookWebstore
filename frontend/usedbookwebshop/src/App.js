import { useState } from "react";
import AuthForm from "./AuthForm";
import Books from "./Books";

function App() {
  const [mode, setMode] = useState(null); // "login", "register", null
  const [token, setToken] = useState(localStorage.getItem("jwt") || null);

  const handleLoginSuccess = (jwt) => {
    localStorage.setItem("jwt", jwt);
    setToken(jwt);
    setMode(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setToken(null);
  };

 return (
    <div>
      {/* NAVBAR */}
      <nav style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        padding: "10px 20px", 
        backgroundColor: "#2a52a0ff", 
        color: "white" 
      }}>
        <h2>UsedBookWebStore</h2>
        <div>
          {!token && (
            <>
              <button 
                onClick={() => setMode("login")} 
                style={{ margin: "0 10px", padding: "6px 12px" }}
              >
                Login
              </button>
              <button 
                onClick={() => setMode("register")} 
                style={{ margin: "0 10px", padding: "6px 12px" }}
              >
                Registration
              </button>
            </>
          )}
          {token && (
            <button 
              onClick={handleLogout} 
              style={{ margin: "0 10px", padding: "6px 12px" }}
            >
              Log out
            </button>
          )}
        </div>
      </nav>

      {/* OLDAL TARTALOM */}
      <div style={{ padding: "20px", textAlign: "center" }}>
        {!token && mode && (
          <AuthForm
            mode={mode}
            onClose={() => setMode(null)}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {token && <Books token={token} />}
      </div>
    </div>
  );
}

export default App;