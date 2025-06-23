import {useEffect, useRef} from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
  ParamListBase,
} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StatusBar, StyleSheet} from 'react-native';
import {ThemeProvider, useTheme} from './src/context/ThemeContext';
import RootNavigator from './src/navigation/RootNavigator';
import BootSplash from 'react-native-bootsplash';
import RNBootSplash from 'react-native-bootsplash';
const AppContent = () => {
  //get isDark from useTheme Context
  const {isDarkMode} = useTheme();

  //Create a reference to the navigation container to programmatically control navigation
  const navigationRef = useRef<NavigationContainerRef<ParamListBase>>(null);

  //If a user opens myapp://product/42, they go to ProductDetails screen with id = 42.
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

  useEffect(() => {
    const init = async () => {};

    //After it's done, hide the splash screen with a fade effect.
    init().finally(async () => {
      await BootSplash.hide({fade: true});
      console.log('BootSplash has been hidden successfully');
    });
  }, []);

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer
        onReady={() => RNBootSplash.hide()}
        ref={navigationRef}
        linking={linking}>
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
