import React, { Component } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import {
  NavigationScreenProps,
  NavigationStackScreenOptions,
} from 'react-navigation';
import { AwareScroll } from '../../components/AwareScroll';
import { ButtonNavBack } from '../../components/buttons/ButtonNavBack';
import { Loading } from '../../components/modal/Loading';
import { HeaderText } from '../../components/texts/HeaderText';
import { MediumText } from '../../components/texts/MediumText';
import ImagePicker from '../../components/pickers/ImagePicker';

import DatePicker from 'react-native-datepicker';
import { Button } from '../../components/buttons/Button';
import { colors } from '../../utils/Colors';
import { apiPostVerifyTransfer } from '../../utils/api';
// interface IProps extends NavigationScreenProps {}

// interface IState {
//   data;
//   loading: boolean;
// }

export default class VerifyTransfer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: null,
      imageUri: null,
    };

    this.verify = this.verify.bind(this);
    this.setImageUri = this.setImageUri.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <ButtonNavBack navigation={navigation} />,
      headerTitle: <HeaderText>{'Verify Transfer'}</HeaderText>,
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
    const { params } = this.props.navigation.state;

    if (params && params.data) {
      this.setState({
        data: params.data,
      });
    }
  }

  render() {
    const { loading } = this.state;

    return (
      <View style={{ flex: 1, padding: 8, paddingVertical: 16 }}>
        <View style={{ flex: 1 }}>
          <DatePicker
            style={{ width: '100%' }}
            date={this.state.date}
            mode="datetime"
            placeholder="Transfer Date"
            format="DD-MM-YYYY hh:mm:ss"
            maxDate={new Date()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            onDateChange={date => {
              this.setState({ date: date });
            }}
          />

          <ImagePicker
            placeholder={'Image'}
            setImageUri={this.setImageUri}
            imageUri={this.state.imageUri}
          />
        </View>

        <TouchableOpacity
          style={{
            padding: 8,
            paddingVertical: 16,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.PRIMARY_COLOR,
          }}
          onPress={this.verify}
        >
          <MediumText color={colors.WHITE_COLOR}>Verify</MediumText>
        </TouchableOpacity>

        <Loading visible={loading} />
      </View>
    );
  }

  async setImageUri(imageUri) {
    this.setState({ imageUri });
  }

  async verify() {
    try {
      const { data, imageUri, date } = this.state;

      if (data && imageUri && date) {
        this.setState({ loading: true });
        const response = await apiPostVerifyTransfer(
          date,
          data.bank,
          data.payment.bank_account_number,
          imageUri,
          data.id_transaction,
        );

        if (response) {
          this.props.navigation.goBack();
        }
      } else {
        Alert.alert('Error', 'Please complete data');
      }
    } catch (error) {
      Alert.alert('Error', 'Something wrong, please try again leter');
    } finally {
      this.setState({ loading: false });
    }
  }
}
