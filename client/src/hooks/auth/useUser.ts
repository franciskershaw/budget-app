export const setCookieToken = (token: string) => {
  document.cookie = `token=${token}; Secure; SameSite=Strict;`;
};

export const clearCookieToken = () => {
  document.cookie = 'token=; Secure; SameSite=Strict; max-age=0;';
};
