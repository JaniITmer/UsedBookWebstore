import { useState } from "react";
import AuthForm from "./AuthForm";
import Books from "./Books";
import Profile from "./Profile"; 

function App() {
  const [mode, setMode] = useState(null); 
  const [token, setToken] = useState(localStorage.getItem("jwt") || null);

  const handleLoginSuccess = (jwt) => {
    localStorage.setItem("jwt", jwt);
    setToken(jwt);
    setMode(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setToken(null);
    setMode(null);
  };

  return (
    <div>
      
      <nav style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        padding: "10px 20px", 
        backgroundColor: "#282c34", 
        color: "white" 
      }}>
        <h2 style={{ cursor: "pointer" }} 
    onClick={() => setMode(null)}>UsedBookWebStore</h2>
        <div>
          {!token && (
            <>
              <button onClick={() => setMode("login")}>Login</button>
              <button onClick={() => setMode("register")}>Registration</button>
            </>
          )}
          {token && (
            <>
              <button onClick={() => setMode("profile")}>Profile</button>
              <button onClick={handleLogout}>Log out</button>
            </>
          )}
        </div>
      </nav>

      
      <div style={{ padding: "20px", textAlign: "center" }}>
        {!token && mode && (
          <AuthForm
            mode={mode}
            onClose={() => setMode(null)}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {token && mode === "profile" && <Profile token={token} />}

        {token && mode !== "profile" && <Books token={token} />}
      </div>
    </div>
  );
}

export default App;