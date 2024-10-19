import PlaceForm from "../components/places/PlaceForm";
import { storePlace } from "../utils/database";

function AddPlace({ navigation }) {
  const createPlaceHandler = async ({ title, imageUri, location, address }) => {
    const id = new Date().toString() + Math.random().toString();
    await storePlace({ id, title, imageUri, location, address });
    navigation.navigate("AllPlaces", {
      id,
      title,
      imageUri,
      location,
      address,
    });
  };
  return <PlaceForm createPlaceHandler={createPlaceHandler} />;
}

export default AddPlace;
