// ==========================================
// ROLE AUTHORIZATION MIDDLEWARE
// Restricts access based on user roles
// ==========================================
const roleMiddleware = (...allowedRoles) => {
  return (request, response, next) => {
    try {
      if (!request.user) {
        return response.status(401).json({
          success: false,
          message: "Unauthorized access",
        });
      }

      const { role } = request.user;

      if (!allowedRoles.includes(role)) {
        return response.status(403).json({
          success: false,
          message: "Access denied. You do not have permission.",
        });
      }

      next();
    } catch (error) {
      console.error("Role Authorization Error:", error.message);
      return response.status(500).json({
        success: false,
        message: "Role authorization failed",
      });
    }
  };
};

export default roleMiddleware;
