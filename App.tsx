import React, {useRef} from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
  ParamListBase,
} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StatusBar, StyleSheet} from 'react-native';
import {ThemeProvider, useTheme} from './src/context/ThemeContext';
// Import the necessary navigation functions
import RootNavigator from './src/navigation/RootNavigator';

const AppContent = () => {
  const {isDarkMode} = useTheme();

  // Fix: Add <ParamListBase> to NavigationContainerRef generic
  const navigationRef = useRef<NavigationContainerRef<ParamListBase>>(null);

  const linking = {
    prefixes: ['myapp://'],
    config: {
      screens: {
        ProductDetails: {
          path: 'product/:id',
          parse: {
            id: (id: string) => `${id}`,
          },
        },
      },
    },
  };

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* Pass navigationRef to NavigationContainer and RootNavigator */}
      <NavigationContainer ref={navigationRef} linking={linking}>
        <RootNavigator navigationRef={navigationRef} />
      </NavigationContainer>
    </>
  );
};

const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
