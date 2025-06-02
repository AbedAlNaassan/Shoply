import {create} from 'zustand';
import EncryptedStorage from 'react-native-encrypted-storage';

type User = {email: string} | null;

type AuthStore = {
  user: User;
  accessToken: string | null;
  refreshToken: string | null;
  isNewUser: boolean;
  isVerified: boolean;
  email: string;
  setEmail: (email: string) => void;
  setUser: (user: User) => void;
  setTokens: (tokens: {
    accessToken: string;
    refreshToken: string;
  }) => Promise<void>;
  setIsNewUser: (value: boolean) => void;
  setIsVerified: (value: boolean) => void;
  loadStoredTokens: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>(set => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isNewUser: false,
  isVerified: false,
  email: '',

  setEmail: email => set({email}),

  setUser: user => set({user}),

  setTokens: async ({accessToken, refreshToken}) => {
    try {
      await EncryptedStorage.setItem(
        'auth_tokens',
        JSON.stringify({accessToken, refreshToken}),
      );
      set({accessToken, refreshToken});
    } catch (error) {
      console.error('Failed to store tokens securely', error);
    }
  },

  setIsNewUser: value => set({isNewUser: value}),

  setIsVerified: value => set({isVerified: value}),

  loadStoredTokens: async () => {
    try {
      const data = await EncryptedStorage.getItem('auth_tokens');
      if (data) {
        const {accessToken, refreshToken} = JSON.parse(data);
        set({accessToken, refreshToken});
      }
    } catch (error) {
      console.error('Failed to load tokens', error);
    }
  },

  logout: async () => {
    try {
      await EncryptedStorage.removeItem('auth_tokens');
    } catch (e) {
      console.warn('Could not clear tokens from storage');
    }
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isNewUser: false,
      isVerified: false,
      email: '',
    });
  },
}));
