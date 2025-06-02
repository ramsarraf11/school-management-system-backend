import Organization from '../models/organization.model';
import User from '../models/user.model'; // Import the User model
import { generateUsername, generatePassword } from '../utils/info.generation'; // Import the utility functions
import bcrypt from 'bcrypt';
import { handleError } from '../utils/response.util';

export const createOrganization = async (data: Partial<Organization>) => {
  try {
    // Create the organization
    const organization = await Organization.create(data);

    // Generate a username and password for the organization admin
    const username = generateUsername(data.name || 'organization');
    const rawPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    // Store the generated credentials in the User table
    await User.create({
      name: data.name || 'Organization Admin',
      email: data.email || `${username}@example.com`, // Use the organization's email or a placeholder
      password: hashedPassword,
      username: username,
      roleId: 2, // Assuming 2 is the role ID for "Admin"
      is_active: true,
      organizationId: organization.id, // Associate the user with the organization
    });

    // Return the organization and the raw password (optional, for admin use)
    return { organization, adminCredentials: { username, password: rawPassword } };
  } catch (error) {
    console.error('Error creating organization:', error);
  }
};

export const getAllOrganizations = async () => {
  return await Organization.findAll();
};

export const getOrganizationById = async (id: number) => {
  return await Organization.findByPk(id);
};

export const updateOrganization = async (id: number, data: Partial<Organization>) => {
  const organization = await Organization.findByPk(id);
  if (!organization) {
    throw new Error('Organization not found');
  }
  return await organization.update(data);
};

export const deleteOrganization = async (id: number) => {
  const organization = await Organization.findByPk(id);
  if (!organization) {
    throw new Error('Organization not found');
  }
  return await organization.destroy();
};

export const getUsersByOrganization = async (organizationId: number) => {
  return await User.findAll({
    where: { organizationId },
  });
};