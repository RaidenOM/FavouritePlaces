import { Pressable, StyleSheet, Text } from "react-native";
import { Colors } from "../../constants/colors";

function Button({ onPress, children, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, style, pressed && styles.pressed]}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    borderRadius: 4,
  },
  pressed: {
    opacity: 0.75,
  },
  text: {
    fontSize: 16,
    color: Colors.primary50,
    textAlign: "center",
  },
});

export default Button;
