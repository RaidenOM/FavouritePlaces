import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/UI/IconButton";

function Map() {
  const navigation = useNavigation();
  const route = useRoute();

  const initialLocation = route.params ? route.params.location : null;
  const mode = route.params.mode;
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const selectLocationHandler = (event) => {
    if (!initialLocation || mode === "add") {
      const latitude = event.nativeEvent.coordinate.latitude;
      const longitude = event.nativeEvent.coordinate.longitude;
      setSelectedLocation({ latitude, longitude });
      console.log("Initial Location", initialLocation);
      console.log("Selected location", selectedLocation);
    }
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
    if (!initialLocation || mode === "add") {
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
    }
  }, [navigation, initialLocation, confirmLocationHandler]);

  const region = initialLocation
    ? {
        latitude: initialLocation.latitude,
        longitude: initialLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    : {
        latitude: 37.78825,
        longitude: -122.4324,
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
          title={selectedLocation.address}
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
