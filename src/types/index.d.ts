
export type TokenData = {
    userId: number;
    roleName: string;
    userName: string;
  };
  
  declare global {
    // Express
    namespace Express {
      export interface Request {
        tokenData: TokenData;
      }
    }
  }