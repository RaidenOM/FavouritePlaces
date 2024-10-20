import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/UI/IconButton";
import { Colors } from "./constants/colors";
import Map from "./screens/Map";
import PlaceDetails from "./screens/PlaceDetails";
import PlacesContextProvider from "./store/places-context";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <PlacesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: Colors.primary500,
              },
              headerTintColor: Colors.gray700,
              contentStyle: { backgroundColor: Colors.primary50 },
            }}
          >
            <Stack.Screen
              name="AllPlaces"
              component={AllPlaces}
              options={({ navigation }) => ({
                headerRight: ({ tintColor }) => {
                  return (
                    <IconButton
                      name="add"
                      size={24}
                      color={tintColor}
                      onPress={() => navigation.navigate("AddPlace")}
                    />
                  );
                },
                title: "Your Favourite Places",
              })}
            />
            <Stack.Screen
              name="AddPlace"
              component={AddPlace}
              options={{ title: "Add A New Place" }}
            />
            <Stack.Screen name="Map" component={Map} />
            <Stack.Screen name="PlaceDetails" component={PlaceDetails} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </PlacesContextProvider>
    </>
  );
}
