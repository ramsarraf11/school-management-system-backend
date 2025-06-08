import {
    createOrganization,
    getAllOrganizations,
    getOrganizationById,
    updateOrganization,
    deleteOrganization,
    getOrganizationByEmail
  } from '../repositories/organization.repository';
import { Logger } from '../utils/logger';
import { ResponseHandler } from '../utils/response.handler';
  
  export const createOrganizationService = async (data: any) => {
    const existing = await getOrganizationByEmailService(data.email);
    if (existing) {
      throw new Error('Organization already exists');
    }

    const result = await createOrganization(data);
    if (!result) {
      throw new Error('Failed to create organization');
    }
    return result;
  };
  
  export const getAllOrganizationsService = async () => {
    return await getAllOrganizations();
  };
  
  export const getOrganizationByIdService = async (id: number) => {
    return await getOrganizationById(id);
  };
  
  export const updateOrganizationService = async (id: number, data: any) => {
    return await updateOrganization(id, data);
  };
  
  export const deleteOrganizationService = async (id: number) => {
    return await deleteOrganization(id);
  };

  // get by email
  export const getOrganizationByEmailService = async (email: string): Promise<any> => {
    return await getOrganizationByEmail(email);
  }