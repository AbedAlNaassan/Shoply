import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const NotLoggedInComponent = () => {
  return (
    <View style={styles.notLoggedIn}>
      <Text style={styles.notLoggedInText}>
        You are logged out. Please log in to view products.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default NotLoggedInComponent;
