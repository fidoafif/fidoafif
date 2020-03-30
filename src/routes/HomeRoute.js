import React from 'react';
import { createStackNavigator } from 'react-navigation';

import { ButtonNavigationDrawer } from '../components/buttons/ButtonNavigationDrawer';
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
import BecomeReseller from '../screens/user/BecomeReseller';
import EditProfile from '../screens/user/EditProfile';
import SelectCity from '../screens/user/SelectCity';
import SelectCityReseller from '../screens/user/SelectCityReseller';
import FaqPage from '../screens/user/Faq';

const HomeStack = createStackNavigator(
  {
    EditProfile,
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
    BecomeReseller,
    VerifyTransfer,
    SelectCity,
    SelectCityReseller,
    FaqPage,
  },
  {
    initialRouteName: 'HomePage',
    // initialRouteName: 'VerifyTransfer',
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: <ButtonNavigationDrawer navigation={navigation} />,
      };
    },
  },
);

export default HomeStack;
