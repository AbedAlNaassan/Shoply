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
        <Text style={styles.errorText}>
          Please enter all digits correctly (0–9)
        </Text>
      )}

      <View style={styles.btnWrapper}>
        <BlueButtons name="Verify" onPress={handleSubmit(onSubmit)} />
        <BlueButtons name="Back" onPress={navigation.goBack} />
      </View>
    </View>
  );
};

export default VerificationForm;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height * 0.6,
  },
  codeInputContainer: {
    width: '100%',
    height: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20',
    marginTop: 20,
    marginBottom: 20,
  },
  codeInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: pixel * 24,
    color: '#3A59D1',
  },
  errorText: {
    color: 'red',
    fontSize: pixel * 14,
    marginBottom: 5,
    textAlign: 'center',
  },
  btnWrapper: {
    width: '100%',
    height: '80%',
    alignItems: 'center',
  },
});
