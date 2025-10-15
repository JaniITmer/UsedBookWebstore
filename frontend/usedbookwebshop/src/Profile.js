import { useEffect, useState } from "react";
import "./styles/Profile.css";

export default function Profile({ token }) {
  const [user, setUser] = useState(null);
  const [privacy, setPrivacy] = useState({
    showEmail: true,
    showPhoneNumber: false,
    showFullName: true
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("https://localhost:7122/api/auth/me", {
          headers: { Authorization: "Bearer " + token },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          setPrivacy({
            showEmail: data.showEmail,
            showPhoneNumber: data.showPhoneNumber,
            showFullName: data.showFullName,
          });
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

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    const res = await fetch("https://localhost:7122/api/auth/privacy", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(privacy),
    });

    setSaving(false);
    setMessage(res.ok ? "Settings saved successfully ✅" : "Save failed ❌");
  };

  if (!user) return <div className="profile-loading">Loading...</div>;
  if (user.error) return <div className="profile-error">{user.error}</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.fullName || "User"
            )}&background=282c34&color=fff`}
            alt="Avatar"
          />
        </div>

        <h2>{user.fullName}</h2>

        <p className="profile-email">
          <strong>email:</strong> {user.email}
        </p>
                <p className="profile-fullname">
          <strong>full name:</strong> {user.fullname}
        </p>
        <p className="profile-phone-number">
          <strong>phone number:</strong> {user.phoneNumber}
        </p>

        <hr />

        <h3>🔒 Privacy settings</h3>
        <div className="privacy-settings">
          <label>
            <input
              type="checkbox"
              checked={privacy.showFullName}
              onChange={(e) =>
                setPrivacy({ ...privacy, showFullName: e.target.checked })
              }
            />{" "}
            Show full name
          </label>

          <label>
            <input
              type="checkbox"
              checked={privacy.showEmail}
              onChange={(e) =>
                setPrivacy({ ...privacy, showEmail: e.target.checked })
              }
            />{" "}
            Show email
          </label>

          <label>
            <input
              type="checkbox"
              checked={privacy.showPhoneNumber}
              onChange={(e) =>
                setPrivacy({ ...privacy, showPhoneNumber: e.target.checked })
              }
            />{" "}
            Show phone number
          </label>

          <button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save settings"}
          </button>
          {message && <p className="save-message">{message}</p>}
        </div>
      </div>
    </div>
  );
}