import { PermissionsAndroid } from "react-native";

const cameraRollPermission = async () => {
  // const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  // return status;

  try {
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Sekawan Cosmeticts App Camera Permission",
        message: "Sekawan Cosmeticts app needs access to your camera ",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    return status;
  } catch (err) {
    return null;
  }
};
const cameraPermission = async () => {
  // const { status } = await Permissions.askAsync(Permissions.CAMERA);
  // return status;

  try {
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Sekawan Cosmeticts App Camera Permission",
        message: "Sekawan Cosmeticts app needs access to your camera ",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    return status;
  } catch (err) {
    return null;
  }
};

export { cameraRollPermission, cameraPermission };
