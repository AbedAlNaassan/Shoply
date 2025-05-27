import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/types';
import {KeyboardTypeOptions} from 'react-native';

export type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;

export interface FormInputProps {
  control: any;
  name: string;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  errors: any;
}

export interface ImagePickerButtonProps {
  onPress: () => void;
  profileImage: any;
}
