import {StyleSheet} from 'react-native';

export const darkStyles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#12141C',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#1E1F2B',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Roboto',
    color: '#3A59D1',
    fontSize: 16,
    marginBottom: 8,
  },
  qtyButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  qtyBtn: {
    backgroundColor: '#3A59D1',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  qtyBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginLeft: 15,
  },
  deleteBox: {
    backgroundColor: 'red',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginVertical: 8,
    borderRadius: 10,
    flex: 1,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
