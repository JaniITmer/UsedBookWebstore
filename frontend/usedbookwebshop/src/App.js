import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Books from "./Books";
import Profile from "./Profile";
import ViewProfile from "./ViewProfile";
import AddBook from "./AddBook";
import Mybooks from "./Mybooks";
import Chat from "./Chat";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    if (!token) return;

    const interval = setInterval(() => {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          alert("Session expired, please log in again!");
          handleLogout();
        }
      } catch {
        handleLogout();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [token]);

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
          <h2 style={{ cursor: "pointer" }}>
            <Link to="/usedbookwebstore" style={{ color: "white", textDecoration: "none" }}>UsedBookWebStore</Link>
          </h2>
          <div>
            {!token && (
              <>
                <Link to="/usedbookwebstore/login"><button>Login</button></Link>
                <Link to="/usedbookwebstore/register"><button>Registration</button></Link>
              </>
            )}
            {token && (
              <>
                <Link to="/usedbookwebstore/chat"><button>Chat</button></Link>
                <Link to="/usedbookwebstore/mybooks"><button>My own books</button></Link>
                <Link to="/usedbookwebstore/profile"><button>Profile</button></Link>
                <Link to="/usedbookwebstore/add-book"><button>New Book</button></Link>
                <button onClick={handleLogout}>Log out</button>
              </>
            )}
          </div>
        </nav>

        <div style={{ padding: "20px", textAlign: "center" }}>
          <Routes>
            {!token && (
              <>
                <Route path="/usedbookwebstore/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
                <Route path="/usedbookwebstore/register" element={<RegisterForm />} />
                <Route path="*" element={<Navigate to="/usedbookwebstore/login" />} />
              </>
            )}

            {token && (
              <>
                <Route path="/usedbookwebstore" element={<Books token={token} />} />
                <Route path="/profile/:id" element={<ViewProfile token={token} />} />
                <Route path="/usedbookwebstore/chat" element={<Chat token={token} />} />
                <Route path="/usedbookwebstore/mybooks" element={<Mybooks token={token} />} />
                <Route path="/usedbookwebstore/profile" element={<Profile token={token} />} />
                <Route path="/usedbookwebstore/add-book" element={<AddBook token={token} />} />
                <Route path="*" element={<Navigate to="/usedbookwebstore" />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;