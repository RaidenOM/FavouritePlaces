import {
  FlatList,
  Pressable,
  Text,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

function PlacesList({ places }) {
  const navigation = useNavigation();

  const pressHandler = (place) => {
    console.log(place);
    navigation.navigate("PlaceDetails", { place });
  };

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - Start adding some!
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      style={{ margin: 24 }}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        return (
          <Pressable
            onPress={() => pressHandler(item)}
            style={({ pressed }) => [
              styles.placeItem,
              pressed && styles.pressed,
            ]}
          >
            <Image
              source={{ uri: item.imageUri }}
              style={styles.placeItemImage}
            />
            <View style={styles.placeItemInfo}>
              <Text style={styles.placeItemTitle}>{item.title}</Text>
              <Text style={styles.placeItemAddress}>{item.address}</Text>
            </View>
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
  placeItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
  },
  pressed: {
    opacity: 0.75,
  },
  placeItemImage: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
  },
  placeItemInfo: {
    flex: 2,
    padding: 12,
  },
  placeItemTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.gray700,
  },
  placeItemAddress: {
    fontSize: 12,
    color: Colors.gray700,
  },
});

export default PlacesList;
