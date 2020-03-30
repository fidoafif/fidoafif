import React, { Component } from 'react';
import { inject, observer } from 'mobx-react/native';
import { Alert, TouchableOpacity, View } from 'react-native';
import { AwareScroll } from '../../../components/AwareScroll';
import { ButtonFooterRight } from '../../../components/buttons/ButtonFooterRight';
import { ButtonNavBack } from '../../../components/buttons/ButtonNavBack';
import { ListItem } from '../../../components/ListItem';
import { Loading } from '../../../components/modal/Loading';
import { AddressPicker } from '../../../components/pickers/AddressPicker';
import TextField from '../../../components/TextInput';
import { MediumText } from '../../../components/texts/MediumText';
import { NormalText } from '../../../components/texts/NormalText';
import { SmallText } from '../../../components/texts/SmallText';
import { apiAddAddress, apiSalesAgentAddAddress } from '../../../utils/api';
import { colors } from '../../../utils/Colors';

// export interface IChangeAddressProps extends NavigationScreenProps {}

// export interface IChangeAddressState {
//   name;
//   phoneNumber;
//   province;
//   city;
//   district;
//   posCode;
//   address;

//   loading: boolean;
// }
@inject('salesAgentStore')
@observer
class ChangeAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phoneNumber: '',

      province: '',
      city: '',
      district: '',
      posCode: '',
      address: '',

      loading: false,
    };

    this.itemOnchangeAddress = this.itemOnchangeAddress.bind(this);
    this.saveAddress = this.saveAddress.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <ButtonNavBack navigation={navigation} />,
      headerRight: <View />,
      headerTitle: 'Ubah Alamat',
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
    if (params && params.profile && params.profile.data) {
      this.setState({
        name: params.profile.data.name,
        phoneNumber: params.profile.data.phone,
      });
    }
  }

  render() {
    const { loading, name, phoneNumber, city } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <AwareScroll>
          <View>
            <ListItem leftContent={'Nama'}>
              <NormalText>{name}</NormalText>
            </ListItem>
            <ListItem leftContent={'Phonenumber'}>
              <NormalText>{phoneNumber}</NormalText>
            </ListItem>
            {this.setProvince()}
            {this.setCity()}
            {this.setDistrict()}
            <ListItem leftContent={'Kode Pos'}>
              <NormalText>{city ? city.postal_code : '-'}</NormalText>
            </ListItem>
            <ListItem>{this.rightAddress()}</ListItem>
          </View>
          <Loading visible={loading} />
        </AwareScroll>
        <ButtonFooterRight
          oneButton={true}
          rightLabel={'Simpan'}
          onPress={this.saveAddress}
        />
      </View>
    );
  }

  setProvince() {
    const { province } = this.state;
    const renderItem = (item, close) => {
      const select = () => {
        this.setState({ province: item });
        close();
      };
      return (
        <TouchableOpacity
          key={item.province_id}
          onPress={select}
          style={{
            paddingVertical: 10,
            // borderBottomWidth: 0.3,
            borderColor: colors.BORDER_COLOR,
            paddingHorizontal: 8,
          }}
        >
          <NormalText>{`${item.province}`}</NormalText>
        </TouchableOpacity>
      );
    };

    const renderData = () => {
      return (
        <NormalText style={{ textAlign: 'right', marginRight: 10 }}>
          {province ? province.province : ''}
        </NormalText>
      );
    };
    return (
      <AddressPicker
        type={'province'}
        renderItem={renderItem}
        renderData={renderData}
        textFieldLabel={'Provinsi'}
      />
    );
  }

  setCity() {
    const { city, province } = this.state;

    const renderItem = (item, close) => {
      const select = () => {
        this.setState({ city: item });
        close();
      };
      return (
        <TouchableOpacity
          key={item.city_id}
          onPress={select}
          style={{
            paddingVertical: 10,
            // borderBottomWidth: 0.3,
            borderColor: colors.BORDER_COLOR,
            paddingHorizontal: 8,
          }}
        >
          <NormalText>{`${item.city_name}`}</NormalText>
        </TouchableOpacity>
      );
    };

    const renderData = () => {
      return (
        <NormalText style={{ textAlign: 'right', marginRight: 10 }}>
          {city ? city.city_name : ''}
        </NormalText>
      );
    };
    return (
      <AddressPicker
        type={'city'}
        provinceId={province.province_id}
        renderItem={renderItem}
        renderData={renderData}
        textFieldLabel={'Kota'}
      />
    );
  }

  setDistrict() {
    const { district, city } = this.state;

    const renderItem = (item, close) => {
      const select = () => {
        this.setState({ district: item });
        close();
      };
      return (
        <TouchableOpacity
          key={item.subdistrict_id}
          onPress={select}
          style={{
            paddingVertical: 10,
            // borderBottomWidth: 0.3,
            borderColor: colors.BORDER_COLOR,
            paddingHorizontal: 8,
          }}
        >
          <NormalText>{`${item.subdistrict_name}`}</NormalText>
        </TouchableOpacity>
      );
    };

    const renderData = () => {
      return (
        <NormalText style={{ textAlign: 'right', marginRight: 10 }}>
          {district ? district.subdistrict_name : ''}
        </NormalText>
      );
    };
    return (
      <AddressPicker
        type={'district'}
        cityId={city.city_id}
        renderItem={renderItem}
        renderData={renderData}
        textFieldLabel={'Kecamatan'}
      />
    );
  }

  rightAddress() {
    const { address } = this.state;
    return (
      <View style={{ width: '100%' }}>
        <MediumText>Alamat Lengkap</MediumText>
        <SmallText style={{ color: colors.GREY_COLOR }}>
          (Nama gedung, jalan dan lainnya)
        </SmallText>
        <TextField
          style={{ width: '100%', paddingHorizontal: 0 }}
          value={address}
          placeholder={'Alamat'}
          onChangeText={this.itemOnchangeAddress}
        />
      </View>
    );
  }

  itemOnchangeAddress(address) {
    this.setState({ address });
  }

  async saveAddress() {
    const store = this.props.salesAgentStore;
    const tokenStatus = store.validate();
    const { name, phoneNumber, province, city, district, address } = this.state;

    if (name && phoneNumber && province && city && district && address) {
      try {
        this.setState({ loading: true });
        const response = tokenStatus
          ? await apiSalesAgentAddAddress(
              store.token,
              name,
              phoneNumber,
              address,
              province.province_id,
              city.city_id,
              district.subdistrict_id,
              city.postal_code,
            )
          : await apiAddAddress(
              name,
              phoneNumber,
              address,
              province.province_id,
              city.city_id,
              district.subdistrict_id,
              city.postal_code,
            );
        if (response) {
          // console.log(response);
          const { params } = this.props.navigation.state;

          if (params && params.onBack) {
            params.onBack();
            this.props.navigation.goBack();
          }
        }
      } catch (error) {
        // Alert.alert('Cannot save user address');
      } finally {
        this.setState({ loading: false });
      }
    } else {
      Alert.alert('Failed', 'Please complete address data');
    }
  }
}

export default ChangeAddress;
