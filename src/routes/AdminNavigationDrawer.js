import { createDrawerNavigator } from "react-navigation";
import { AdminDrawerContent } from "../components/drawer/AdminDrawerContent";
import { colors } from "../utils/Colors";
import AdminStack from "./AdminRoute";

const AdminDrawerNavigator = createDrawerNavigator(
  {
    AdminDashboard: {
      screen: AdminStack
    }
  },
  {
    initialRouteName: "AdminDashboard",
    order: ["AdminDashboard"],

    contentOptions: {
      activeTintColor: colors.PRIMARY_COLOR
    },
    contentComponent: AdminDrawerContent
  }
);

export default AdminDrawerNavigator;
