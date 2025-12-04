import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../lib/auth.js';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    userId: string;
    email?: string;
    name?: string;
    role?: string;
  };
}

export async function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'Missing authorization header',
        code: 'MISSING_AUTH_HEADER'
      });
    }
    
    const token = authHeader.substring(7);
    
    try {
      const payload = verifyToken(token);
      
      req.user = {
        id: payload.userId,
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
      };
      
      next();
    } catch (error: any) {
      console.error('[Auth] Token validation failed:', error.message);
      return res.status(401).json({ 
        error: 'Invalid or expired token',
        code: 'INVALID_TOKEN'
      });
    }
  } catch (error) {
    console.error('[Auth] Middleware error:', error);
    res.status(500).json({ 
      error: 'Authentication failed',
      code: 'AUTH_ERROR'
    });
  }
}

// Middleware opcional - não bloqueia se não autenticado
export async function optionalAuthMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      
      try {
        const payload = verifyToken(token);
        req.user = {
          id: payload.userId,
          userId: payload.userId,
          email: payload.email,
          role: payload.role,
        };
      } catch {
        // Ignora erro - continua sem autenticação
      }
    }
    
    next();
  } catch (error) {
    // Ignora erros - continua sem autenticação
    next();
  }
}
