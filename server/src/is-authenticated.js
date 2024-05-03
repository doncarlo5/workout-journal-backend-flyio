const jwt = require("jsonwebtoken");
const SECRET_TOKEN = process.env.SECRET_TOKEN;
const User = require("./models/user.model");

const isAuthenticated = async (req, res, next) => {
  try {
    console.log("is Authenticated begin");

    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({ message: "No authorization found" });
    }

    const token = authorizationHeader.replace("Bearer ", "");

    console.log("token", token);

    if (!token) {
      // If token is undefined, return a 401 Unauthorized status
      return res.status(401).json({ message: "Unauthorized" });
    }

    const payload = jwt.verify(token, SECRET_TOKEN, { algorithms: ["HS256"] });

    console.log("payload", payload);

    const user = await User.findById(payload._id);

    console.log("user", user);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isAuthenticated;
