import React, {useEffect, useState} from 'react';
import {Button, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import crashlytics from '@react-native-firebase/crashlytics';

export default function App() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const isEnabled = crashlytics().isCrashlyticsCollectionEnabled;
    setEnabled(isEnabled);
  }, []);

  const toggleCrashlytics = () => {
    crashlytics().setCrashlyticsCollectionEnabled(!enabled);
    setEnabled(!enabled);
  };

  return (
    <SafeAreaView>
      <Button title="Toggle Crashlytics" onPress={toggleCrashlytics} />
      <Button title="Crash" onPress={() => crashlytics().crash()} />
      <Text>Crashlytics is currently {enabled ? 'enabled' : 'disabled'}</Text>
    </SafeAreaView>
  );
}
