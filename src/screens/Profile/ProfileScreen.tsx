import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {useTheme} from '../../context/ThemeContext';
import ProfileHeader from './ProfileHeader';
import ProfileForm from './ProfileForm';
import {useProfile} from './useProfile';
import {themedStyles} from './styles';
import SpinnerScreen from '../../components/organisms/SpinnerScreen';

const ProfileScreen = () => {
  const {theme} = useTheme();
  const styles = themedStyles(theme);
  const {
    control,
    handleSubmit,
    errors,
    profileImage,
    handleImagePick,
    submitProfile,
    loading,
    submitting,
    navigation,
  } = useProfile();

  if (loading || submitting) return <SpinnerScreen />;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <ProfileHeader
          profileImage={profileImage}
          onImagePick={handleImagePick}
        />
        <ProfileForm
          control={control}
          errors={errors}
          onSubmit={handleSubmit(submitProfile)}
          onBack={() => navigation.goBack()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
