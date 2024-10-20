import { Alert, Button, Image, View, Text, StyleSheet } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useEffect, useState } from "react";
import { Colors } from "../../constants/colors";

function ImagePicker({ imagePickHandler }) {
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();
  const [pickedImage, setPickedImage] = useState(null);

  useEffect(() => {
    imagePickHandler(pickedImage);
  }, [pickedImage]);

  const verifyPermission = async () => {
    if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert("Cannot continue", "You need to grant camera permission.");
      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      allowsMultipleSelection: false,
    });
    setPickedImage(image.assets[0].uri.toString());
  };

  const ImagePreview = () => {
    if (pickedImage) {
      return <Image source={{ uri: pickedImage }} style={styles.image} />;
    } else {
      return <Text>No Image Picked</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imagePreview}>
        <ImagePreview />
      </View>
      <Button title="Choose Image" onPress={takeImageHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ImagePicker;
