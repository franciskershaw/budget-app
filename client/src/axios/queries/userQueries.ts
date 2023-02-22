import api from '../api';
import { User } from '../../types/types';
import { AxiosResponse } from 'axios';
import { createConfig } from '../helperFunctions/helperFunctions';

export const getUser = async (user: User | null, signal?: AbortSignal) => {
  if (!user) return null;
  const config = createConfig(user.token, signal);
  const { data }: AxiosResponse = await api.get(`/api/users/${user.userInfo._id}`, config);
  console.log(data);
  return data;
};
