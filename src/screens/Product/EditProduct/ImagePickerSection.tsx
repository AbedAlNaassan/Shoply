import React from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Asset} from 'react-native-image-picker';

type Props = {
  images: Asset[];
  existingImageUrls: string[];
  onPickImage: () => void;
  styles: any;
};

const ImagePickerSection: React.FC<Props> = ({
  images,
  existingImageUrls,
  onPickImage,
  styles,
}) => {
  return (
    <>
      <View style={styles.imagePickerButtons}>
        <TouchableOpacity onPress={onPickImage}>
          <Text style={styles.link}>Pick from Gallery</Text>
        </TouchableOpacity>
      </View>

      {/* Existing Images */}
      {existingImageUrls.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imagesContainer}>
          {existingImageUrls
            .filter(url => typeof url === 'string' && url.trim() !== '') // ✅ Valid strings only
            .map((url, idx) => (
              <Image key={idx} source={{uri: url}} style={styles.image} />
            ))}
        </ScrollView>
      )}

      {/* Newly Picked Images */}
      {images.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imagesContainer}>
          {images.map((img, idx) => (
            <Image key={idx} source={{uri: img.uri}} style={styles.image} />
          ))}
        </ScrollView>
      )}
    </>
  );
};

export default ImagePickerSection;
