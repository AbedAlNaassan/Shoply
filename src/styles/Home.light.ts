import {Dimensions, PixelRatio, StyleSheet} from 'react-native';

const pixel = PixelRatio.getFontScale();
const height = Dimensions.get('window').height;

export const lightStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  header: {
    width: '100%',
    height: height * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  shoply: {
    fontSize: pixel * 30,
    fontFamily: 'Roboto',
    color: '#3A59D1',
  },
  icon: {
    width: '35%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  searchContainer: {
    width: '100%',
    height: height * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 50,
    color: 'black',
  },
  imageContainer: {
    width: '100%',
    height: height * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 150,
    borderRadius: 25,
  },
  bestSeller: {
    width: '100%',
    height: height * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  seeAll: {
    fontSize: pixel * 15,
    fontFamily: 'Roboto',
    color: '#3A59D1',
  },
});
