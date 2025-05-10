import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import VerificationForm from '../../components/organisms/VerificationForm';
import {useTheme} from '../../context/ThemeContext';
import {darkStyles} from '../../styles/verification.dark';
import {lightStyles} from '../../styles/Verification.light';
import BlueButtons from '../../components/atoms/BlueButtons';
import {useAuth} from '../../context/AuthContext';

const VerificationScreen = () => {
  // ✅ This defines the type
  const {theme} = useTheme();
  const {logout} = useAuth();

  const styles = theme === 'dark' ? darkStyles : lightStyles;

  const handelLogout = () => {
    logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textandCodeContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.shoply}>Shoply</Text>
          <Text style={styles.verification}>Verification</Text>
          <Text style={styles.text}>Enter the code we sent to your email</Text>
        </View>

        {/* Code Inputs */}
        <VerificationForm />
        <View style={styles.cancel}>
          <BlueButtons name="Cancel" onPress={handelLogout} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerificationScreen;
