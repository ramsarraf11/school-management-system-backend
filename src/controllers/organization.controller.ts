import { Request, Response } from 'express';
import {
  createOrganizationService,
  getAllOrganizationsService,
  getOrganizationByIdService,
  updateOrganizationService,
  deleteOrganizationService,
  getOrganizationByEmailService
} from '../services/organization.service';
import { ResponseHandler } from '../utils/response.handler';
import { Logger } from '../utils/logger';
import { validationResult } from 'express-validator';

export const createOrganization = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    ResponseHandler.failure(req, res, 'Validation failed', 400, new Error(errors.array().map(e => e.msg).join(', '))); 
    return;
  }
  try {
    const organization = await createOrganizationService(req.body);
    ResponseHandler.success(req, res, 'Organization created successfully', 201, organization);
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    Logger.instance().log(error.message);
    ResponseHandler.failure(req, res, 'Error while creating organization', 500, error);
  }
};

export const getAllOrganizations = async (req: Request, res: Response): Promise<void> => {
  try {
    const organizations = await getAllOrganizationsService();
    ResponseHandler.success(req, res, 'Organizations retrieved successfully', 200, organizations);
  } catch (error) {
    Logger.instance().log(error instanceof Error ? error.message : String(error));
    ResponseHandler.failure(req, res, 'Error retrieving organizations', 500, error instanceof Error ? error : undefined);
  }
};

export const getOrganizationById = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    ResponseHandler.failure(req, res, 'Invalid organization ID', 400);
    return;
  }

  try {
    const organization = await getOrganizationByIdService(id);
    if (!organization) {
      ResponseHandler.failure(req, res, 'Organization not found', 404);
      return;
    }
    ResponseHandler.success(req, res, 'Organization retrieved successfully', 200, organization);
  } catch (error) {
    Logger.instance().log(error instanceof Error ? error.message : String(error));
    ResponseHandler.failure(req, res, 'Error retrieving organization', 500, error instanceof Error ? error : undefined);
  }
};

export const updateOrganization = async (req: Request, res: Response): Promise<void> => {
  try {
    // fix it
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(err => err.msg);
      ResponseHandler.failure(req, res, 'Validation failed', 400, new Error(errorMessages.join(', ')));
      return;
    }

    const organization = await updateOrganizationService(Number(req.params.id), req.body);
    ResponseHandler.success(req, res, 'Organization updated successfully', 200, organization);
  } catch (error) {
    Logger.instance().log(error instanceof Error ? error.message : String(error));
    ResponseHandler.failure(req, res, 'Error updating organization', 500, error instanceof Error ? error : undefined);
  }
};

export const deleteOrganization = async (req: Request, res: Response): Promise<void> => {
  try {
    await deleteOrganizationService(Number(req.params.id));
    ResponseHandler.success(req, res, 'Organization deleted successfully', 200);
  } catch (error) {
    Logger.instance().log(error instanceof Error ? error.message : String(error));
    ResponseHandler.failure(req, res, 'Error deleting organization', 500, error instanceof Error ? error : undefined);
  }
};