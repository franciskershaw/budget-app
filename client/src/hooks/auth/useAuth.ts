import { useState, useEffect } from 'react';
import { LoginFormData, User } from '../../types/types';
import { setCookieToken, clearCookieToken } from './useUser';
import api from '../../axios/api';


export function useAuth() {

  const login = async (formData: LoginFormData) => {
    try {
      const response = await api.post('/users/login', formData);
      console.log(response);
      setCookieToken(response.data.token)
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    clearCookieToken()
  };

  return { login, logout };
}
