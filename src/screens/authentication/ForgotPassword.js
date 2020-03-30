import React, { Component } from 'react';
import { Alert } from 'react-native';
import { AppLogo } from '../../components/AppLogo';
import { AwareScroll } from '../../components/AwareScroll';
import { Button } from '../../components/buttons/Button';
import { Loading } from '../../components/modal/Loading';
import { ViewCenter } from '../../components/ViewCenter';
import TextFieldDefault from '../../components/textField/TextFieldDefault';
import { EmailField } from '../../components/textField/EmailField';
import { apiForgotPassword } from '../../utils/api';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = { loading: false, email: '' };

    this.setEmail = this.setEmail.bind(this);
    this.request = this.request.bind(this);
  }

  render() {
    return (
      <AwareScroll>
        <ViewCenter style={{ marginVertical: 20 }}>
          <AppLogo />
        </ViewCenter>
        <ViewCenter style={{ marginVertical: 10, paddingHorizontal: 50 }}>
          <EmailField
            inputOnChange={this.setEmail}
            textValue={this.state.email}
          />
        </ViewCenter>
        <ViewCenter style={{ marginVertical: 10, paddingHorizontal: 50 }}>
          <Button label={'Send Request'} onPress={this.request} />
        </ViewCenter>
        <Loading visible={this.state.loading} />
      </AwareScroll>
    );
  }

  setEmail(value) {
    this.setState({ email: value });
  }
  async request() {
    const { navigation } = this.props;
    const { email } = this.state;

    if (email && email !== '') {
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
        email,
      )
        ? undefined
        : 'Email format wrong';

      if (emailPattern) {
        Alert.alert('Error', 'Please insert email');
      } else {
        try {
          this.setState({ loading: true });

          const response = await apiForgotPassword(email);

          if (response && Number(response.status) === 201) {
            Alert.alert('Success', response.message);
            navigation.goBack();
          }
        } catch (error) {
          Alert.alert('Error', 'Error to request reset password');
        } finally {
          this.setState({ loading: false });
        }
      }
    } else {
      Alert.alert('Error', 'Please insert email');
    }
  }
}

export default ForgotPassword;
