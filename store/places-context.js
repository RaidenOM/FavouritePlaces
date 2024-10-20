import { createContext, useContext, useReducer } from "react";
import { getPlaces } from "../utils/database";
import { storePlace, deletePlace, updatePlace } from "../utils/database";

export const PlacesContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const { id, title, imageUri, location, address } = action.payload;
      return [{ id, title, imageUri, location, address }, ...state];
    }
    case "UPDATE": {
      const { id, title, imageUri, location, address } = action.payload;
      const updatedPlaces = state.map((place) =>
        place.id === id ? { id, title, imageUri, location, address } : place
      );
      return updatedPlaces;
    }
    case "FETCH": {
      return action.payload;
    }
    case "DELETE": {
      const { id } = action.payload;
      const updatedPlaces = state.filter((place) => place.id !== id);
      return updatedPlaces;
    }
  }
};

export default function PlacesContextProvider({ children }) {
  const [places, dispatch] = useReducer(reducer, []);

  const createPlaceHandler = async ({ title, imageUri, location, address }) => {
    const id = new Date().toString() + Math.random().toString();
    dispatch({
      type: "ADD",
      payload: { id, title, imageUri, location, address },
    });
    await storePlace({ id, title, imageUri, location, address });
    console.log(places);
  };

  const deletePlaceHandler = async (id) => {
    try {
      dispatch({ type: "DELETE", payload: { id } });
      await deletePlace(id);
    } catch (error) {
      console.log("Error deleting place", error);
      Alert.alert("Error", "Error deleting place.");
    }
  };

  const fetchPlaces = async () => {
    const places = await getPlaces();
    dispatch({ type: "FETCH", payload: places });
  };

  return (
    <PlacesContext.Provider
      value={{
        places,
        createPlaceHandler,
        deletePlaceHandler,
        fetchPlaces,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
}
