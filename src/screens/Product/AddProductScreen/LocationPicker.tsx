import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import MapView, {Marker, MapPressEvent} from 'react-native-maps';
import {MarkerType} from './productTypes';

type LocationPickerProps = {
  marker: MarkerType;
  onMapPress: (e: MapPressEvent) => void;
  onSearchSelect: (location: MarkerType) => void;
  styles: any;
};

export const LocationPicker: React.FC<LocationPickerProps> = ({
  marker,
  onMapPress,
  onSearchSelect,
  styles,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MarkerType[]>([]);

  const handleSearch = async () => {
    try {
      // Replace with your actual geocoding API call
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery,
        )}`,
      );
      const data = await response.json();

      const results = data.map((item: any) => ({
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon),
        name: item.display_name,
      }));

      setSearchResults(results);

      // If there are results, you might want to move the map to the first one
      if (results.length > 0) {
        onSearchSelect(results[0]);
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
  };

  return (
    <>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a location"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
      </View>

      {searchResults.length > 0 && (
        <View style={styles.searchResults}>
          {searchResults.map((result, index) => (
            <Text
              key={index}
              style={styles.searchResultItem}
              onPress={() => {
                onSearchSelect(result);
                setSearchResults([]);
              }}>
              {result.name}
            </Text>
          ))}
        </View>
      )}

      <Text style={styles.mapInstruction}>Tap on map to choose location:</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: marker.latitude,
          longitude: marker.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        region={{
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
