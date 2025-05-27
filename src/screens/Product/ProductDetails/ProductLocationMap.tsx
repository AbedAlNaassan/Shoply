import React from 'react';
import MapView, {Marker} from 'react-native-maps';

interface ProductLocationMapProps {
  location: {
    latitude: number;
    longitude: number;
    name: string;
  };
  title: string;
  description: string;
}

const ProductLocationMap: React.FC<ProductLocationMapProps> = ({
  location,
  title,
  description,
}) => {
  return (
    <MapView
      style={{
        width: 350,
        height: 200,
        alignSelf: 'center',
        marginTop: 20,
      }}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}>
      <Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
        title={title}
        description={description}
      />
    </MapView>
  );
};

export default ProductLocationMap;
