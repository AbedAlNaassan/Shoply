import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface ListEmptyComponentProps {
  text: string;
}

const ListEmptyComponent = ({text}: ListEmptyComponentProps) => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});

export default ListEmptyComponent;
