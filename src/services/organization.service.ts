import {
    createOrganization,
    getAllOrganizations,
    getOrganizationById,
    updateOrganization,
    deleteOrganization,
  } from '../repositories/organization.repository';
import { Logger } from '../utils/logger';
  
  export const createOrganizationService = async (data: any) => {
    const result = await createOrganization(data);
  
    if (!result) {
      throw new Error('Failed to create organization');
    }
  
    const { organization, adminCredentials } = result;
    Logger.instance().log(`School Admin Credentials:, ${adminCredentials}`);
    return organization;
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