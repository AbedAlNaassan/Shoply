import React, {useRef, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  CameraDevice,
} from 'react-native-vision-camera';
import {RootStackParamList} from '../../types/types';

type CameraRouteProp = RouteProp<RootStackParamList, 'Camera'>;
const Cameras = () => {
  const [currentCamera, setCurrentCamera] = useState<'front' | 'back'>('back');
  const backDevice = useCameraDevice('back');
  const frontDevice = useCameraDevice('front');
  const cameraRef = useRef<Camera>(null);
  const {hasPermission, requestPermission} = useCameraPermission();
  const navigation = useNavigation();
  const route = useRoute<CameraRouteProp>();
  const {onPhotoTaken} = route.params || {};

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const takePicture = async () => {
    try {
      const photo = await cameraRef.current?.takePhoto({
        flash: 'off',
      });

      if (!photo) {
        Alert.alert('Error', 'Failed to capture photo');
        return;
      }

      if (onPhotoTaken) {
        onPhotoTaken('file://' + photo.path);
      }

      navigation.goBack();
    } catch (error) {
      console.error('Camera error:', error);
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const toggleCamera = () => {
    setCurrentCamera(prev => (prev === 'back' ? 'front' : 'back'));
  };

  const getCurrentDevice = (): CameraDevice | undefined => {
    return currentCamera === 'back' ? backDevice : frontDevice;
  };

  const device = getCurrentDevice();

  if (!hasPermission) return <Text>Requesting camera permission...</Text>;
  if (!device) return <Text>Camera device not available</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <Text style={styles.buttonText}>📸 Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.switchButton]}
          onPress={toggleCamera}>
          <Text style={styles.buttonText}>🔄 Switch Camera</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Cameras;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ffffffaa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  switchButton: {
    backgroundColor: '#3A59D1',
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
  },
});
