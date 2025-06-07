import { Router } from 'express';
import {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
} from '../controllers/organization.controller';
import {  } from '../middlewares/auth.middleware';

const orgRouter = Router();

orgRouter.post('/',  createOrganization);
orgRouter.get('/',  getAllOrganizations);
orgRouter.get('/:id',  getOrganizationById);
orgRouter.put('/:id',  updateOrganization);
orgRouter.delete('/:id',  deleteOrganization);

export default orgRouter;