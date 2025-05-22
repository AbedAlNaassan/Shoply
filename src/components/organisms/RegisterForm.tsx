// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import React, {useState} from 'react';
// import {useNavigation} from '@react-navigation/native';
// import {Controller, useForm} from 'react-hook-form';
// import {zodResolver} from '@hookform/resolvers/zod';
// import BlueButtons from '../atoms/BlueButtons';
// import {signupUser} from '../../api/auth';
// import {launchImageLibrary} from 'react-native-image-picker';
// import {z} from 'zod';
// import {RootStackParamList} from '../../types/types';
// import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {useAuthStore} from '../../zustand/AuthStore';
// import SpinnerScreen from '../organisms/SpinnerScreen';

// const width = Dimensions.get('window').width;
// const height = Dimensions.get('window').height;

// type RegisterScreenNavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   'Register'
// >;

// type RegisterType = z.infer<typeof registerSchema>;

// const registerSchema = z.object({
//   email: z.string().email('Invalid email format'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
//   firstName: z.string().min(2, 'First name must be at least 2 characters'),
//   lastName: z.string().min(2, 'Last name must be at least 2 characters'),
// });

// const RegisterForm = () => {
//   const navigation = useNavigation<RegisterScreenNavigationProp>();
//   const {setUser, setIsNewUser, setEmail} = useAuthStore();
//   const [profileImage, setProfileImage] = useState<any>(null);

//   // NEW: loading state for spinner
//   const [loading, setLoading] = useState(false);

//   const {
//     control,
//     handleSubmit,
//     formState: {errors},
//   } = useForm<RegisterType>({
//     resolver: zodResolver(registerSchema),
//   });

//   const pickImage = () => {
//     launchImageLibrary(
//       {
//         mediaType: 'photo',
//         quality: 0.5,
//       },
//       response => {
//         if (
//           !response.didCancel &&
//           !response.errorCode &&
//           response.assets?.length
//         ) {
//           setProfileImage(response.assets[0]);
//         }
//       },
//     );
//   };

//   // Handle retry alert
//   const handleSignup = async (data: RegisterType) => {
//     setLoading(true);

//     const formData = new FormData();
//     formData.append('email', data.email);
//     formData.append('password', data.password);
//     formData.append('firstName', data.firstName);
//     formData.append('lastName', data.lastName);

//     if (profileImage) {
//       formData.append('profileImage', {
//         uri: profileImage.uri,
//         type: profileImage.type || 'image/jpeg',
//         name: profileImage.fileName || 'profile.jpg',
//       } as any);
//     }

//     const trySignup = async () => {
//       try {
//         const response = await signupUser(formData);
//         setLoading(false);
//         Alert.alert('Success', response.message || 'Registration successful', [
//           {
//             text: 'OK',
//             onPress: () => {
//               setUser({email: data.email});
//               setEmail(data.email);
//               setIsNewUser(true);
//               // Navigate or reset form here if needed
//             },
//           },
//         ]);
//       } catch (error: any) {
//         setLoading(false);

//         // Show retry/cancel alert on failure
//         Alert.alert(
//           'Signup Failed',
//           error?.response?.data?.message ||
//             error.message ||
//             'Network error or server is down.',
//           [
//             {
//               text: 'Cancel',
//               style: 'cancel',
//             },
//             {
//               text: 'Retry',
//               onPress: () => {
//                 setLoading(true);
//                 trySignup(); // Retry signup
//               },
//             },
//           ],
//         );
//       }
//     };

//     trySignup();
//   };

//   return (
//     <View style={styles.formContainer}>
//       {loading && <SpinnerScreen />}
//       {/* Email Input */}
//       <Controller
//         control={control}
//         name="email"
//         rules={{required: 'Email is required'}}
//         render={({field: {onChange, onBlur, value}}) => (
//           <TextInput
//             style={styles.input}
//             placeholder="Email"
//             placeholderTextColor="gray"
//             onBlur={onBlur}
//             onChangeText={onChange}
//             value={value}
//             keyboardType="email-address"
//             autoCapitalize="none"
//           />
//         )}
//       />
//       {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

//       {/* Password Input */}
//       <Controller
//         control={control}
//         name="password"
//         rules={{required: 'Password is required'}}
//         render={({field: {onChange, onBlur, value}}) => (
//           <TextInput
//             style={styles.input}
//             placeholder="Password"
//             placeholderTextColor="gray"
//             secureTextEntry
//             onBlur={onBlur}
//             onChangeText={onChange}
//             value={value}
//           />
//         )}
//       />
//       {errors.password && (
//         <Text style={styles.error}>{errors.password.message}</Text>
//       )}
//       {/* First Name Input */}
//       <Controller
//         control={control}
//         name="firstName"
//         rules={{required: 'First name is required'}}
//         render={({field: {onChange, onBlur, value}}) => (
//           <TextInput
//             style={styles.input}
//             placeholder="First Name"
//             placeholderTextColor="gray"
//             onBlur={onBlur}
//             onChangeText={onChange}
//             value={value}
//           />
//         )}
//       />
//       {errors.firstName && (
//         <Text style={styles.error}>{errors.firstName.message}</Text>
//       )}
//       {/* Last Name Input */}
//       <Controller
//         control={control}
//         name="lastName"
//         rules={{required: 'Last name is required'}}
//         render={({field: {onChange, onBlur, value}}) => (
//           <TextInput
//             style={styles.input}
//             placeholder="Last Name"
//             placeholderTextColor="gray"
//             onBlur={onBlur}
//             onChangeText={onChange}
//             value={value}
//           />
//         )}
//       />
//       {errors.lastName && (
//         <Text style={styles.error}>{errors.lastName.message}</Text>
//       )}

