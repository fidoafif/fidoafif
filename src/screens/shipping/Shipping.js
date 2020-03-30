import { inject, observer } from 'mobx-react/native';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { AwareScroll } from '../../components/AwareScroll';
import { ButtonFooterRight } from '../../components/buttons/ButtonFooterRight';
import { ButtonNavBack } from '../../components/buttons/ButtonNavBack';
import { Card } from '../../components/Card';
import { Loading } from '../../components/modal/Loading';
import { BankPicker } from '../../components/pickers/BankPicker';
import { ShippingPicker } from '../../components/pickers/ShippingPicker';
import { SeparatorHorizontal } from '../../components/SeparatorHorizontal';
import { HeaderText } from '../../components/texts/HeaderText';
import { LargeText } from '../../components/texts/LargeText';
import { MediumText } from '../../components/texts/MediumText';
import { NormalText } from '../../components/texts/NormalText';
import { ViewCenter } from '../../components/ViewCenter';
import {
  apiGetProfile,
  apiListAddress,
  apiSalesAgentListAddress,
  apiShippingCost,
  apiTransaction,
} from '../../utils/api';
import { colors } from '../../utils/Colors';
import { formatThousand } from '../../utils/FormatThousand';
import CardListItemShipping from './CardListItemShipping';
import { capitalize } from '../../utils/TextTransform';

// interface IProps extends NavigationScreenProps {
//   cartStore;
// }

// interface IState {
//   addressLoading: boolean;
//   loading: boolean;
//   isAgent: boolean;
//   address;
//   shippingMethods;
//   shippingService;
//   // paymentMethod;
//   bank;
//   profile;
// }

