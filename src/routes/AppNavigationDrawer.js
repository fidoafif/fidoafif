import { createDrawerNavigator } from "react-navigation";
import { DrawerContent } from "../components/drawer/DrawerContent";
import { colors } from "../utils/Colors";
import CategoryStack from "./CategoryStack";
import HomeStack from "./HomeRoute";

const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeStack
    },
    Category: {
      screen: CategoryStack
    }
  },
  {
    initialRouteName: "Home",
    order: ["Home", "Category"],

    contentOptions: {
      activeTintColor: colors.PRIMARY_COLOR
    },
    contentComponent: DrawerContent
  }
);

export default AppDrawerNavigator;
