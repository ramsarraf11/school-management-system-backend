import { DecodedUser } from '../../src/types/user';

declare global {
  namespace Express {
    interface Request {
      user: DecodedUser;
    }
  }
}
