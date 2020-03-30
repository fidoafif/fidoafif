import { createDrawerNavigator } from "react-navigation";
1;
import { SalesDrawerContent } from "../components/drawer/SalesDrawerContent";
import { colors } from "../utils/Colors";
import SalesStack from "./SalesRoute";

const SalesDrawerNavigator = createDrawerNavigator(
  {
    SalesDashboard: {
      screen: SalesStack
    }
  },
  {
    initialRouteName: "SalesDashboard",
    order: ["SalesDashboard"],

    contentOptions: {
      activeTintColor: colors.PRIMARY_COLOR
    },
    contentComponent: SalesDrawerContent
  }
);

export default SalesDrawerNavigator;
