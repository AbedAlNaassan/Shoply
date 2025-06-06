import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/types';
import {useAuthStore} from '../../zustand/AuthStore';
import SpinnerScreen from '../organisms/SpinnerScreen';
import {zodResolver} from '@hookform/resolvers/zod';
import BlueButtons from '../atoms/BlueButtons';
import {loginApi} from '../../api/auth';
import {z} from 'zod';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type NavigationProp = StackNavigationProp<RootStackParamList, 'Verification'>;
type LoginFormData = z.infer<typeof loginSchema>;

const height = Dimensions.get('screen').height;

const LoginForm = () => {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(false);
  const store = useAuthStore.getState();

  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      setLoading(true);
      try {
        const response = await loginApi({
          email: data.email,
          password: data.password,
          token_expires_in: '1y',
        });

        console.log('Login successful:', response);
        store.setUser({email: data.email});
        store.setTokens({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        });
        store.setIsNewUser(false);
        store.setIsVerified(true);
        store.setEmail(data.email);
      } catch (error: any) {
        const errorMessage = error?.error?.message || error?.message;

        console.log('Login Error:', errorMessage);

        if (
          errorMessage === 'Network Error' ||
          errorMessage === 'Request failed with status code 500'
        ) {
          Alert.alert(
            'Login Failed',
            'Unable to connect to the server. Please try again.',
            [
              {text: 'Cancel', style: 'cancel'},
              {
                text: 'Retry',
                onPress: () => handleSubmit(onSubmit)(),
              },
            ],
          );
        } else if (errorMessage === 'Please verify your email first') {
          store.setUser({email: data.email});
          store.setEmail(data.email);
          store.setIsNewUser(true);
          store.setIsVerified(false);
        } else {
          setError('password', {
            type: 'manual',
            message: 'Incorrect email or password',
          });
        }
      } finally {
        setLoading(false);
      }
    },
    // Removed onSubmit from dependencies to avoid circular reference
    [handleSubmit, setError, store],
  );

  return (
    <View style={styles.formContainerStyle}>
      {loading && <SpinnerScreen />}
      <Controller
        control={control}
        name="email"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
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

      <Controller
        control={control}
        name="password"
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="gray"
            secureTextEntry={true}
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
        name="Forgot Password"
        onPress={() => navigation.navigate('Forgot')}
      />
      <BlueButtons name="Back" onPress={() => navigation.navigate('Welcome')} />
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  formContainerStyle: {
    width: '100%',
    height: height * 0.7,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    width: 320,
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
    width: 300,
    textAlign: 'left',
    marginLeft: 30,
  },
});
