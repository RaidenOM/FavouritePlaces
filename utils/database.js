import AsyncStorage from "@react-native-async-storage/async-storage";

export const storePlace = async (newPlace) => {
  try {
    const existingPlaces = await getPlaces();
    const updatedPlaces = [newPlace, ...existingPlaces];
    const jsonValue = JSON.stringify(updatedPlaces);
    await AsyncStorage.setItem("places", jsonValue);
  } catch (error) {
    console.log("Error storing place", error);
  }
};

export const getPlaces = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("places");
    const places = jsonValue ? JSON.parse(jsonValue) : [];
    return places;
  } catch (error) {
    console.log("Error fetching places", error);
    return [];
  }
};

export const deletePlace = async (id) => {
  try {
    const jsonValue = await AsyncStorage.getItem("places");
    const places = jsonValue ? JSON.parse(jsonValue) : [];

    const updatedPlaces = places.filter((place) => place.id !== id);

    const updatedJsonValue = JSON.stringify(updatedPlaces);
    await AsyncStorage.setItem("places", updatedJsonValue);
  } catch (error) {
    console.log("Error deleting place", error);
  }
};

export const updatePlace = async (id, newPlace) => {
  try {
    const jsonValue = await AsyncStorage.getItem("places");
    const places = jsonValue ? JSON.parse(jsonValue) : [];

    const updatedPlaces = places.map((place) =>
      place.id === id ? newPlace : place
    );

    const updatedJsonValue = JSON.stringify(updatedPlaces);
    await AsyncStorage.setItem("places", updatedJsonValue);
  } catch (error) {
    console.log("Error updating place");
  }
};
