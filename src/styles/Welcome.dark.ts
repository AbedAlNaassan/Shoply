import {StyleSheet} from 'react-native';

export const getDarkStyles = (width: number, height: number, pixel: number) =>
  StyleSheet.create({
    container: {
      backgroundColor: '#12141C',
    },
    textandImageContainer: {
      width: '100%',
      height: height * 0.7,
    },
    textContainer: {
      height: '30%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    ImageContainer: {
      width: '100%',
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
      color: 'gray',
    },
    text: {
      fontSize: pixel * 20,
      color: 'gray',
    },
    buttonContainer: {
      height: height * 0.3,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: '15',
    },
    button: {
      width: 300,
      height: 50,
      borderWidth: 1,
      borderRadius: 50,
      borderColor: '#3A59D1',
      justifyContent: 'center',
      alignItems: 'center',
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
