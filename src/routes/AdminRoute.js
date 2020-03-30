import React from 'react';
import { createStackNavigator } from 'react-navigation';

import { ButtonNavigationDrawer } from '../components/buttons/ButtonNavigationDrawer';
import AcceptAgent from '../screens/admin/adminAgent/AcceptAgent';
import AdminManageAgent from '../screens/admin/adminAgent/AdminManageAgent';
import DetailAdminAgent from '../screens/admin/adminAgent/DetailAdminAgent';
import AcceptReseller from '../screens/admin/adminReseller/AcceptReseller';
import AdminManageReseller from '../screens/admin/adminReseller/AdminManageReseller';
import DetailAdminReseller from '../screens/admin/adminReseller/DetailAdminReseller';
import AddSales from '../screens/admin/adminSales/AddSales';
import ManageSales from '../screens/admin/adminSales/ManageSales';
import SelectCitySales from '../screens/admin/adminSales/SelectCitySales';
import DashboardPage from '../screens/admin/dashboard/DashboardPage';
import DetailAdminOrder from '../screens/admin/order/DetailAdminOrder';
import ManageOrder from '../screens/admin/order/ManageOrder';
import AddProduct from '../screens/admin/product/AddProduct';
import EditProduct from '../screens/admin/product/EditProduct';
import ManageProduct from '../screens/admin/product/ManageProduct';
import AddPromo from '../screens/admin/promo/AddPromo';
import EditPromo from '../screens/admin/promo/EditPromo';
import ManagePromo from '../screens/admin/promo/ManagePromo';
import AddDiscount from '../screens/admin/discount/AddDiscount';
import EditDiscount from '../screens/admin/discount/EditDiscount';
import ManageDiscount from '../screens/admin/discount/ManageDiscount';
import EditProfile from '../screens/user/EditProfile';

const AdminStack = createStackNavigator(
  {
    EditProfile,
    DashboardPage,
    ManageProduct,
    ManageOrder,
    ManagePromo,
    ManageSales,
    AddSales,
    DetailAdminOrder,
    AddProduct,
    EditProduct,
    AddPromo,
    EditPromo,
    AdminManageAgent,
    DetailAdminAgent,
    AcceptAgent,
    AdminManageReseller,
    DetailAdminReseller,
    AcceptReseller,
    SelectCitySales,
    ManageDiscount,
    AddDiscount,
    EditDiscount,
  },
  {
    initialRouteName: 'DashboardPage',
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: <ButtonNavigationDrawer navigation={navigation} />,
      };
    },
  },
);

export default AdminStack;
