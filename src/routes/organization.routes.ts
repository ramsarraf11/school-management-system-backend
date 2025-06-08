import { Router } from 'express';
import {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
} from '../controllers/organization.controller';
import { authenticate } from '../middlewares/auth.middleware';

const orgRouter = Router();

orgRouter.post('/', authenticate, createOrganization);
orgRouter.get('/', authenticate, getAllOrganizations);
orgRouter.get('/:id', authenticate, getOrganizationById);
orgRouter.put('/:id', authenticate, updateOrganization);
orgRouter.delete('/:id', authenticate, deleteOrganization);

export default orgRouter;