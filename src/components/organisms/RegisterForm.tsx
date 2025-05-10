import {View, Text, TextInput, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import BlueButtons from '../atoms/BlueButtons';

const {width} = Dimensions.get('window');

type RegisterType = z.infer<typeof registerSchema>;

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const RegisterForm = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterType) => {
    console.log(data); // Handle form submission
  };
  return (
    <View style={styles.formContainer}>
      {/* Full Name Input */}
      <Controller
        control={control}
        name="fullName"
        rules={{required: 'Full name is required'}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="gray"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.fullName && (
        <Text style={styles.error}>{errors.fullName.message}</Text>
      )}
      {/* Email Input */}
      <Controller
        control={control}
        name="email"
        rules={{required: 'Email is required'}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="gray"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
      {/* Phone Input */}
      <Controller
        control={control}
        name="phone"
        rules={{required: 'Phone number is required'}}
        render={({field: {onChange, onBlur}}) => (
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="gray"
            onBlur={onBlur}
            onChangeText={onChange}
            keyboardType="phone-pad"
          />
        )}
      />
      {errors.phone && <Text style={styles.error}>{errors.phone.message}</Text>}
      {/* Password Input */}
      <Controller
        control={control}
        name="password"
        rules={{required: 'Password is required'}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="gray"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}
      <BlueButtons name="SignUp" onPress={handleSubmit(onSubmit)} />
      <BlueButtons name="Back" onPress={navigation.goBack} />
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  formContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',

    // Add some padding to avoid UI cutoff
  },
  input: {
    width: '80%',
    padding: 15,
    marginTop: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 50,
    color: '#3A59D1',
  },
  error: {
    color: 'red',
    marginTop: 5,
    marginLeft: 30,
    textAlign: 'left',
    width: width * 0.8,
  },
});