@inject('cartStore', 'salesAgentStore')
@observer
class Shipping extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addressLoading: false,
      loading: false,
      isAgent: false,
      address: null,
      shippingMethods: [],
      shippingService: null,
      // paymentMethod: null,
      bank: null,
      profile: null,
    };

    this.onPayment = this.onPayment.bind(this);
    this.navigateChangeAddress = this.navigateChangeAddress.bind(this);
    this.renderAddress = this.renderAddress.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <ButtonNavBack navigation={navigation} backToInitial={true} />
      ),
      headerTitle: <HeaderText>{'Shipping & Payment'}</HeaderText>,
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
    const store = this.props.salesAgentStore;
    const tokenStatus = store.validate();
    const profile = tokenStatus
      ? await store.getAgentData()
      : await apiGetProfile();
    const isAgent = profile && profile.data.type === '1' ? true : false;
    this.setState({ profile, isAgent });

    const addressResponse = await this.fetchAddress(store.token);

    if (addressResponse) {
      await this.fetchShippingCost(addressResponse);
    }
  }

  render() {
    const { shippingService } = this.state;
    const { cartStore } = this.props;

    const subTotal = Number(cartStore.totalPrice);
    const shippingCost = shippingService
      ? Number(shippingService.shippingCost)
      : 0;

    const totalPay = subTotal + shippingCost;
    return (
      <AwareScroll>
        <View style={{ marginTop: 5 }}>
          {this.renderAddress()}
          {this.renderListProducts()}
          {this.renderShipping()}
          {/* {this.renderPaymentMethod()} */}
          {this.renderBank()}
          {this.renderDetailCost()}
          <SeparatorHorizontal />
          <ButtonFooterRight
            rightLabel={'Bayar Sekarang'}
            onPress={this.onPayment}
          >
            <MediumText>Total Pembayaran</MediumText>
            <LargeText
              style={{
                color: colors.PRIMARY_COLOR,
                fontWeight: 'bold',
                justifyContent: 'flex-end',
              }}
            >
              Rp. {formatThousand(totalPay)}
            </LargeText>
          </ButtonFooterRight>
        </View>
        <Loading visible={this.state.loading} />
      </AwareScroll>
    );
  }

  renderAddress() {
    const { addressLoading, address } = this.state;

    return (
      <View style={{ padding: 8, width: '100%' }}>
        <Card>
          <TouchableOpacity onPress={this.navigateChangeAddress}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  display: 'flex',
                  flex: 1,
                }}
              >
                <MediumText style={{ flex: 1, fontWeight: 'bold' }}>
                  Alamat Pengiriman
                </MediumText>
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.PRIMARY_COLOR,
                    width: 90,
                    height: 25,
                    borderRadius: 3,
                  }}
                >
                  <NormalText style={{ color: colors.WHITE_COLOR }}>
                    {'Ubah Alamat'}
                  </NormalText>
                </View>
              </View>
            </View>
            {addressLoading ? (
              <ViewCenter style={{ padding: 8 }}>
                <ActivityIndicator />
              </ViewCenter>
            ) : (
              <MediumText style={{ marginTop: 10 }}>
                {address
                  ? `${address.address}, ${address.district.subdistrict_name}, ${address.city.city_name}, ${address.province.province}, ${address.postal}`
                  : '-'}
              </MediumText>
            )}
          </TouchableOpacity>
        </Card>
      </View>
    );
  }

  renderListProducts() {
    const { cartStore } = this.props;
    const _keyExtractor = (item, index) => {
      return `${index}`;
    };
    return (
      <View style={{ padding: 8, width: '100%' }}>
        <Card>
          <View style={{ flex: 1 }}>
            <MediumText style={{ fontWeight: 'bold' }}>
              Daftar Belanja
            </MediumText>
            <FlatList
              keyExtractor={_keyExtractor}
              data={cartStore.products}
              renderItem={this.renderCart}
            />
          </View>
        </Card>
      </View>
    );
  }

  renderCart({ item }) {
    return <CardListItemShipping item={item} />;
  }

  renderShipping() {
    const { shippingMethods, shippingService, isAgent } = this.state;
    const renderItem = (item, close) => {
      return (
        <View key={item.code}>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 0.3,
              borderBottomColor: colors.BORDER_COLOR,
              padding: 8,
            }}
          >
            <NormalText>{`${item.name}`}</NormalText>
          </View>

          <View
            style={{
              borderBottomWidth: 0.3,
              borderBottomColor: colors.BORDER_COLOR,
              padding: 8,
              marginBottom: 8,
            }}
          >
            {renderCosts(item.name, item.code, item.name, item.costs, close)}
          </View>
        </View>
      );
    };

    const renderCosts = (name, code, shippingName, costs, close) => {
      return costs.map((item, index) => {
        const service = '' + item.service;
        const description = '' + item.description;
        return (
          <View key={index}>
            <View>
              {item.cost.map((cost, index) => {
                let etd = '' + (cost.etd ? cost.etd : '1');
                const value = '' + cost.value;

                if (!etd.toLowerCase().includes('hari')) {
                  etd += ' hari';
                }

                const select = () => {
                  // this.setState({ district: item });
                  const shippingCost = Number(value);
                  const shippingCode = code + '_' + service;

                  const shippingDetail = {
                    shippingCost,
                    shippingCode,
                    description,
                    shippingName,
                    etd,
                  };

                  this.setState({ shippingService: shippingDetail });

                  close();
                };

                return (
                  <TouchableOpacity
                    key={index}
                    onPress={select}
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 8,

                      borderBottomWidth: 0.3,
                      borderBottomColor: colors.BORDER_COLOR,
                      padding: 8,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.18,
                      shadowRadius: 1.0,

                      elevation: 1,
                    }}
                  >
                    {renderCost(name, description, etd, value)}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      });
    };

    const renderCost = (name, title, etd, value) => {
      if (name.toLowerCase() === 'sekawan') {
        return (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <NormalText>{`${capitalize(title)}`}</NormalText>
            <NormalText>{`Rp. ${formatThousand(
              Number(value.toLowerCase()),
            )}`}</NormalText>
          </View>
        );
      }

      return (
        <View>
          <NormalText>{`${capitalize(title)}`}</NormalText>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <NormalText>{etd.toLowerCase()}</NormalText>
            <NormalText>{`Rp. ${formatThousand(
              Number(value.toLowerCase()),
            )}`}</NormalText>
          </View>
        </View>
      );
    };

    const renderData = () => {
      if (shippingService) {
        return (
          <View>
            <NormalText>{shippingService.shippingName}</NormalText>
            <NormalText>{shippingService.description}</NormalText>
            <NormalText>{shippingService.etd}</NormalText>
            <MediumText
              style={{
                color: colors.GREY_COLOR,
                fontWeight: 'bold',
                flexGrow: 1,
              }}
            >
              Rp. {formatThousand(Number(shippingService.shippingCost))}
            </MediumText>
          </View>
        );
      }
      return (
        <View style={{ width: '100%' }}>
          <NormalText>{'Please Choose Shipping Service'}</NormalText>
        </View>
      );
    };

    if (this.state.isAgent) {
      return null;
    }

    return (
      <View style={{ padding: 8, width: '100%' }}>
        <Card style={{ backgroundColor: colors.PRIMARY_COLOR }}>
          <ShippingPicker
            label={'Layanan Pengiriman'}
            shippingMethods={shippingMethods}
            renderData={renderData}
            renderItem={renderItem}
          />
        </Card>
      </View>
    );
  }

  // renderPaymentMethod() {
  //   const { paymentMethod } = this.state;

  //   const onSelectPayment = (item) => {
  //     this.setState({ paymentMethod: item });
  //   };

  //   return (
  //     <View style={{ padding: 8, width: '100%' }}>
  //       <Card>
  //         <PaymentPicker
  //           label={'Metode Pembayaran'}
  //           onSelect={onSelectPayment}
  //           paymentChoose={paymentMethod ? paymentMethod.name : ''}
  //         />
  //       </Card>
  //     </View>
  //   );
  // }
  renderBank() {
    const { bank } = this.state;
    const onSelectBank = item => {
      this.setState({ bank: item });
    };

    if (this.state.isAgent) {
      return null;
    }

    return (
      <View style={{ padding: 8, width: '100%' }}>
        <Card style={{ backgroundColor: colors.PRIMARY_COLOR }}>
          <BankPicker
            label={'Metode Pembayaran'}
            onSelect={onSelectBank}
            bankChoose={bank ? bank.name : ''}
          />
        </Card>
      </View>
    );
  }

  renderDetailCost() {
    const { shippingService } = this.state;
    const { cartStore } = this.props;

    const subTotal = Number(cartStore.totalPrice);
    const shippingCost = shippingService
      ? Number(shippingService.shippingCost)
      : 0;

    const totalPay = subTotal + shippingCost;

    return (
      <View style={{ padding: 8, width: '100%' }}>
        <Card>
          <View>
            <MediumText style={{ fontWeight: 'bold' }}>Detail Biaya</MediumText>
          </View>
          <SeparatorHorizontal style={{ marginVertical: 10 }} />
          <View style={{ margin: 10, flexDirection: 'row' }}>
            <MediumText style={{ flexGrow: 1 }}>Total Belanja</MediumText>
            <MediumText>Rp. {formatThousand(cartStore.totalPrice)}</MediumText>
          </View>
          <View style={{ margin: 10, flexDirection: 'row' }}>
            <MediumText style={{ flexGrow: 1 }}>Biaya Pengiriman</MediumText>
            <MediumText>
              Rp.{' '}
              {shippingService
                ? formatThousand(Number(shippingService.shippingCost))
                : '0'}
            </MediumText>
          </View>
          {/* <View style={{ margin: 10, flexDirection: 'row' }}>
            <MediumText style={{ flexGrow: 1 }}>Biaya Transfer</MediumText>
            <MediumText>Rp. {formatThousand(adminFee)}</MediumText>
          </View> */}
          <SeparatorHorizontal style={{ marginVertical: 10 }} />
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              marginVertical: 5,
              display: 'flex',
              flex: 1,
              paddingHorizontal: 15,
            }}
          >
            <Text style={{ flex: 1 }}>Total</Text>
            <MediumText
              style={{
                color: colors.GOLD_COLOR,
                fontWeight: 'bold',
                justifyContent: 'flex-end',
              }}
            >
              Rp. {formatThousand(totalPay)}
            </MediumText>
          </View>
        </Card>
      </View>
    );
  }

  async fetchAddress(token) {
    try {
      this.setState({ addressLoading: true });

      const response = token
        ? await apiSalesAgentListAddress(token)
        : await apiListAddress();

      if (response && response.data.length) {
        this.setState({
          address: response.data[response.data.length - 1],
        });
        return response.data[response.data.length - 1];
      }
    } catch (error) {
      //
      return null;
    } finally {
      this.setState({ addressLoading: false });
    }
  }

  async fetchShippingCost(address) {
    // const { address } = this.state;
    const { cartStore, salesAgentStore } = this.props;

    let weight = 0;
    cartStore.products.forEach(element => {
      const totalWeight = Number(element.weight) * Number(element.qty);
      weight += Number(totalWeight);
    });
    try {
      this.setState({ addressLoading: true });

      const response = await apiShippingCost(
        salesAgentStore.token,
        address.district.subdistrict_id,
        weight + '',
      );
      // console.log('response', response);
      if (response && response.results.length) {
        this.setState({ shippingMethods: response.results });
      }
    } catch (error) {
      //
    } finally {
      this.setState({ addressLoading: false });
    }
  }

  async onPayment() {
    const { address, shippingService, bank, isAgent } = this.state;
    const { navigation, cartStore } = this.props;

    if (address) {
      await this.fetchPayment();
    } else {
      if (!address) {
        Alert.alert('Failed', 'Please fill address');
      } else if (!isAgent && !shippingService) {
        Alert.alert('Failed', 'Please choose shipping');
      } else if (!isAgent && !bank) {
        Alert.alert('Failed', 'Please choose payment method');
      }
    }
  }

  async fetchPayment() {
    const { address, shippingService, bank, isAgent } = this.state;
    const { navigation, cartStore } = this.props;

    const subTotal = Number(cartStore.totalPrice);
    const shippingCost = shippingService
      ? Number(shippingService.shippingCost)
      : 0;

    const totalPay = subTotal + shippingCost;

    const detail = [];
    cartStore.products.forEach((product, index) => {
      detail.push({
        id_product: product.id,
        qty: product.qty,
        price: product.price,
      });
    });

    try {
      this.setState({ loading: true });

      const store = this.props.salesAgentStore;

      const response = await apiTransaction(
        store.token,
        address.id_address,
        isAgent ? null : shippingService.shippingCode,
        isAgent ? '0' : shippingService.shippingCost,
        subTotal + '',
        totalPay + '',
        isAgent ? '0' : '1',
        isAgent ? null : bank.name,
        detail,
      );

      if (response && response.data) {
        await cartStore.removeAll();
        navigation.navigate('ShippingDetails', { data: response.data });
        // navigation.navigate('Transactions');
      }
    } catch (error) {
      Alert.alert('Failed', 'Please try again later');
      //
    } finally {
      this.setState({ loading: false });
    }
  }

  navigateChangeAddress() {
    const { navigation } = this.props;
    const { profile } = this.state;
    navigation.navigate('ChangeAddress', {
      profile,
      onBack: async () => {
        this.setState({
          address: null,
          shippingMethods: [],
          shippingService: null,
        });
        const addressResponse = await this.fetchAddress();

        if (addressResponse) {
          await this.fetchShippingCost(addressResponse);
        }
      },
    });
  }
}

export default Shipping;
