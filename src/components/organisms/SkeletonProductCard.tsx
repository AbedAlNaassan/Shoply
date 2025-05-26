import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const SkeletonProductCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.imageSkeleton} />
      <View style={styles.textSkeleton} />
      <View style={styles.textSkeletonSmall} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.44, // almost half of screen width
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    marginHorizontal: width * 0.01,
  },
  imageSkeleton: {
    width: '100%',
    height: 120,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 10,
  },
  textSkeleton: {
    width: '80%',
    height: 16,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    alignSelf: 'center',
    marginBottom: 6,
  },
  textSkeletonSmall: {
    width: '60%',
    height: 14,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    alignSelf: 'center',
  },
});

export default SkeletonProductCard;
