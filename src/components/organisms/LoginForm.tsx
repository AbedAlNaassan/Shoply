import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import BlueButtons from '../atoms/BlueButtons';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../context/AuthContext';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/types';
import {useWindowDimensions} from 'react-native';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type NavigationProp = StackNavigationProp<RootStackParamList, 'Verification'>;
type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const navigation = useNavigation<NavigationProp>();
  const {login} = useAuth();

  // Using useWindowDimensions for dynamic resizing
  const {width, height} = useWindowDimensions();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
    const isLoginSuccessful = login(data.email, data.password);

    if (!isLoginSuccessful) {
      setError('password', {
        type: 'manual',
        message: 'Username or Password is incorrect',
      });
    }
  };

  // Define dynamic style here
  const formContainerStyle = {
    width: width,
    height: height * 0.65,
    justifyContent: 'flex-start' as 'flex-start',
    alignItems: 'center' as 'center',
  };

  return (
    <View style={formContainerStyle}>
      {/* Email Input */}
      <Controller
        control={control}
        name="email"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="eurisko@gmail.com"
            placeholderTextColor="gray"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
        rules={{required: 'Email is required'}}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      {/* Password Input */}
      <Controller
        control={control}
        name="password"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="academy2025"
            placeholderTextColor="gray"
            secureTextEntry={true} // Makes the password hidden
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        rules={{required: 'Password is required'}}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      <BlueButtons name="Login" onPress={handleSubmit(onSubmit)} />
      <BlueButtons
        name="Back"
        onPress={() => navigation.navigate('Welcome', {screen: 'Welcome'})}
      />
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  input: {
    width: '80%',
    padding: 15,
    marginTop: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 50,
    color: '#3A59D1',
  },
  error: {
    color: 'red',
    marginTop: 5,
    width: '80%',
    textAlign: 'left',
    marginLeft: 30,
  },
});
