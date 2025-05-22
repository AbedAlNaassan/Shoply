import {refreshTokenApi} from '../api/auth'; // or wherever your function lives
import {useAuthStore} from '../zustand/AuthStore'; // adjust path if needed

export const refreshAccessToken = async () => {
  const refreshToken = useAuthStore.getState().refreshToken;

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const {accessToken, refreshToken: newRefreshToken} = await refreshTokenApi({
      refreshToken,
    });

    useAuthStore.getState().setTokens({
      accessToken,
      refreshToken: newRefreshToken,
    });

    return accessToken;
  } catch (err) {
    useAuthStore.getState().logout(); // optional fallback
    throw err;
  }
};
