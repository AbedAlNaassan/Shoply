import {PixelRatio, StyleSheet} from 'react-native';
const pixel = PixelRatio.getFontScale();

export const darkStyles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: '#12141C',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#12141C',
  },
  back: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Roboto',
    color: '#3A59D1',
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontWeight: '600',
    color: '#3A59D1',
    marginBottom: 10,
  },
  description: {
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#3A59D1',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

  buttonText: {
    color: '#fff',
    fontFamily: 'Roboto',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: pixel * 18,
    color: 'red',
    fontWeight: 'bold',
  },
});