//       {/* Image Picker */}
//       <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
//         <Text style={{color: '#fff'}}>Pick Profile Image (optional)</Text>
//       </TouchableOpacity>
//       {profileImage && (
//         <Text style={{marginTop: 8, color: '#3A59D1'}}>
//           Selected: {profileImage.fileName || 'Image selected'}
//         </Text>
//       )}

//       <BlueButtons name="SignUp" onPress={handleSubmit(handleSignup)} />
//       <BlueButtons name="Back" onPress={navigation.goBack} />
//     </View>
//   );
// };

// export default RegisterForm;

// const styles = StyleSheet.create({
//   formContainer: {
//     width: '100%',
//     height: height * 0.7,
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//   },
//   input: {
//     width: 330,
//     padding: 15,
//     marginTop: 15,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 50,
//     color: '#3A59D1',
//   },
//   error: {
//     color: 'red',
//     marginTop: 5,
//     marginLeft: 30,
//     textAlign: 'left',
//     width: width * 0.8,
//   },
//   imagePickerButton: {
//     marginTop: 20,
//     padding: 10,
//     backgroundColor: '#3A59D1',
//     borderRadius: 25,
//     width: 200,
//     alignItems: 'center',
//   },
//   spinnerContainer: {
//     flex: 1,
//     backgroundColor: '#00000055',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import BlueButtons from '../atoms/BlueButtons';
import {signupUser} from '../../api/auth';
import {launchImageLibrary} from 'react-native-image-picker';
import {z} from 'zod';
import {RootStackParamList} from '../../types/types';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAuthStore} from '../../zustand/AuthStore';
import SpinnerScreen from '../organisms/SpinnerScreen';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;

type RegisterType = z.infer<typeof registerSchema>;

const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
});

const RegisterForm = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const {setUser, setIsNewUser, setEmail} = useAuthStore();
  const [profileImage, setProfileImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
  });

  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        let granted;
        if (Platform.Version >= 33) {
          granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            {
              title: 'Gallery Permission',
              message: 'App needs access to your gallery to select images.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
        } else {
          granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission',
              message: 'App needs access to your storage to select images.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
        }

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }

    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'Cannot access gallery without permission.',
      );
      return;
    }

    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.5,
      },
      response => {
        if (
          !response.didCancel &&
          !response.errorCode &&
          response.assets?.length
        ) {
          setProfileImage(response.assets[0]);
        }
      },
    );
  };

  const handleSignup = async (data: RegisterType) => {
    setLoading(true);

    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);

    if (profileImage) {
      formData.append('profileImage', {
        uri: profileImage.uri,
        type: profileImage.type || 'image/jpeg',
        name: profileImage.fileName || 'profile.jpg',
      } as any);
    }

    const trySignup = async () => {
      try {
        const response = await signupUser(formData);
        setLoading(false);
        Alert.alert('Success', response.message || 'Registration successful', [
          {
            text: 'OK',
            onPress: () => {
              setUser({email: data.email});
              setEmail(data.email);
              setIsNewUser(true);
            },
          },
        ]);
      } catch (error: any) {
        setLoading(false);
        Alert.alert(
          'Signup Failed',
          error?.response?.data?.message || error.message || 'Network error.',
          [
            {text: 'Cancel', style: 'cancel'},
            {
              text: 'Retry',
              onPress: () => {
                setLoading(true);
                trySignup();
              },
            },
          ],
        );
      }
    };

    trySignup();
  };

  return (
    <View style={styles.formContainer}>
      {loading && <SpinnerScreen />}

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

      <Controller
        control={control}
        name="firstName"
        rules={{required: 'First name is required'}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="gray"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.firstName && (
        <Text style={styles.error}>{errors.firstName.message}</Text>
      )}

      <Controller
        control={control}
        name="lastName"
        rules={{required: 'Last name is required'}}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="gray"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.lastName && (
        <Text style={styles.error}>{errors.lastName.message}</Text>
      )}

      <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
        <Text style={{color: '#fff'}}>Pick Profile Image (optional)</Text>
      </TouchableOpacity>
      {profileImage && (
        <Text style={{marginTop: 8, color: '#3A59D1'}}>
          Selected: {profileImage.fileName || 'Image selected'}
        </Text>
      )}

      <BlueButtons name="SignUp" onPress={handleSubmit(handleSignup)} />
      <BlueButtons name="Back" onPress={navigation.goBack} />
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    height: height * 0.7,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    width: 330,
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
  imagePickerButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#3A59D1',
    borderRadius: 25,
    width: 200,
    alignItems: 'center',
  },
  spinnerContainer: {
    flex: 1,
    backgroundColor: '#00000055',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
