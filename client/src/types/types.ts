export interface User {
  userInfo: {
    username: string;
    email: string;
    spaces: string[];
  };
  token: string;
}
