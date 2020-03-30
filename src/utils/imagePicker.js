import ImagePicker from "react-native-image-picker";
import { cameraPermission, cameraRollPermission } from "./permissions";
import { PermissionsAndroid } from "react-native";

const imagePickerGallery = async callback => {
  const cameraStatus = await cameraPermission();
  // const cameraRollStatus = await cameraRollPermission();
  if (cameraStatus === PermissionsAndroid.RESULTS.GRANTED) {
    ImagePicker.launchImageLibrary(
      {
        allowsEditing: true,
        aspect: [2, 2],
        quality: 0.5
      },
      callback
    );
  } else {
    console.warn("Butuh ijin penggunaan kamera untuk melanjutkan!");

    return null;
  }
};
const imagePickerCamera = async () => {
  const cameraStatus = await cameraPermission();
  // const cameraRollStatus = await cameraRollPermission();
  if (cameraStatus === PermissionsAndroid.RESULTS.GRANTED) {
    return ImagePicker.launchCamera({
      allowsEditing: true,
      aspect: [2, 2],
      quality: 0.5
    });
  } else {
    console.warn("Butuh ijin penggunaan kamera untuk melanjutkan!");

    return null;
  }
};
// const imagePickerGallery = async () => {
//   const cameraStatus = await cameraPermission();
//   const cameraRollStatus = await cameraRollPermission();
//   if (cameraStatus === "granted" && cameraRollStatus === "granted") {
//     return ImagePicker.launchImageLibraryAsync({
//       allowsEditing: true,
//       aspect: [2, 2],
//       quality: 0.5
//     });
//   } else {
//     console.warn("Butuh ijin penggunaan kamera untuk melanjutkan!");

//     return null;
//   }
// };
// const imagePickerCamera = async () => {
//   const cameraStatus = await cameraPermission();
//   const cameraRollStatus = await cameraRollPermission();
//   if (cameraStatus === "granted" && cameraRollStatus === "granted") {
//     return ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [2, 2],
//       quality: 0.5
//     });
//   } else {
//     console.warn("Butuh ijin penggunaan kamera untuk melanjutkan!");

//     return null;
//   }
// };

export { imagePickerGallery, imagePickerCamera };
