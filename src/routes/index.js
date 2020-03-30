import { createAppContainer, createSwitchNavigator } from "react-navigation";
import AdminDrawerNavigator from "./AdminNavigationDrawer";
import AppDrawerNavigator from "./AppNavigationDrawer";
import AuthenticationStack from "./AuthenticationRoute";
import SalesDrawerNavigator from "./SalesNavigationDrawer";

const SwitchNavigator = createSwitchNavigator(
  {
    Authentication: {
      screen: AuthenticationStack
    },
    Home: {
      screen: AppDrawerNavigator
    },
    AdminDashboard: {
      screen: AdminDrawerNavigator
    },
    SalesDashboard: {
      screen: SalesDrawerNavigator
    }
  },
  {
    initialRouteName: "Authentication"
  }
);

export const RouteApp = createAppContainer(SwitchNavigator);
