import "../App.css";

const UserProfile = ({ profile, onLogout }) => {
  if (!profile) return null;

  return (
    <div>
      <div className="profile-card">
        <img src={profile.pictureUrl} alt="Profile" className="profile-img" />
        <div className="profile-info">
          <h3>{profile.displayName}</h3>
          <span className="status-badge">● Active</span>
        </div>
      </div>

      <button onClick={onLogout} className="logout-btn">
        Log out
      </button>
    </div>
  );
};

export default UserProfile;
