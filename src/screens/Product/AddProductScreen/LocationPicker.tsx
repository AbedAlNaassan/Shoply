import React from 'react';
import {Text} from 'react-native';
import MapView, {Marker, MapPressEvent} from 'react-native-maps';
import {MarkerType} from './productTypes';

type LocationPickerProps = {
  marker: MarkerType;
  onMapPress: (e: MapPressEvent) => void;
  styles: any;
};

export const LocationPicker: React.FC<LocationPickerProps> = ({
  marker,
  onMapPress,
  styles,
}) => {
  return (
    <>
      <Text style={styles.mapInstruction}>Tap on map to choose location:</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: marker.latitude,
          longitude: marker.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={onMapPress}>
        <Marker coordinate={marker} title={marker.name} />
      </MapView>
    </>
  );
};
