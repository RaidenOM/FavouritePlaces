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
