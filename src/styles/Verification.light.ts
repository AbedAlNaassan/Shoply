import {Dimensions, PixelRatio, StyleSheet} from 'react-native';

const height = Dimensions.get('window').height;
const pixel = PixelRatio.getFontScale();

export const lightStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  textContainer: {
    width: '100%',
    height: height * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shoply: {
    fontSize: pixel * 40,
    fontWeight: 'bold',
    color: '#3A59D1',
  },
  verification: {
    fontSize: pixel * 40,
    fontFamily: 'Roboto',
  },
  text: {
    fontSize: pixel * 20,
    textAlign: 'center',
    marginTop: 10,
  },
  cancel: {
    width: '100%',
    height: height * 0.4,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
