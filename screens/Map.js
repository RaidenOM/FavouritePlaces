import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";

function Map() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const location = route.params ? route.params.location : null;
    if (location) {
      setSelectedLocation(location);
    }
  }, [route]);

  const selectLocationHandler = (event) => {
    const latitude = event.nativeEvent.coordinate.latitude;
    const longitude = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ latitude: latitude, longitude: longitude });
  };

  const confirmLocationHandler = () => {
    if (!selectedLocation) {
      Alert.alert("Pick Location", "A location must be picked");
      return;
    } else {
      navigation.navigate("AddPlace", { selectedLocation });
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          name="save"
          size={24}
          color={tintColor}
          onPress={confirmLocationHandler}
        />
      ),
    });
  }, [navigation, confirmLocationHandler]);

  const region = {
    longitude: -122.4324,
    latitude: 37.78825,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  return (
    <MapView
      initialRegion={region}
      style={styles.map}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          coordinate={{
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
          }}
          title="Picked Location"
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default Map;
