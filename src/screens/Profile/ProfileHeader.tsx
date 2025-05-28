import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {baseStyles} from './styles';

interface ProfileHeaderProps {
  profileImage: string | null;
  onImagePick: () => void;
}

const ProfileHeader = ({profileImage, onImagePick}: ProfileHeaderProps) => {
  return (
    <View style={baseStyles.header}>
      <Text style={baseStyles.profile}>Profile</Text>
      <TouchableOpacity onPress={onImagePick}>
        {profileImage ? (
          <Image source={{uri: profileImage}} style={baseStyles.avatar} />
        ) : (
          <View style={baseStyles.placeholderImage}>
            <Text style={{color: '#888'}}>Pick Image</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeader;
