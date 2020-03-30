// @@flow

import { inject, observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import { AwareScroll } from '../../components/AwareScroll';
import { Button } from '../../components/buttons/Button';
import { Loading } from '../../components/modal/Loading';
import { PtkpPicker } from '../../components/pickers/PtkpPicker';
import { EmailField } from '../../components/textField/EmailField';
import TextFieldDefault from '../../components/textField/TextFieldDefault';
import { HeaderText } from '../../components/texts/HeaderText';
import { MediumText } from '../../components/texts/MediumText';
import { ViewCenter } from '../../components/ViewCenter';
import { apiGetProfile } from '../../utils/api';
import { colors } from '../../utils/Colors';

// interface IProps extends NavigationScreenProps {
//   registerResellerStore;
// }

// interface IState {}

@inject('registerResellerStore')
@observer
class BecomeReseller extends Component {
  constructor(props) {
    super(props);

    this.becomeReseller = this.becomeReseller.bind(this);
    this.navigateSelectCity = this.navigateSelectCity.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      // headerLeft: <ButtonNavBack navigation={navigation} />,
      headerTitle: <HeaderText>{'Become Reseller'}</HeaderText>,
      headerRight: <View />,
      headerStyle: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
      },
    };
  };

  async componentDidMount() {
    // let dataProfile =
    const profile = await apiGetProfile();

    // const { params } = this.props.navigation.state;
    const store = this.props.registerResellerStore;
    if (profile && profile.data) {
      store.setName(profile.data.name);
      store.setPhonenumber(profile.data.phone);
      store.setEmail(profile.data.email);
    }
  }
  async componentWillUnmount() {
    const store = this.props.registerResellerStore;
    store.clearStore();
  }

  render() {
    const store = this.props.registerResellerStore;
    return (
      <AwareScroll>
        <ViewCenter style={styles.content}>
          <TextFieldDefault
            placeholder={'Name*'}
            inputOnChange={store.setName}
            // editable={false}
            value={store.name}
          />

          <TextFieldDefault
            placeholder={'Phone Number*'}
            inputOnChange={store.setPhonenumber}
            value={store.phonenumber}
          />
          <EmailField inputOnChange={store.setEmail} textValue={store.email} />
          <TextFieldDefault
            placeholder={'Address*'}
            inputOnChange={store.setAddress}
            value={store.address}
          />
          <View style={{ flex: 1, width: '100%' }}>
            <TouchableOpacity
              onPress={this.navigateSelectCity}
              style={{
                flex: 1,
                width: '100%',
                height: 45,
                marginBottom: 16,
                borderColor: colors.BORDER_COLOR,
                borderWidth: 1.1,
                borderRadius: 4,
                justifyContent: 'center',
                paddingLeft: 8,
              }}
            >
              <MediumText
                color={store.city ? colors.BLACK_COLOR : colors.BORDER_COLOR}
              >
                {store.city ? store.city : 'City*'}
              </MediumText>
            </TouchableOpacity>
          </View>

          <Button label={'Become Reseller'} onPress={this.becomeReseller} />
        </ViewCenter>
        <Loading visible={store.loading} />
      </AwareScroll>
    );
  }

  async becomeReseller() {
    const store = this.props.registerResellerStore;
    const valid = store.validateField();

    const { navigation } = this.props;
    const { params } = this.props.navigation.state;

    if (valid) {
      const response = await store.fetchResellerRegister();
      if (response) {
        if (params && params.onBack) {
          params.onBack();
          navigation.pop();
        }
      }
    }
  }
  async navigateSelectCity() {
    // const store = this.props.registerResellerStore;

    this.props.navigation.push('SelectCityReseller');
    // console.log(store);
  }
}

const styles = StyleSheet.create({
  content: {
    marginVertical: 20,
    marginBottom: 70,
    paddingHorizontal: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BecomeReseller;
