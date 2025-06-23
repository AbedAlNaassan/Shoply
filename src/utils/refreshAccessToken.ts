import {refreshTokenApi} from '../api/auth';
import {useAuthStore} from '../zustand/AuthStore';

export const refreshAccessToken = async () => {
  const refreshToken = useAuthStore.getState().refreshToken;

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const {accessToken, refreshToken: newRefreshToken} = await refreshTokenApi({
      refreshToken,
    });

    await useAuthStore.getState().setTokens({
      accessToken,
      refreshToken: newRefreshToken,
    });

    return accessToken;
  } catch (err) {
    useAuthStore.getState().logout();
    throw err;
  }
};
