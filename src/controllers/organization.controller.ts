import { Request, Response } from 'express';
import {
  createOrganizationService,
  getAllOrganizationsService,
  getOrganizationByIdService,
  updateOrganizationService,
  deleteOrganizationService,
} from '../services/organization.service';
import { handleSuccess, handleFailure } from '../utils/response.util';

export const createOrganization = async (req: Request, res: Response) => {
  try {
    const organization = await createOrganizationService(req.body);
    handleSuccess(res, 'Organization created successfully', organization);
  } catch (error) {
    console.log(error)
  }
};

export const getAllOrganizations = async (req: Request, res: Response) => {
  try {
    const organizations = await getAllOrganizationsService();
    handleSuccess(res, 'Organizations retrieved successfully', organizations);
  } catch (error) {
    console.log(error)
  }
};

export const getOrganizationById = async (req: Request, res: Response) => {
  try {
    const organization = await getOrganizationByIdService(Number(req.params.id));
    if (!organization) {
      handleFailure(res, 'Organization not found', 404);
      return;
    }
    handleSuccess(res, 'Organization retrieved successfully', organization);
  } catch (error) {
    console.log(error)
  }
};

export const updateOrganization = async (req: Request, res: Response) => {
  try {
    const organization = await updateOrganizationService(Number(req.params.id), req.body);
    handleSuccess(res, 'Organization updated successfully', organization);
  } catch (error) {
    console.log(error)
  }
};

export const deleteOrganization = async (req: Request, res: Response) => {
  try {
    await deleteOrganizationService(Number(req.params.id));
    handleSuccess(res, 'Organization deleted successfully');
  } catch (error) {
    console.log(error)
  }
};