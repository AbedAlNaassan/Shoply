import {StyleSheet} from 'react-native';

export const getLightStyles = (width: number, height: number, pixel: number) =>
  StyleSheet.create({
    container: {
      width,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textandImageContainer: {
      width,
      height: height * 0.8,
      marginTop: height * 0.02,
    },
    textContainer: {
      height: height * 0.3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    ImageContainer: {
      width,
      height: height * 0.5,
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
      height: height * 0.2,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: height * 0.09,
      paddingBottom: height * 0.05,
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
