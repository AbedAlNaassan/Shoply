import React from 'react';
import {Controller} from 'react-hook-form';
import {TextInput, Text} from 'react-native';
import {styles} from './styles';
import {FormInputProps} from './types';

const FormInput: React.FC<FormInputProps> = ({
  control,
  name,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  errors,
}) => {
  const errorMessage = errors?.[name]?.message;

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="gray"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
          />
        )}
      />
      {!!errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </>
  );
};

export default FormInput;
