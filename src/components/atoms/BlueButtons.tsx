import {Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';

type BlueButtonProps = {
  name: string;
  onPress: (data: any) => void;
};

const BlueButtons = ({name, onPress}: BlueButtonProps) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{name}</Text>
    </Pressable>
  );
};

export default BlueButtons;

// custom blue buttons in login and singUp pages

const styles = StyleSheet.create({
  button: {
    width: '60%',
    padding: 15,
    marginTop: 10,
    backgroundColor: '#3A59D1', // Green background
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
