import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    height: height * 0.7,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    textAlign: 'left',
    width: width * 0.8,
  },
  imagePickerButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#3A59D1',
    borderRadius: 25,
    width: 200,
    alignItems: 'center',
  },
  imagePickerText: {
    color: '#fff',
  },
  selectedImageText: {
    marginTop: 8,
    color: '#3A59D1',
  },
});
