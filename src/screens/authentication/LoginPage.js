// @@flow
// import { StatusBar } from "react-native";
import { inject, observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { Alert, Platform, View } from 'react-native';
import { AppLogo } from '../../components/AppLogo';
import { AwareScroll } from '../../components/AwareScroll';
import { Button } from '../../components/buttons/Button';
import { ButtonText } from '../../components/buttons/ButtonText';
import { Loading } from '../../components/modal/Loading';
import { PasswordField } from '../../components/textField/PasswordField';
import { SmallText } from '../../components/texts/SmallText';
import { ViewCenter } from '../../components/ViewCenter';
import {
  getUserData,
  saveUserData,
  getFCMToken,
} from '../../utils/authentication';
import { colors } from '../../utils/Colors';
import DeviceInfo from 'react-native-device-info';
import { apiFCM } from '../../utils/api';
import TextFieldDefault from '../../components/textField/TextFieldDefault';

@inject('authStore')
@observer
class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.navigateHome = this.navigateHome.bind(this);
    this.navigateRegister = this.navigateRegister.bind(this);
    this.navigateForgotPassword = this.navigateForgotPassword.bind(this);
    this.login = this.login.bind(this);
  }

  async componentDidMount() {
    const user = await getUserData();

    const { navigation, authStore } = this.props;
    // navigation.navigate('AdminDashboard');
    if (user && user.token) {
      const profile = await authStore.fetchGetProfile();
      const userType = profile && profile.data ? profile.data.type : null;

      if (
        userType &&
        (userType === '0' || userType === '1' || userType === '4')
      ) {
        this.navigateHome();
      } else if (userType && userType === '2') {
        navigation.navigate('SalesDashboard');
      } else if (userType && userType === '3') {
        navigation.navigate('AdminDashboard');
      }
    }
  }

  render() {
    const { authStore } = this.props;

    return (
      <AwareScroll>
        <ViewCenter style={{ marginVertical: 20 }}>
          <AppLogo />
        </ViewCenter>
        <View style={{ marginTop: 10, paddingHorizontal: 50 }}>
          <TextFieldDefault
            placeholder={'Phone Number'}
            inputOnChange={authStore.setPhonenumber}
            textValue={authStore.phone}
          />
          <PasswordField inputOnChange={authStore.setPassword} />
          <View style={{ flexDirection: 'row' }}>
            <ButtonText
              style={{ justifyContent: 'flex-start', marginTop: -20 }}
              onPress={this.navigateForgotPassword}
            >
              <SmallText bold={true} color={colors.PRIMARY_COLOR}>
                {'Forgot password?'}
              </SmallText>
            </ButtonText>
          </View>
        </View>
        <ViewCenter style={{ marginVertical: 10, paddingHorizontal: 50 }}>
          <Button label={'Sign In'} onPress={this.login} />

          <ViewCenter style={{ flexDirection: 'row' }}>
            <SmallText>{"Don't have an account? "}</SmallText>
            <ButtonText onPress={this.navigateRegister}>
              <SmallText bold={true} color={colors.PRIMARY_COLOR}>
                {'Sign Up'}
              </SmallText>
            </ButtonText>
          </ViewCenter>

          {/* <ViewCenter>
            <View
              style={{
                width: '100%',
                position: 'absolute',
                borderWidth: 0.25,
                borderColor: colors.BORDER_COLOR,
              }}
            />
            <SmallText
              color={colors.PRIMARY_COLOR}
              bold={true}
              style={{
                backgroundColor: colors.WHITE_COLOR,
                paddingHorizontal: 10,
                marginVertical: 10,
              }}
            >
              {`or`}
            </SmallText>
          </ViewCenter>

          <ButtonLoginGoogle
            color={colors.BUTTON_GOOGLE_COLOR}
            label={'Sign In With Google'}
          />
          <ButtonLoginFacebook
            color={colors.BUTTON_FACEBOOK_COLOR}
            label={'Sign In With Facebook'}
          /> */}
        </ViewCenter>
        <Loading visible={authStore.loading} />
      </AwareScroll>
    );
  }

  async login() {
    const { authStore, navigation } = this.props;

    const valid = authStore.validate();

    if (valid) {
      const response = await authStore.fetchLogin();
      if (response) {
        await saveUserData(response);

        const profile = await authStore.fetchGetProfile();
        const userType = profile && profile.data ? profile.data.type : null;
        await this.submitFCMToken();

        if (
          userType &&
          (userType === '0' || userType === '1' || userType === '4')
        ) {
          this.navigateHome();
        } else if (userType && userType === '2') {
          navigation.navigate('SalesDashboard');
        } else if (userType && userType === '3') {
          navigation.navigate('AdminDashboard');
        }
      }
    } else {
      Alert.alert('Error', 'Please insert phonenumber and password');
    }
  }

  async submitFCMToken() {
    const fcmToken = await getFCMToken();

    const uniqueId = await DeviceInfo.getUniqueID();
    const brand = await DeviceInfo.getBrand();
    if (fcmToken) {
      await apiFCM(fcmToken, brand ? brand : Platform.OS, uniqueId);
    }
  }

  navigateHome() {
    const { navigation } = this.props;

    navigation.navigate('Home');
  }

  navigateRegister() {
    const { navigation } = this.props;

    navigation.navigate('RegisterPage');
  }

  navigateForgotPassword() {
    const { navigation } = this.props;

    navigation.navigate('ForgotPassword');
  }
}

export default LoginPage;
