export const createConfig = (token: string, signal?: AbortSignal) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal,
  };

  return config;
};
