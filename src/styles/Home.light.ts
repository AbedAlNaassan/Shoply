import {PixelRatio, StyleSheet} from 'react-native';

const pixel = PixelRatio.getFontScale();

export const lightStyles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: '10%',
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
    width: '100%',
    height: '9%',
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
    width: '100%',
    height: '25%',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 150,
    borderRadius: 25,
  },
  bestSeller: {
    width: '100%',
    flex: 1,
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
