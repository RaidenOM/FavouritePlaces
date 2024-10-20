import { useContext, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { PlacesContext } from "../../store/places-context";
import { useNavigation, useRoute } from "@react-navigation/native";

function PlaceForm() {
  const { createPlaceHandler } = useContext(PlacesContext);
  const navigation = useNavigation();
  const route = useRoute();

  const [enteredTitle, setEnteredTitle] = useState(""); //State to manage entered title
  const changeTitleHandler = (enteredText) => {
    //Function that changes title state
    setEnteredTitle(enteredText);
  };
  const [pickedImage, setPickedImage] = useState(); //state to manage picked image
  const [pickedLocation, setPickedLocation] = useState(); //state to manage picked location

  const confirmHandler = () => {
    if (enteredTitle && pickedLocation) {
      createPlaceHandler({
        title: enteredTitle,
        imageUri: pickedImage,
        location: pickedLocation,
        address: pickedLocation.address,
      });

      navigation.navigate("AllPlaces");
    } else {
      Alert.alert("Invald fields", "Please fill out the necessary details.");
    }
  };

  const imagePickHandler = (imageUri) => {
    //this is passed to and executes when image is picked using ImagePicker
    setPickedImage(imageUri);
  };

  const locationPickHandler = (location) => {
    //this is passed to and executes when image is picked using LocationPicker
    setPickedLocation(location);
  };

  return (
    <ScrollView style={styles.form}>
      <View style={styles.container}>
        <View>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            onChangeText={changeTitleHandler}
            value={enteredTitle}
            placeholder="Enter Title"
          />
        </View>
        <Text style={styles.label}>Image</Text>
        <ImagePicker imagePickHandler={imagePickHandler} />
        <Text style={styles.label}>Location</Text>
        <LocationPicker locationPickHandler={locationPickHandler} />
        <Button onPress={confirmHandler} style={{ marginTop: 10 }}>
          Add Place
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
  container: {
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginBottom: 10,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
});

export default PlaceForm;
