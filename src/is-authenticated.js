const jwt = require("jsonwebtoken");
const SECRET_TOKEN = process.env.SECRET_TOKEN;
const User = require("./models/user.model");

const isAuthenticated = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({ message: "No authorization found" });
    }

    const token = authorizationHeader.replace("Bearer ", "");

    const payload = jwt.verify(token, SECRET_TOKEN, { algorithms: ["HS256"] });

    const user = await User.findById(payload._id);

    if (!user) {
      return res.status(401).json({ message: "Denied!" });
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isAuthenticated;
