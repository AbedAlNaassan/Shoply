import {Dimensions, PixelRatio, StyleSheet, Platform} from 'react-native';

const width = Dimensions.get('screen').width;
const pixel = PixelRatio.getFontScale();

export const styles = StyleSheet.create({
  list: {
    width: '100%',
    alignItems: 'center',
    gap: 10,
    paddingBottom: Platform.select({ios: 80, android: 60}),
  },
  infoContainer: {
    width: width / 2.2,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
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
    paddingHorizontal: 8,
    width: '100%',
  },
  textLists: {
    width: '100%',
    flex: 1,
    fontSize: pixel * 15,
    fontFamily: 'Roboto',
    color: '#3A59D1',
    textAlign: 'center',
  },
  loadMoreButton: {
    marginVertical: 20,
    alignItems: 'center',
  },
  sortButtonContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  notLoggedIn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 100,
  },
  notLoggedInText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },

  errorBoundaryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorBoundaryText: {
    fontSize: 16,
    color: '#ff0000',
    textAlign: 'center',
    marginBottom: 10,
  },
  errorBoundaryDebugText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
  loadingContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
