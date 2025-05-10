import {Dimensions, PixelRatio, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');
const pixel = PixelRatio.getFontScale();

export const lightStyles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textandCodeContainer: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: '100%',
    height: '40%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  shoply: {
    fontSize: pixel * 40,
    fontWeight: 'bold',
    color: '#3A59D1',
  },
  verification: {
    fontSize: pixel * 40,
    fontWeight: 'bold',
  },
  text: {
    fontSize: pixel * 20,
    textAlign: 'center',
    marginTop: 10,
  },
  cancel: {
    width: width,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
