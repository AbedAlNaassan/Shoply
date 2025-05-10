import {Dimensions, PixelRatio, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');
const pixel = PixelRatio.getFontScale();

export const LightStyles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textandImageContainer: {
    width: width,
    height: height * 0.8,
  },
  textContainer: {
    width: width,
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageContainer: {
    width: width,
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  animateImage: {
    width: '100%',
    height: '100%',
  },

  shoply: {
    fontFamily: 'Roboto',
    fontSize: pixel * 40,

    color: '#3A59D1',
  },

  welcome: {
    fontSize: pixel * 40,
    fontFamily: 'Roboto',
  },
  text: {
    fontSize: pixel * 20,
  },
  buttonContainer: {
    width: width,
    height: height * 0.2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#3A59D1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  login: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0,
  },
  register: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0,
  },
  textButton: {
    fontSize: pixel * 25,
    fontFamily: 'Roboto',
    color: '#3A59D1',
  },
});
