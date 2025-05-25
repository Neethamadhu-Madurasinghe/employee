import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error("FATAL ERROR: JWT_SECRET is not defined.");
  process.exit(1); // Exit if JWT_SECRET is not set
}

// Extend Express Request type to include user
export interface AuthenticatedRequest extends Request {
  user?: any; // Define a more specific type for user if available, e.g., UserPayload
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Access token is missing' });
  }

  jwt.verify(token, JWT_SECRET!, (err: any, user: any) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Access token expired' });
      }
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user; // Add user payload to request object
    next();
  });
};

// Middleware to check for specific roles
export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: 'User role not available' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: `Role ${req.user.role} is not authorized for this resource` });
    }
    next();
  };
};
