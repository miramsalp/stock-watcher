const axios = require("axios");

exports.verifyLineToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const idToken = authHeader.split(" ")[1];

    const response = await axios.post(
      "https://api.line.me/oauth2/v2.1/verify",
      new URLSearchParams({
        id_token: idToken,
        client_id: process.env.LINE_LOGIN_CHANNEL_ID,
      })
    );

    const userId = response.data.sub;

    req.user = { userId };

    next();
  } catch (error) {
    console.error("Auth Error:", error.response?.data || error.message);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
