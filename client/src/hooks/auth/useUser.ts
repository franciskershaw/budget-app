import { useQueryClient, useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../reactQuery/queryKeys';
import { User } from '../../types/types';

export function useUser() {
  const queryClient = useQueryClient();

	

  // called from useAuth
  function updateUser(newUser: User) {
    queryClient.setQueryData([queryKeys.user], newUser);
  }

  function clearUser() {
    queryClient.setQueryData([queryKeys.user], null);
    clearCookieToken();
  }

  return { updateUser, clearUser };
}

export function setCookieToken(token: string) {
  document.cookie = `token=${token}; Secure; SameSite=Strict;`;
}

export function clearCookieToken() {
  document.cookie = 'token=; Secure; SameSite=Strict; max-age=0;';
}
