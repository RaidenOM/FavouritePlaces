import { useContext, useEffect, useState } from "react";
import PlacesList from "../components/places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { PlacesContext } from "../store/places-context";

function AllPlaces({ navigation, route }) {
  const isFocused = useIsFocused();
  const { places, fetchPlaces } = useContext(PlacesContext);
  useEffect(() => {
    fetchPlaces();
  }, [isFocused, places]);

  return <PlacesList places={places} />;
}

export default AllPlaces;
