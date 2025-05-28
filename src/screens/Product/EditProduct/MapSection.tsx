import React from 'react';
import {View} from 'react-native';
import MapView, {Marker, MapPressEvent} from 'react-native-maps';

type MarkerType = {
  name: string;
  latitude: number;
  longitude: number;
};

type Props = {
  marker: MarkerType;
  onMapPress: (event: MapPressEvent) => void;
  styles: any;
};

const MapSection: React.FC<Props> = ({marker, onMapPress, styles}) => {
  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: marker.latitude,
          longitude: marker.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        onPress={onMapPress}
        showsUserLocation
        zoomEnabled
        zoomControlEnabled
        loadingEnabled>
        <Marker
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.name}
        />
      </MapView>
    </View>
  );
};

export default MapSection;
