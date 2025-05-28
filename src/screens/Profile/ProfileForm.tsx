import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {Controller, Control, FieldErrors} from 'react-hook-form';
import BlueButtons from '../../components/atoms/BlueButtons';
import {baseStyles} from './styles';

interface ProfileFormProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  onSubmit: () => void;
  onBack: () => void;
}

const styles = baseStyles;

const ProfileForm = ({control, errors, onSubmit, onBack}: ProfileFormProps) => {
  return (
    <View style={styles.main}>
      <Controller
        control={control}
        name="firstName"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="gray"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="words"
          />
        )}
      />
      {errors.firstName?.message && (
        <Text style={styles.error}>{String(errors.firstName.message)}</Text>
      )}

      <Controller
        control={control}
        name="lastName"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="gray"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="words"
          />
        )}
      />
      {errors.lastName?.message && (
        <Text style={styles.error}>{String(errors.lastName.message)}</Text>
      )}

      <BlueButtons name="Save" onPress={onSubmit} />
      <BlueButtons name="Back" onPress={onBack} />
    </View>
  );
};

export default ProfileForm;
