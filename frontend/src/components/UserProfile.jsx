const UserProfile = ({ profile }) => {
  if (!profile) return null;
  return (
    <div className="profile-card">
      <img src={profile.pictureUrl} alt="Profile" className="profile-img" />
      <div className="profile-info">
        <h3>{profile.displayName}</h3>
        <span className="status-badge">● Active</span>
      </div>
    </div>
  );
};
export default UserProfile;