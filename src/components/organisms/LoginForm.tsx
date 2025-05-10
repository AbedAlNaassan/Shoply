import {View, Text, TextInput, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import BlueButtons from '../atoms/BlueButtons';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../context/AuthContext';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/types';

const {width, height} = Dimensions.get('window');

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type NavigationProp = StackNavigationProp<RootStackParamList, 'Verification'>;
type LoginFormData = z.infer<typeof loginSchema>;
const LoginForm = () => {
  const navigation = useNavigation<NavigationProp>();
  const {login} = useAuth();

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
    } // You can handle form submission here
  };
  return (
    <View style={styles.formContainer}>
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
  formContainer: {
    width: width,
    height: height * 0.65,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  backContainerButton: {
    width: width,
    height: '40%',
  },
  input: {
    width: '80%',
    padding: 15,
    marginTop: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 50,
    color: '#3A59D1',
  },
  backButton: {
    width: '60%',
    padding: 15,
    marginTop: 5,
    backgroundColor: '#3A59D1', // Green background
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    marginTop: 5,
    width: '80%', // Match input width
    textAlign: 'left', // Align error to the left
    marginLeft: 30,
  },
});
