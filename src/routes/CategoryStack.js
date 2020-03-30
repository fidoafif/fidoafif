import React from "react";
import { createStackNavigator } from "react-navigation";
import { ButtonNavigationDrawer } from "../components/buttons/ButtonNavigationDrawer";
import CategoryPage from "../screens/category/CategoryPage";

const CategoryStack = createStackNavigator(
  {
    CategoryPage
  },
  {
    initialRouteName: "CategoryPage",
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: <ButtonNavigationDrawer navigation={navigation} />
      };
    }
  }
);

export default CategoryStack;
