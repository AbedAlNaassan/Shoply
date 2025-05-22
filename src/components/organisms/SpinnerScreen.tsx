import React from 'react';
import {View, ActivityIndicator, StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const SpinnerScreen = () => {
  return (
    <View style={styles.overlay}>
      <ActivityIndicator size="large" color="#3A59D1" />
    </View>
  );
};

export default SpinnerScreen;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height,
    width,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
});
