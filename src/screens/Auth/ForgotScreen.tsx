import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import BlueButtons from '../../components/atoms/BlueButtons';
import {RootStackParamList} from '../../types/types';
import {useTheme} from '../../context/ThemeContext';
import {zodResolver} from '@hookform/resolvers/zod';
import axios from 'axios';
import {z} from 'zod';

const ForgotSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
});

type NavigationProp = StackNavigationProp<RootStackParamList, 'Verification'>;
type ForgotFormData = z.infer<typeof ForgotSchema>;
const height = Dimensions.get('screen').height;

const LoginForm = () => {
  const navigation = useNavigation<NavigationProp>();
  const {theme} = useTheme();
  const styles = theme === 'dark' ? darkStyles : lightStyles;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ForgotFormData>({
    resolver: zodResolver(ForgotSchema),
  });

  const onSubmit = async (data: ForgotFormData) => {
    try {
      const response = await axios.post(
        'https://backend-practice.eurisko.me/api/auth/forgot-password',
        {
          email: data.email,
        },
      );

      if (response.data.success) {
        Alert.alert('Success', response.data.data.message);
      } else {
        Alert.alert('Error', 'Unexpected response from server.');
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        'Something went wrong. Please try again.';
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <View style={styles.formContainerStyle}>
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

      <BlueButtons name="Forgot" onPress={handleSubmit(onSubmit)} />
      <BlueButtons name="Back" onPress={() => navigation.navigate('Welcome')} />
    </View>
  );
};

export default LoginForm;

const lightStyles = StyleSheet.create({
  formContainerStyle: {
    width: '100%',
    flex: height,
    justifyContent: 'center',
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

const darkStyles = StyleSheet.create({
  formContainerStyle: {
    width: '100%',
    flex: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#12141C',
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
