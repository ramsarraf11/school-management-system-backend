/**
 * Generate a random username based on the user's name and a random number.
 * @param name - The user's name
 * @returns A unique username
 */
export const generateUsername = (name: string): string => {
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit random number
    const sanitizedName = name.trim().toLowerCase().replace(/\s+/g, ''); // Remove spaces and convert to lowercase
    return `${sanitizedName}${randomNumber}`;
  };
  
  /**
   * Generate a random secure password.
   * @returns A randomly generated password
   */
  export const generatePassword = (): string => {
    const length = 12; // Length of the password
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@!#$&';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };