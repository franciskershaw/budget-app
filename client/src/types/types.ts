export interface User {
  userInfo: {
    _id: string,
    username: string;
    email: string;
    spaces: string[];
  };
  token: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}