// @@flow
import { inject, observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  NavigationScreenProps,
  NavigationStackScreenOptions,
} from 'react-navigation';
import { AwareScroll } from '../../../components/AwareScroll';
import { Button } from '../../../components/buttons/Button';
import { ButtonNavBack } from '../../../components/buttons/ButtonNavBack';
import { Loading } from '../../../components/modal/Loading';
import { EmailField } from '../../../components/textField/EmailField';
import { PasswordField } from '../../../components/textField/PasswordField';
import TextFieldDefault from '../../../components/textField/TextFieldDefault';
import { HeaderText } from '../../../components/texts/HeaderText';
import { MediumText } from '../../../components/texts/MediumText';
import { ViewCenter } from '../../../components/ViewCenter';
import { colors } from '../../../utils/Colors';

// interface IProps extends NavigationScreenProps {
//   addSalesStore;
// }

// interface IState {
//   loading: boolean;
// }

@inject('addSalesStore')
@observer
class AddSales extends Component {
  constructor(props) {
    super(props);

    this.navigateSelectCity = this.navigateSelectCity.bind(this);
    this.register = this.register.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <ButtonNavBack navigation={navigation} />,
      headerTitle: <HeaderText>{'Register'}</HeaderText>,
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

  render() {
    const store = this.props.addSalesStore;
    return (
      <AwareScroll>
        <ViewCenter style={styles.content}>
          <TextFieldDefault
            placeholder={'Name*'}
            inputOnChange={store.setName}
          />
          <TextFieldDefault
            placeholder={'Phone Number*'}
            inputOnChange={store.setPhonenumber}
          />
          <EmailField inputOnChange={store.setEmail} textValue={store.email} />
          <PasswordField inputOnChange={store.setPassword} />
          <PasswordField
            label={'Re-type password'}
            inputOnChange={store.setConfirmPassword}
          />
          <TextFieldDefault
            placeholder={'Address*'}
            inputOnChange={store.setAddress}
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
          {/*<TextFieldDefault placeholder={"Dob*"} inputOnChange={store.setDob} /> */}
          <TextFieldDefault
            placeholder={'Telp*'}
            inputOnChange={store.setTelp}
          />
          <TextFieldDefault placeholder={'NIK*'} inputOnChange={store.setNik} />
          <TextFieldDefault
            placeholder={'Area*'}
            inputOnChange={store.setArea}
          />
          <TextFieldDefault
            placeholder={'Note'}
            inputOnChange={store.setNote}
          />
          <Button label={'Add Sales'} onPress={this.register} />
        </ViewCenter>
        <Loading visible={store.loading} />
      </AwareScroll>
    );
  }

  async register() {
    const { navigation, addSalesStore } = this.props;

    const status = addSalesStore.validateField();
    if (status) {
      const response = await addSalesStore.fetchRegister();

      if (response) {
        Alert.alert('Success', response.message);
        navigation.pop();
      }
    } else {
      Alert.alert('Failed', 'Silahkan lengkapi semua data wajib');
    }
  }

  async navigateSelectCity() {
    // const store = this.props.registerAgentStore;

    this.props.navigation.push('SelectCitySales');
    // console.log(store);
  }
}

const styles = StyleSheet.create({
  content: {
    // marginHorizontal: 50,
    // marginVertical: 70,
    marginVertical: 20,
    marginBottom: 70,
    paddingHorizontal: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AddSales;
