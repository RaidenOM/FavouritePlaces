import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";

function PlaceForm({ createPlaceHandler }) {
  const [enteredTitle, setEnteredTitle] = useState(""); //State to manage entered title
  const changeTitleHandler = (enteredText) => {
    //Function that changes title state
    setEnteredTitle(enteredText);
  };
  const [pickedImage, setPickedImage] = useState(); //state to manage picked image
  const [pickedLocation, setPickedLocation] = useState(); //state to manage picked location

  const addPlaceHandler = () => {
    console.log("Title:", enteredTitle);
    console.log("Image:", pickedImage);
    console.log("Location:", pickedLocation);
    console.log("Address:", pickedLocation.address);
    createPlaceHandler({
      title: enteredTitle,
      imageUri: pickedImage,
      location: pickedLocation,
      address: pickedLocation.address,
    });
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
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker imagePickHandler={imagePickHandler} />
      <LocationPicker locationPickHandler={locationPickHandler} />
      <Button onPress={addPlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
    borderRadius: 8,
  },
});

export default PlaceForm;
