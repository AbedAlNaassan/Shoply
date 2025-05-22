import {View, Text, Alert} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import VerificationForm from '../../components/organisms/VerificationForm';
import BlueButtons from '../../components/atoms/BlueButtons';
import {lightStyles} from '../../styles/Verification.light';
import {darkStyles} from '../../styles/verification.dark';
import {ScrollView} from 'react-native-gesture-handler';
import {useTheme} from '../../context/ThemeContext';
import {useAuthStore} from '../../zustand/AuthStore';
import {resendOtp} from '../../api/auth';

const VerificationScreen = () => {
  const {logout, email} = useAuthStore();
  const {theme} = useTheme();
  const styles = theme === 'dark' ? darkStyles : lightStyles;

  const handelLogout = () => {
    logout();
  };

  const resend = async () => {
    try {
      if (!email) {
        Alert.alert('Error', 'Email not found. Please login again.');
        return;
      }

      const res = await resendOtp(email);
      if (res.success) {
        Alert.alert('Success', res.data.message || 'OTP sent successfully!');
      } else {
        Alert.alert('Error', 'Failed to resend OTP');
      }
    } catch (err: any) {
      console.error('Resend OTP Error:', err);
      Alert.alert('Error', err?.message || 'Something went wrong');
    }
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.textContainer}>
          <Text style={styles.shoply}>Shoply</Text>
          <Text style={styles.verification}>Verification</Text>
          <Text style={styles.text}>Enter the code we sent to your email</Text>
        </View>

        {/* Code Inputs */}
        <VerificationForm />
        <View style={styles.cancel}>
          <BlueButtons name="Resend OTP" onPress={resend} />
          <BlueButtons name="Cancel" onPress={handelLogout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VerificationScreen;
