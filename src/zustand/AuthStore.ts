import {create} from 'zustand';

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
  setTokens: (tokens: {accessToken: string; refreshToken: string}) => void;
  setIsNewUser: (value: boolean) => void;
  setIsVerified: (value: boolean) => void;
  logout: () => void;
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

  setTokens: ({accessToken, refreshToken}) =>
    set({
      accessToken: accessToken || null,
      refreshToken: refreshToken || null,
    }),

  setIsNewUser: value => set({isNewUser: value}),

  setIsVerified: value => set({isVerified: value}),

  logout: () =>
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isNewUser: false,
      isVerified: false,
      email: '',
    }),
}));
