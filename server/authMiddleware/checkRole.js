const User = require('../models/User');

const checkRole = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user.role === "Teacher" || user.role === "teacher") {
      next();
    } else {
      res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = checkRole;