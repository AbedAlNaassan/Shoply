import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  PixelRatio,
} from 'react-native';
import React, {useRef} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/types';
import {useNavigation} from '@react-navigation/native';
import BlueButtons from '../atoms/BlueButtons';

const {width, height} = Dimensions.get('window');
const pixel = PixelRatio.getFontScale();

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const codeSchema = z.object({
  code1: z.string().regex(/^[0-9]$/, 'Invalid'),
  code2: z.string().regex(/^[0-9]$/, 'Invalid'),
  code3: z.string().regex(/^[0-9]$/, 'Invalid'),
  code4: z.string().regex(/^[0-9]$/, 'Invalid'),
});

const VerificationForm = () => {
  const navigation = useNavigation<NavigationProp>();

  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const onSubmit = (data: CodeType) => {
    const code = Object.values(data).join('');
    console.log('Entered code:', code);
    navigation.navigate('Home', {screen: 'Home'});
  };

  type CodeType = z.infer<typeof codeSchema>;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<CodeType>({
    resolver: zodResolver(codeSchema),
  });

  return (
    //make 4 input only take 1 number
    <View style={styles.container}>
      <View style={styles.codeInputContainer}>
        {[1, 2, 3, 4].map((num, index) => (
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
                  if (text && index < 3) {
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
        <View style={styles.errorText}>
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
    width: width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeInputContainer: {
    width: width,
    height: '30%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20',
    marginTop: 15,
    marginBottom: 15,
  },
  codeInput: {
    width: width * 0.15,
    height: height * 0.07,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: pixel * 24,
    color: '#3A59D1',
  },
  errorText: {
    height: '6%',
    marginBottom: 15,
  },
  btnWrapper: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: 'red',
    fontSize: pixel * 14,
    textAlign: 'center',
  },
});
