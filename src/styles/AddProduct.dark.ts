import {Dimensions, PixelRatio, StyleSheet} from 'react-native';

const pixel = PixelRatio.getFontScale();
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const darkStyles = StyleSheet.create({
  container: {
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
    fontSize: pixel * 35,
    fontFamily: 'Roboto',
    color: '#3A59D1',
  },
  main: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 30,
  },
  input: {
    width: 330,
    padding: 15,
    marginTop: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 50,
    color: '#3A59D1',
  },
  error: {
    color: 'red',
    marginTop: 5,
    marginLeft: 30,
    width: width * 0.8,
    textAlign: 'left',
  },
  imagePickerButtons: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 10,
  },
  link: {
    color: '#3A59D1',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  mapInstruction: {
    marginTop: 15,
    fontWeight: 'bold',
    color: '#3A59D1',
  },
  map: {
    width: width * 0.9,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  searchContainer: {
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  searchResults: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 5,
    maxHeight: 200,
  },
  searchResultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
