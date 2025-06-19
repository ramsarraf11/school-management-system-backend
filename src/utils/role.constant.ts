interface DefaultRoles {
    role_name: string;
    role_slug: string;
    is_system: boolean;
  }
  
  export const SUPER_ADMIN_SLUG = "super_admin";
  export const ORGANIZATION_ADMIN_SLUG = "organization_admin";
  export const USER_SLUG = "user";
  export const TUTOR_SLUG = "tutor";
  
  export const AVAILABLE_DEFAULT_ROLES: DefaultRoles[] = [
    {
      role_name: "Super Admin",
      role_slug: SUPER_ADMIN_SLUG,
      is_system: true // This is the owner of the LMS platform
    },
    {
      role_name: "Organization Admin",
      role_slug: ORGANIZATION_ADMIN_SLUG,
      is_system: true // This represents admins for onboarded organizations
    },
    {
      role_name: "User",
      role_slug: USER_SLUG,
      is_system: true // Users who will buy and learn courses
    },
    {
      role_name: "Tutor",
      role_slug: TUTOR_SLUG,
      is_system: true // Teachers who can register and upload courses
    }
  ];
  