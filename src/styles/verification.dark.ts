import {Dimensions, PixelRatio, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');
const pixel = PixelRatio.getFontScale();

export const darkStyles = StyleSheet.create({
  textandCodeContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#12141C',
  },
  textContainer: {
    width: '100%',
    height: '20%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: '10%',
  },
  shoply: {
    fontSize: pixel * 40,
    fontWeight: 'bold',
    color: '#3A59D1',
  },
  verification: {
    fontSize: pixel * 40,
    fontWeight: 'bold',
    color: 'gray',
  },
  text: {
    fontSize: pixel * 20,
    textAlign: 'center',
    marginTop: 10,
    color: 'gray',
  },
  cancel: {
    width: width * 0.9,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
