/* 
  TEMP NOTE - useAuth will not be using react query 
  to do anything, bear that in mind. 
*/
import { LoginFormData, RegisterFormData, User } from '../../types/types';
import { setCookieToken, clearCookieToken } from './useUser';
import api from '../../axios/api';
import { useUser } from './useUser';

export function useAuth() {
  const { updateUser } = useUser();
  const register = async (formData: RegisterFormData) => {
    try {
      const { data } = await api.post('/users/', formData);
      console.log(data);
      updateUser(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (formData: LoginFormData) => {
    try {
      const { data } = await api.post('/users/login', formData);
      console.log(data);
      updateUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    clearCookieToken();
  };

  return { register, login, logout };
}
