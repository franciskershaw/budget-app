/* 
  TEMP NOTE - useAuth will not be using react query 
  to do anything, bear that in mind. 
*/
import { LoginFormData, RegisterFormData, User } from '../../types/types';
import { setCookieToken, clearCookieToken } from './useUser';
import api from '../../axios/api';

export function useAuth() {
  const register = async (formData: RegisterFormData) => {
    try {
      const response = await api.post('/users/', formData);
      console.log(response);
      return response.data
    } catch (error) {
      console.log(error)
    }
  };

  const login = async (formData: LoginFormData) => {
    try {
      const response = await api.post('/users/login', formData);
      console.log(response);
      setCookieToken(response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    clearCookieToken();
  };

  return { register, login, logout };
}
