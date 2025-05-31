import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  PixelRatio,
  Alert,
} from 'react-native';
import React, {useRef} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useAuthStore} from '../../zustand/AuthStore';
import {zodResolver} from '@hookform/resolvers/zod';
import BlueButtons from '../atoms/BlueButtons';
import {verifyOtp} from '../../api/auth';
import SpinnerScreen from './SpinnerScreen';
import {z} from 'zod';

const {width, height} = Dimensions.get('window');
const pixel = PixelRatio.getFontScale();

const codeSchema = z.object({
  code1: z.string().regex(/^[0-9]$/, 'Invalid'),
  code2: z.string().regex(/^[0-9]$/, 'Invalid'),
  code3: z.string().regex(/^[0-9]$/, 'Invalid'),
  code4: z.string().regex(/^[0-9]$/, 'Invalid'),
  code5: z.string().regex(/^[0-9]$/, 'Invalid'),
  code6: z.string().regex(/^[0-9]$/, 'Invalid'),
});

const VerificationForm = () => {
  const email = useAuthStore(state => state.user?.email);
  const {setIsNewUser, setIsVerified} = useAuthStore();
  const [loading, setLoading] = React.useState(false);

  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const onSubmit = async (data: CodeType) => {
    if (!email) {
      Alert.alert('Error', 'Email is missing. Please register or login again.');
      return;
    }

    const otp = `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`;
    setLoading(true);
    try {
      const response = await verifyOtp(email, otp);
      const successMessage = response.data?.message || 'Verification succeeded';

      setLoading(false);
      Alert.alert('Success', successMessage);

      setIsNewUser(false);
      setIsVerified(true);
    } catch (error: any) {
      console.log('Full OTP error:', JSON.stringify(error, null, 2));

      if (error.response) {
        Alert.alert(
          'Verification failed',
          error.response.data.message || 'Invalid OTP',
        );
      } else if (error.request) {
        Alert.alert(
          'Connection Error',
          'Could not reach the server. Please try again.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Retry',
              onPress: () => onSubmit(data),
            },
          ],
        );
      } else {
        Alert.alert('Verification failed', error.message || 'Unknown error');
      }
    }
  };
  type CodeType = z.infer<typeof codeSchema>;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<CodeType>({
    resolver: zodResolver(codeSchema),
  });

  if (loading) return <SpinnerScreen />;

  return (
    //make 4 input only take 1 number
    <View style={styles.container}>
      <View style={styles.codeInputContainer}>
        {[1, 2, 3, 4, 5, 6].map((num, index) => (
          <Controller
            key={index}
            control={control}
            name={`code${num}` as keyof CodeType}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                ref={inputRefs[index]}
                style={[
                  styles.codeInput,
                  Object.keys(errors).length > 0 && {borderColor: 'red'},
                ]}
                keyboardType="number-pad"
                maxLength={1}
                onChangeText={text => {
                  onChange(text);
                  if (text && index < 5) {
                    inputRefs[index + 1].current?.focus();
                  }
                }}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
        ))}
      </View>

      {/* One global error message */}
      {Object.keys(errors).length > 0 && (
        <View>
          <Text style={styles.text}>
            Please enter all digits correctly (0–9)
          </Text>
        </View>
      )}

      <View style={styles.btnWrapper}>
        <BlueButtons name="Verify" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

export default VerificationForm;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: height * 0.2,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  codeInputContainer: {
    width: width,
    height: '30%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20',
  },
  codeInput: {
    width: width * 0.1,
    height: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: pixel * 24,
    color: '#3A59D1',
  },
  btnWrapper: {
    width: '100%',
    height: '70%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    color: 'red',
    fontSize: pixel * 14,
    textAlign: 'center',
  },
});
