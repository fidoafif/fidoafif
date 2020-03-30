import { createStackNavigator } from 'react-navigation';

import LoginPage from '../screens/authentication/LoginPage';
import RegisterPage from '../screens/authentication/RegisterPage';
import ForgotPassword from '../screens/authentication/ForgotPassword';

const AuthenticationStack = createStackNavigator(
  {
    LoginPage: {
      screen: LoginPage,
      navigationOptions: () => ({
        header: null,
      }),
    },
    ForgotPassword,
    RegisterPage,
  },
  {
    initialRouteName: 'LoginPage',
  },
);

export default AuthenticationStack;
