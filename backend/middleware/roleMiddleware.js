/**
 * roleMiddleware("admin")
 * roleMiddleware("admin", "project")
 */
const roleMiddleware = (requiredRole, requiredAdminType = null) => {
 return (req, res, next) => {
 if (!req.user) {
 return res.status(401).json({ message: "Unauthorized" });
 }
 if (req.user.userType !== requiredRole) {
 return res.status(403).json({ message: "Forbidden: wrong role" });
 }
 if (requiredAdminType && req.user.adminType !== requiredAdminType) {
 return res.status(403).json({ message: "Forbidden: wrong admin type" });
 }
 next();
 };
};
module.exports = roleMiddleware;