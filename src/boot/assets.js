// @flow
// import * as Font from "expo-font";

import { Asset } from "expo-asset";

export async function cacheResourcesAsync() {
  const images = [require("../../assets/logo/app-logo.png")];

  const cacheImages = images.map(image => {
    return Asset.fromModule(image).downloadAsync();
  });

  // const cacheFonts = Font.loadAsync({});

  return Promise.all([...cacheImages]);
}
