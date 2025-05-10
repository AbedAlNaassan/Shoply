import React, {createContext, useContext, useState, ReactNode} from 'react';

type AuthContextType = {
  user: {email: string} | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<{email: string} | null>(null);

  const login = (email: string, password: string) => {
    if (email === 'eurisko@gmail.com' && password === 'academy2025') {
      setUser({email});
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};
