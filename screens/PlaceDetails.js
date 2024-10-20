import {
  ScrollView,
  Image,
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { Colors } from "../constants/colors";
import { useContext, useLayoutEffect } from "react";
import { PlacesContext } from "../store/places-context";

function PlaceDetails({ navigation, route }) {
  const place = route.params.place;
  const { id, title, imageUri, location, address } = place;
  const { deletePlaceHandler } = useContext(PlacesContext);

  useLayoutEffect(() => {
    navigation.setOptions({ title: title });
  }, [title]);

  const showOnMapHandler = () => {
    navigation.navigate("Map", { location, mode: "show" });
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address}</Text>
        <View style={styles.coordinates}>
          <Text style={styles.coordinateText}>
            Latitude: {location.latitude}
          </Text>
          <Text style={styles.coordinateText}>
            Longitude: {location.longitude}
          </Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={showOnMapHandler} style={styles.button}>
          <Text style={styles.buttonText}>Show on Map</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            deletePlaceHandler(id);
            navigation.navigate("AllPlaces");
          }}
          style={[styles.button, styles.deleteButton]}
        >
          <Text style={styles.buttonText}>Delete Place</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 250,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.gray700,
  },
  address: {
    fontSize: 16,
    color: Colors.primary700,
    marginVertical: 8,
  },
  coordinates: {
    marginTop: 16,
  },
  coordinateText: {
    fontSize: 14,
    color: Colors.gray700,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: Colors.primary500,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 2,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 4,
  },
  deleteButton: {
    backgroundColor: Colors.accent500,
  },
  updateButton: {
    backgroundColor: Colors.primary800,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default PlaceDetails;
