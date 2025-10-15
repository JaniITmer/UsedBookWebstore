import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles/Profile.css";

export default function ViewProfile({ token }) {
  const { id } = useParams(); 
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`https://localhost:7122/api/auth/${id}`, {
          headers: { Authorization: "Bearer " + token },
        });
        if (!res.ok) {
          setError("User not found or access denied ❌");
          return;
        }
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error(err);
        setError("Error while loading profile ❌");
      }
    };

    fetchProfile();
  }, [id, token]);

  if (error) return <div className="profile-error">{error}</div>;
  if (!profile) return <div className="profile-loading">Loading profile...</div>;

  const visibleFields = Object.entries(profile).filter(([_, value]) => value !== null);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              profile.fullName || "User"
            )}&background=4a5568&color=fff`}
            alt="Avatar"
          />
        </div>

        <h2>{profile.fullName || "Anonymous User"}</h2>

        <div className="profile-details">
          {visibleFields.length > 0 ? (
            <>
              {profile.email && (
                <p className="profile-email">
                  <strong>Email:</strong> {profile.email}
                </p>
              )}
              {profile.phoneNumber && (
                <p className="profile-phone-number">
                  <strong>Phone number:</strong> {profile.phoneNumber}
                </p>
              )}
            </>
          ) : (
            <p className="no-info">This user keeps their profile private 🔒</p>
          )}
        </div>
      </div>
    </div>
  );
}