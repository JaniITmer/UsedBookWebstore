import { useEffect, useState } from "react";
import "./styles/Profile.css"

export default function Profile({ token }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("https://localhost:7122/api/auth/me", {
          headers: { Authorization: "Bearer " + token }
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser({ error: "Profile load error." });
        }
      } catch (err) {
        console.error(err);
        setUser({ error: "Error while profile loading." });
      }
    };

    fetchProfile();
  }, [token]);

  if (!user) return <div className="profile-loading">Loading...</div>;

  if (user.error) return <div className="profile-error">{user.error}</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName || "User")}&background=282c34&color=fff`}
            alt="Avatar"
          />
        </div>
        <h2>{user.fullName}</h2>
        <p className="profile-email"><strong>email:</strong> {user.email}</p>
        <div className="profile-details">
          
          
        </div>
      </div>
    </div>
  );
}