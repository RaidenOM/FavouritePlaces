import { useEffect, useState } from "react";
import PlacesList from "../components/places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { getPlaces } from "../utils/database";

function AllPlaces({ navigation, route }) {
  const isFocused = useIsFocused();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    async function fetchPlaces() {
      const places = await getPlaces();
      setPlaces(places);
    }

    fetchPlaces();
  }, []);

  useEffect(() => {
    if (isFocused && route.params) {
      const { id, title, imageUri, location, address } = route.params;
      setPlaces((currPlaces) => [
        ...currPlaces,
        {
          id,
          title,
          imageUri,
          location,
          address,
        },
      ]);
    }
  }, [isFocused, route]);
  return <PlacesList places={places} />;
}

export default AllPlaces;
