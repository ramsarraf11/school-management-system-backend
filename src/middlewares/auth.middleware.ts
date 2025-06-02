// src/middlewares/auth.middleware.ts

import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.util";
import { getUserById } from "../repositories/user.repository";

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Authorization token missing or malformed" });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token) as { id: number };

    const user = await getUserById(decoded.id);

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    if (!user.is_active) {
      res.status(403).json({ message: "User is inactive" });
      return;
    }
    const _user = {
      id: user.id,
      email: user.email,
      organizationId: 100
    }

    req.user = _user;
    next();
  } catch (error: any) {
    console.error("[AUTH ERROR]", error?.message || error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
