import React from 'react';
import { createStackNavigator } from 'react-navigation';

import { ButtonNavigationDrawer } from '../components/buttons/ButtonNavigationDrawer';
import SalesDashboard from '../screens/sales/dashboard/SalesDashboard';
import DetailSalesOrder from '../screens/sales/order/DetailSalesOrder';
import SalesManageOrder from '../screens/sales/order/SalesManageOrder';
import SalesAddPromo from '../screens/sales/promo/SalesAddPromo';
import SalesEditPromo from '../screens/sales/promo/SalesEditPromo';
import SalesManagePromo from '../screens/sales/promo/SalesManagePromo';

import SalesAddDiscount from '../screens/sales/discount/SalesAddDiscount';
import SalesEditDiscount from '../screens/sales/discount/SalesEditDiscount';
import SalesManageDiscount from '../screens/sales/discount/SalesManageDiscount';

import OrderAgent from '../screens/sales/salesAgent/OrderAgent';
import EditProfile from '../screens/user/EditProfile';

import Cart from '../screens/cart/Cart';
import CategoryPage from '../screens/category/CategoryPage';
import HomePage from '../screens/home/HomePage';
import DetailsProductPage from '../screens/product/DetailsProductPage';
import ProductPage from '../screens/product/ProductPage';
import ChangeAddress from '../screens/shipping/editShipping/ChangeAddress';
import Shipping from '../screens/shipping/Shipping';
import ShippingDetails from '../screens/shipping/ShippingDetails';
import DetailTransaction from '../screens/transaction/DetailTransaction';
import Transactions from '../screens/transaction/Transactions';
import VerifyTransfer from '../screens/transaction/VerifyTransfer';
import BecomeAgent from '../screens/user/BecomeAgent';
import SelectCity from '../screens/user/SelectCity';

import AcceptAgentSales from '../screens/sales/salesAgent/AcceptAgentSales';
import SalesManageAgent from '../screens/sales/salesAgent/SalesManageAgent';
import DetailSalesAgent from '../screens/sales/salesAgent/DetailSalesAgent';

const SalesStack = createStackNavigator(
  {
    EditProfile,
    SalesDashboard,
    SalesManageOrder,
    DetailSalesOrder,
    OrderAgent,
    SalesManagePromo,
    SalesEditPromo,
    SalesAddPromo,

    SalesManageDiscount,
    SalesEditDiscount,
    SalesAddDiscount,

    EditProfile,

    SalesManageAgent,
    DetailSalesAgent,
    AcceptAgentSales,

    HomePage,
    ProductPage,
    DetailsProductPage,
    CategoryPage,
    Cart,
    Shipping,
    ShippingDetails,
    ChangeAddress,
    Transactions,
    DetailTransaction,
    BecomeAgent,
    VerifyTransfer,
    SelectCity,
  },
  {
    initialRouteName: 'SalesDashboard',
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: <ButtonNavigationDrawer navigation={navigation} />,
      };
    },
  },
);

export default SalesStack;
