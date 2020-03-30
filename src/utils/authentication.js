import AsyncStorage from "@react-native-community/async-storage";
import { USER_APP, USER_FCM_TOKEN } from "../config";
import { Alert } from "react-native";

const saveFCMToken = async value => {
  try {
    await AsyncStorage.setItem(USER_FCM_TOKEN, JSON.stringify(value));
  } catch (error) {
    Alert.alert("Error", error);
  }
};

const getFCMToken = async () => {
  try {
    const response = await AsyncStorage.getItem(USER_FCM_TOKEN);
    return JSON.parse(response);
  } catch (error) {
    Alert.alert("Error", error);
  }
};

const saveUserData = async value => {
  try {
    await AsyncStorage.setItem(USER_APP, JSON.stringify(value));
  } catch (error) {
    Alert.alert("Error", error);
  }
};

const getUserData = async () => {
  try {
    const response = await AsyncStorage.getItem(USER_APP);
    return JSON.parse(response);
  } catch (error) {
    Alert.alert("Error", error);
  }
};

const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem(USER_APP);
    await AsyncStorage.removeItem(USER_FCM_TOKEN);
  } catch (error) {
    Alert.alert("Error", error);
  }
};

export { saveUserData, getUserData, saveFCMToken, getFCMToken, clearUserData };
