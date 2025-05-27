import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {styles} from './styles';
import {ImagePickerButtonProps} from './types';

const ImagePickerButton: React.FC<ImagePickerButtonProps> = ({
  onPress,
  profileImage,
}) => {
  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.imagePickerButton}>
        <Text style={styles.imagePickerText}>
          Pick Profile Image (optional)
        </Text>
      </TouchableOpacity>
      {profileImage && (
        <Text style={styles.selectedImageText}>
          Selected: {profileImage.fileName || 'Image selected'}
        </Text>
      )}
    </>
  );
};

export default ImagePickerButton;
