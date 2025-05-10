import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {useColorScheme} from 'react-native';

// Define theme type
type Theme = 'light' | 'dark';

// Define the context type
interface ThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// Create context with default value as undefined
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Define the ThemeProvider props interface
interface ThemeProviderProps {
  children: ReactNode;
}

// ThemeProvider component to manage the theme context
export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  const systemTheme = useColorScheme(); // Get the system theme
  const [theme, setTheme] = useState<Theme>(systemTheme || 'light'); // Initialize theme state

  // Update theme when system theme changes
  useEffect(() => {
    setTheme(systemTheme || 'light');
  }, [systemTheme]);

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const isDarkMode = theme === 'dark'; // Check if the current theme is dark

  return (
    <ThemeContext.Provider value={{theme, isDarkMode, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
