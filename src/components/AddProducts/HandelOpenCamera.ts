const handleOpenCamera = () => {
  const permission =
    Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;

  check(permission).then(result => {
    if (result === RESULTS.GRANTED) {
      navigation.navigate('Camera', {
        onPhotoTaken: (photoUri: string) => {
          const newAsset: Asset = {
            uri: photoUri,
            fileName: photoUri.split('/').pop() || 'photo.jpg',
            type: 'image/jpeg',
            width: 0,
            height: 0,
          };
          setImages(prev => [...prev, newAsset]);
        },
      });
    } else if (result === RESULTS.DENIED) {
      request(permission).then(req => {
        if (req === RESULTS.GRANTED) {
          handleOpenCamera();
        }
      });
    } else if (result === RESULTS.BLOCKED) {
      Alert.alert(
        'Permission Required',
        'Please allow camera access from settings.',
        [
          {text: 'Open Settings', onPress: () => openSettings()},
          {text: 'Cancel', style: 'cancel'},
        ],
      );
    }
  });
};
