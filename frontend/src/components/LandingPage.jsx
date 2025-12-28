import "../App.css";

const LandingPage = ({ onLogin }) => {
  return (
    <div
      className="container"
      style={{ textAlign: "center", marginTop: "10vh" }}
    >
      <div
        className="card"
        style={{ maxWidth: "400px", margin: "0 auto", padding: "40px" }}
      >
        <div style={{ fontSize: "60px", marginBottom: "20px" }}>
          <img
            src="/stock.png"
            alt="Stock Watcher Logo"
            style={{ width: "80px", height: "80px" }}
          />
        </div>

        <h1 style={{ margin: "0 0 10px 0", color: "#1a202c" }}>
          Stock Watcher
        </h1>
        <p style={{ color: "#718096", marginBottom: "30px" }}>
          ระบบแจ้งเตือนราคาหุ้นผ่าน LINE <br />
          (Real-time Notification)
        </p>

        <button
          onClick={onLogin}
          className="submit-btn"
          style={{
            backgroundColor: "#06c755",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M22 10.4C22 5.5 17.5 1.5 12 1.5C6.5 1.5 2 5.5 2 10.4C2 14.5 5.2 17.9 9.8 19L8.7 22.5C8.6 22.9 9 23.2 9.3 23L14.3 19.2H14.4C18.9 19 22 15.1 22 10.4Z" />
          </svg>
          Login with LINE
        </button>
      </div>

      <p style={{ marginTop: "30px", color: "#a0aec0", fontSize: "0.8rem" }}>
        Stock Watcher © 2025 | Developed by Plasmarim
      </p>
    </div>
  );
};

export default LandingPage;
