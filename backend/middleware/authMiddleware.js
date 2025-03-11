const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access Denied: No token provided" });
  }

  try {
    // Remove "Bearer " part from the token if present
    const actualToken = token.startsWith("Bearer ") ? token.slice(7) : token;
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    req.user = decoded;  // Save the decoded user data to the request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authenticateToken;