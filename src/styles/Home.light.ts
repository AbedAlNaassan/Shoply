import {Dimensions, PixelRatio, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');
const pixel = PixelRatio.getFontScale();

export const lightStyles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },
  header: {
    width: width,
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
    width: '30%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  searchContainer: {
    width: width,
    height: height * 0.08,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    marginTop: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 50,
    color: 'black',
  },
  imageContainer: {
    width: width,
    height: height * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: '75%',
    borderRadius: 25,
  },
  bestSeller: {
    width: width,
    height: height * 0.05,
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
