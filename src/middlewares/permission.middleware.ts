import { Request, Response, NextFunction } from 'express';
import RolePermission from '../models/role.permission.model';
import User from '../models/user.model';

/**
 * Middleware to enforce permission-based access control.
 * @param requiredPermission - The permission required to access the route
 */
export const checkPermission = (requiredPermission: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.id; // Assuming `req.user` is populated by authentication middleware
            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized: User not found' });
            }

            const rolePermissions = await RolePermission.findAll({
                where: { roleId: user.roleId },
                include: ['permission'],
            });

            const hasPermission = rolePermissions.some(
                (rp) => rp.permission.permissionName === requiredPermission
            );

            if (!hasPermission) {
                return res.status(403).json({ message: 'Forbidden: You do not have access to this resource' });
            }

            next(); // User has the required permission, proceed to the next middleware
        } catch (error) {
            console.error('Error in permission middleware:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    };
};