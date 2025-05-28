import {PixelRatio, StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

const {height} = Dimensions.get('window');
const pixel = PixelRatio.getFontScale();

// Base styles that don't depend on theme
const baseStyles = StyleSheet.create({
  header: {
    width: '100%',
    height: height * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile: {
    fontFamily: 'Roboto',
    fontSize: pixel * 40,
    color: '#3A59D1',
    marginBottom: 15,
  },
  avatar: {width: 120, height: 120, borderRadius: 60},
  placeholderImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: '#ccc',
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    width: '100%',
    height: height * 0.6,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: 320,
    padding: 15,
    marginTop: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 50,
    color: '#3A59D1',
  },
  error: {
    color: 'red',
    alignSelf: 'flex-start',
    paddingLeft: 15,
    marginTop: 5,
  },
});

// Themed styles
const themedStyles = (theme: 'light' | 'dark') =>
  StyleSheet.create({
    ...baseStyles,
    container: {
      flex: 1,
      width: '100%', // ✅ '100%' is acceptable in StyleSheet.create context
      backgroundColor: theme === 'dark' ? '#12141C' : '#fff',
    },
  });

export {baseStyles, themedStyles};
