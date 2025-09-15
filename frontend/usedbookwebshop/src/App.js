import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import Books from "./Books";
import Profile from "./Profile";
import AddBook from "./AddBook";
import Mybooks from "./Mybooks";

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwt") || null);

  const handleLoginSuccess = (jwt) => {
    localStorage.setItem("jwt", jwt);
    setToken(jwt);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setToken(null);
  };

  return (
    <Router>
      <div>
        <nav style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          padding: "10px 20px", 
          backgroundColor: "#282c34", 
          color: "white" 
        }}>
          <h2 style={{ cursor: "pointer" }}><Link to="/" style={{ color: "white", textDecoration: "none" }}>UsedBookWebStore</Link></h2>
          <div>
            {!token && (
              <>
                <Link to="/login"><button>Login</button></Link>
                <Link to="/register"><button>Registration</button></Link>
                
              </>
            )}
            {token && (
              <>
                <Link to="/mybooks"><button>My own books</button></Link>
                <Link to="/profile"><button>Profile</button></Link>
                <button onClick={handleLogout}>Log out</button>
                <Link to="/add-book"><button>New Book</button></Link>
              </>
            )}
          </div>
        </nav>

        <div style={{ padding: "20px", textAlign: "center" }}>
          <Routes>
            
            {!token && (
              <>
                <Route path="/login" element={<AuthForm mode="login" onLoginSuccess={handleLoginSuccess} />} />
                <Route path="/register" element={<AuthForm mode="register" onLoginSuccess={handleLoginSuccess} />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            )}

            
            {token && (
              <>
                <Route path="/mybooks" element={<Mybooks token={token} />} />
                <Route path="/profile" element={<Profile token={token} />} />
                <Route path="/add-book" element={<AddBook token={token} />} />
                <Route path="/" element={<Books token={token} />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;