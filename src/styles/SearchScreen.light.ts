import {Dimensions, PixelRatio, StyleSheet} from 'react-native';

const width = Dimensions.get('screen').width;
const pixel = PixelRatio.getFontScale();

export const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  listContainer: {
    flex: 1,
  },
  list: {
    paddingBottom: 80,
    gap: 10,
    alignItems: 'center',
  },
  infoContainer: {
    width: width / 2 - 20,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  imageList: {
    width: '100%',
    height: '60%',
  },
  images: {
    width: '100%',
    height: '100%',
  },
  textList: {
    height: '30%',
    justifyContent: 'center',
    marginTop: 15,
    alignItems: 'center',
  },
  textLists: {
    width: '100%',
    flex: 1,
    fontSize: pixel * 15,
    fontFamily: 'Roboto',
    color: '#3A59D1',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#3A59D1',
  },
});
