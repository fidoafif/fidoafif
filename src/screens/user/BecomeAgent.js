// @@flow

import { inject, observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import {
  NavigationScreenProps,
  NavigationStackScreenOptions,
} from 'react-navigation';
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
//   registerAgentStore;
// }

// interface IState {}

@inject('registerAgentStore')
@observer
class BecomeAgent extends Component {
  constructor(props) {
    super(props);

    this.becomeAgent = this.becomeAgent.bind(this);
    this.navigateSelectCity = this.navigateSelectCity.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      // headerLeft: <ButtonNavBack navigation={navigation} />,
      headerTitle: <HeaderText>{'Become Agent'}</HeaderText>,
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
    const store = this.props.registerAgentStore;
    if (profile && profile.data) {
      store.setName(profile.data.name);
      store.setPhonenumber(profile.data.phone);
      store.setEmail(profile.data.email);
    }
  }
  async componentWillUnmount() {
    const store = this.props.registerAgentStore;
    store.clearStore();
  }

  render() {
    const store = this.props.registerAgentStore;
    return (
      <AwareScroll>
        <ViewCenter style={styles.content}>
          <TextFieldDefault
            placeholder={'Name*'}
            inputOnChange={store.setName}
            value={store.name}
          />
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
          <TextFieldDefault
            placeholder={'Owner SIUP*'}
            inputOnChange={store.setSiup}
            value={store.siup}
          />
          <TextFieldDefault
            placeholder={'Contact Name*'}
            inputOnChange={store.setContact}
            value={store.contact}
          />
          <TextFieldDefault
            placeholder={'Phone Number*'}
            inputOnChange={store.setPhonenumber}
            value={store.phonenumber}
          />
          {/*<TextFieldDefault
            placeholder={'Kode Area*'}
            inputOnChange={store.setCodeArea}
            value={store.codeArea}
          />*/}
          <TextFieldDefault
            placeholder={'No Telp'}
            inputOnChange={store.setTelp}
            value={store.telp}
          />
          <EmailField inputOnChange={store.setEmail} textValue={store.email} />

          <TextFieldDefault
            placeholder={'NIK Owner SIUP'}
            inputOnChange={store.setNikSiup}
            value={store.nikSiup}
          />
          <PtkpPicker
            label={'PKP / Non-PKP'}
            onSelect={store.setPkp}
            value={store.pkp}
          />
          <TextFieldDefault
            placeholder={'Nomor NPWP'}
            inputOnChange={store.setNpwp}
            value={store.npwp}
          />

          <Button label={'Become Agent'} onPress={this.becomeAgent} />
        </ViewCenter>
        <Loading visible={store.loading} />
      </AwareScroll>
    );
  }

  async becomeAgent() {
    const store = this.props.registerAgentStore;
    const valid = store.validateField();

    const { navigation } = this.props;
    const { params } = this.props.navigation.state;

    if (valid) {
      const response = await store.fetchAgentRegister();
      if (response) {
        if (params && params.onBack) {
          params.onBack();
          navigation.pop();
        }
      }
    }
  }
  async navigateSelectCity() {
    // const store = this.props.registerAgentStore;

    this.props.navigation.push('SelectCity');
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

export default BecomeAgent;
