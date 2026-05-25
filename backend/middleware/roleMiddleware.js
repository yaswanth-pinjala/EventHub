const roleMiddleware = (requiredRole, requiredAdminType = null) => {
  return (req, res, next) => {

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // check main role
    if (req.user.userType !== requiredRole) {
      return res.status(403).json({ message: "Forbidden: wrong role" });
    }

    // check admin type
    if (requiredAdminType && req.user.role !== requiredAdminType) {
      return res.status(403).json({ message: "Forbidden: wrong admin type" });
    }

    next();
  };
};

module.exports = roleMiddleware;