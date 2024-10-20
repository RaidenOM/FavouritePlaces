import { Button, StyleSheet, View } from "react-native";
import { Colors } from "../../constants/colors";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import { Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

function LocationPicker({ locationPickHandler }) {
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();
  const [location, setLocation] = useState(location);
  const navigation = useNavigation();
  const route = useRoute();

  const selectedLocation = route.params ? route.params.selectedLocation : null;

  useEffect(() => {
    if (selectedLocation) {
      setLocation({
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
      });
    }
  }, [selectedLocation]);

  useEffect(() => {
    const getAddressName = async () => {
      if (location) {
        console.log(location);
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${location.latitude}&lon=${location.longitude}&format=json`
          );

          const addressName = response.data.display_name;

          // Call the location pick handler with the address
          setLocation({ ...location, address: addressName || "Something" });
        } catch (error) {
          console.log(error);
        } finally {
          setLocation({ ...location, address: "Something" });
          locationPickHandler(location);
        }
      }
    };

    getAddressName();
  }, [location?.latitude, location?.longitude, location?.address]);

  const verifyPermission = async () => {
    if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (locationPermissionInfo.status === PermissionStatus.DENIED) {
      const permissionResponse = await requestPermission();
      Alert.alert("Cannot continue", "You need to grant location permission.");
      return false;
    }

    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    console.log(location);
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  const pickOnMapHandler = () => {
    navigation.navigate("Map", { location, mode: "add" });
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapPreview}>
        <MapView
          style={styles.mapview}
          region={
            location
              ? {
                  longitude: location.longitude,
                  latitude: location.latitude,
                  longitudeDelta: 0.01,
                  latitudeDelta: 0.01,
                }
              : {
                  longitude: -122.4324,
                  latitude: 37.78825,
                }
          }
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={location.address}
            />
          )}
        </MapView>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Locate User" onPress={getLocationHandler} />
        <Button title="Pick on Map" onPress={pickOnMapHandler} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  mapPreview: {
    width: "100%",
    height: 200,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  mapview: {
    width: "100%",
    height: "100%",
  },
});

export default LocationPicker;
