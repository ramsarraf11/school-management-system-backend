import { Transaction } from 'sequelize';
import Organization from '../models/organization.model';
import User from '../models/user.model';
import { generateUsername, generatePassword } from '../utils/info.generation';
import bcrypt from 'bcrypt';
import { Logger } from '../utils/logger';

/**
 * Create a new organization and its admin user.
 * @param data - Partial organization data
 * @returns The created organization and admin credentials
 */
export const createOrganization = async (data: Partial<Organization>) => {
  const transaction = await Organization.sequelize?.transaction();
  try {

    const organization = await Organization.create(data, { transaction });

    const username = generateUsername(data.orgName || 'organization');
    const rawPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    Logger.instance().log(`Credentials for organization ${organization.orgName}: Username: ${username}, Password: ${rawPassword}`);

    await User.create({
      name: data.ownerName,
      email: data.email,
      password: hashedPassword,
      username: username,
      roleId: 2, // for school admins
      is_active: true,
      organizationId: organization.id, // Associate the admin with the organization
    },
      { transaction }
    );
    await transaction?.commit();

    // Return the organization and the raw password (optional, for admin use)
    return { organization, adminCredentials: { username, password: rawPassword } };
  } catch (error) {
    await transaction?.rollback();
    console.error('Error creating organization:', error);
    throw error;
  }
};

/**
 * Get all organizations.
 * @returns A list of all organizations
 */
export const getAllOrganizations = async () => {
  return await Organization.findAll({
    include: [User], // Include associated users
  });
};

/**
 * Get an organization by its ID.
 * @param id - Organization ID
 * @returns The organization if found
 */
export const getOrganizationById = async (id: number) => {
  return await Organization.findByPk(id, {
    include: [User], // Include associated users
  });
};

/**
 * Update an organization by its ID.
 * @param id - Organization ID
 * @param data - Partial organization data to update
 * @returns The updated organization
 */
export const updateOrganization = async (id: number, data: Partial<Organization>) => {
  const organization = await Organization.findByPk(id);
  if (!organization) {
    throw new Error('Organization not found');
  }
  return await organization.update(data);
};

/**
 * Delete an organization by its ID.
 * @param id - Organization ID
 * @returns The result of the deletion
 */
export const deleteOrganization = async (id: number) => {
  const organization = await Organization.findByPk(id);
  if (!organization) {
    throw new Error('Organization not found');
  }
  return await organization.destroy();
};

/**
 * Get all users associated with a specific organization.
 * @param organizationId - Organization ID
 * @returns A list of users belonging to the organization
 */
export const getUsersByOrganization = async (organizationId: number) => {
  return await User.findAll({
    where: { organizationId },
  });
};

// get by email
export const getOrganizationByEmail = async (email: string) => {
  return await Organization.findOne({
    where: { email },
  });
}
/**
 * Get an organization by its email.
 * @param email - Organization email
 * @returns The organization if found
 */