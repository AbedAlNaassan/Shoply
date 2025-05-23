import {Dimensions, PixelRatio, StyleSheet} from 'react-native';

const pixelScale = PixelRatio.getFontScale();
const {height} = Dimensions.get('window');

export const darkStyles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#12141C',
  },
  header: {
    width: '100%',
    height: height * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30 * pixelScale,
    fontFamily: 'Roboto',
    color: '#3A59D1',
  },
  main: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
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
    marginTop: 5,
    width: 300,
    textAlign: 'left',
    marginLeft: 30,
  },
  imagePickerButtons: {
    marginVertical: 10,
  },
  link: {
    color: '#3A59D1',
  },
  imagesContainer: {
    marginVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
  },
  mapContainer: {
    height: 200,
    width: 350,
    marginVertical: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
});
