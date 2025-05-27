import React from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import {AssetType} from './productTypes';
import {usePermissions} from './usePermissions';

type ImagePickerSectionProps = {
  images: AssetType[];
  setImages: (images: AssetType[]) => void;
  styles: any;
};

export const ImagePickerSection: React.FC<ImagePickerSectionProps> = ({
  images,
  setImages,
  styles,
}) => {
  const {handlePickImage, handleOpenCamera} = usePermissions();

  const onPhotoTaken = (photoUri: string) => {
    const newAsset: AssetType = {
      uri: photoUri,
      fileName: photoUri.split('/').pop(),
      type: 'image/jpeg',
    };
    setImages([...images, newAsset]);
  };

  return (
    <>
      <View style={styles.imagePickerButtons}>
        <TouchableOpacity onPress={() => handlePickImage(setImages)}>
          <Text style={styles.link}>Pick from Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOpenCamera(onPhotoTaken)}>
          <Text style={styles.link}>Open Camera</Text>
        </TouchableOpacity>
      </View>

      {images.length > 0 && (
        <ScrollView horizontal style={{marginVertical: 10}}>
          {images.map((img, idx) => (
            <Image key={idx} source={{uri: img.uri}} style={styles.image} />
          ))}
        </ScrollView>
      )}
    </>
  );
};
