import {
  ScrollView,
  Image,
  View,
  Text,
  Button,
  StyleSheet,
} from "react-native";

function PlaceDetails({ navigation, route }) {
  const { title, imageUri, location, address } = route.params.place;
  const showOnMapHandler = () => {
    navigation.navigate("Map", { location });
  };
  return (
    <ScrollView>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text>{title}</Text>
      <Text>Latitude: {location.latitude}</Text>
      <Text>Longitude: {location.longitude}</Text>
      <Text>Address: {address}</Text>
      <Button onPress={showOnMapHandler} title="Show on Map" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 250,
  },
});

export default PlaceDetails;
