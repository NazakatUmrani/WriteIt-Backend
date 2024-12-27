const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Please authenticate using a valid token",
    });
  try {
    const userId = jwt.verify(token, JWT_SECRET);
    req.user = userId.user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Please authenticate using a valid token",
      error,
    });
  }
};

module.exports = fetchUser;
