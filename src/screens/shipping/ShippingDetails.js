import { Icon } from 'react-native-elements';

import React, { Component } from 'react';
import {
  Alert,
  BackHandler,
  Clipboard,
  Image,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  FlatList,
  NavigationScreenProps,
  NavigationStackScreenOptions,
} from 'react-navigation';
import { AwareScroll } from '../../components/AwareScroll';
import { ButtonNavBack } from '../../components/buttons/ButtonNavBack';
import { ButtonText } from '../../components/buttons/ButtonText';
import { Card } from '../../components/Card';
import { SeparatorHorizontal } from '../../components/SeparatorHorizontal';
import { ExtraLargeText } from '../../components/texts/ExtraLargeText';
import { HeaderText } from '../../components/texts/HeaderText';
import { LargeText } from '../../components/texts/LargeText';
import { MediumText } from '../../components/texts/MediumText';
import { NormalText } from '../../components/texts/NormalText';
import { SmallText } from '../../components/texts/SmallText';
import { AutoResizeHeightWebView } from '../../components/webview/AutoResizeHeightWebView';
import { colors } from '../../utils/Colors';
import { formatDateTimeStamp } from '../../utils/FormatDate';
import { formatThousand } from '../../utils/FormatThousand';
import { WebView } from 'react-native-webview';
// interface IProps extends NavigationScreenProps {}

// interface IState {
//   data;
//   howtopay;
//   itemHowtopayExpand;
// }

export default class ShippingDetails extends Component {
  constructor(props) {
    super(props);

    this.state = { data: null, howtopay: [], itemHowtopayExpand: {} };

    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.handleBackPress = this.handleBackPress.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <ButtonNavBack navigation={navigation} backToInitial={true} />
      ),
      headerTitle: <HeaderText>{'Shipping & Payment Detail'}</HeaderText>,
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

  componentDidMount() {
    // this.setState({ data, howtopay: data.howtopay });
    const { params } = this.props.navigation.state;

    if (params) {
      this.setState({ data: params.data, howtopay: params.data.howtopay });
    }

    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  render() {
    return (
      <AwareScroll>
        {this.renderDetailOrder()}
        {this.renderDetailsBank()}
        {this.renderAddress()}
        {this.renderListProducts()}
        {this.renderShippingService()}
        {this.renderPaymentMethod()}
        {this.renderDetailCost()}
        <SeparatorHorizontal />
      </AwareScroll>
    );
  }

  renderDetailOrder() {
    const { data } = this.state;
    if (data) {
      return (
        <Card style={{ margin: 8 }}>
          <View style={{ display: 'flex' }}>
            <LargeText bold={true}>Order Number: {data.order_number}</LargeText>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                display: 'flex',
                marginTop: 10,
              }}
            >
              <SmallText>{`Date: ${formatDateTimeStamp(
                data.order_date,
              )}`}</SmallText>
              {data.user && data.user.type.toLowerCase() === 'agent' ? (
                <MediumText color={colors.ORANGE_COLOR}>
                  {data.user.name} - {data.user.type} - {data.approval}
                </MediumText>
              ) : (
                <View />
              )}
            </View>
          </View>
        </Card>
      );
    }

    return null;
  }

  renderDetailsBank() {
    const { data } = this.state;

    if (data && data.payment) {
      return (
        <Card style={{ margin: 8 }}>
          <View style={{ display: 'flex', alignItems: 'center' }}>
            {/* <LargeText>{`${data.payment.bank_code} ${
              data.payment.bank_branch
            }`}</LargeText> */}
            <ExtraLargeText style={{ fontWeight: 'bold' }}>
              {data.payment.bank_account_number}
            </ExtraLargeText>
            <ButtonText
              onPress={this.copyToClipboard}
              style={{
                borderColor: colors.GOLD_COLOR,
                borderWidth: 1,
                padding: 5,
                width: 80,
                borderRadius: 2,
                alignItems: 'center',
              }}
            >
              <NormalText
                onPress={this.copyToClipboard}
                style={{ color: colors.GOLD_COLOR }}
              >
                Salin Kode
              </NormalText>
            </ButtonText>
            <MediumText style={{ marginTop: 8 }}>
              Account: {data.payment.account_holder_name}
            </MediumText>
          </View>
          <View style={{ flex: 1, marginTop: 16 }}>
            <View>
              <NormalText>{'How To Pay?'}</NormalText>
            </View>
            {this.howToPay()}
          </View>
        </Card>
      );
    }

    return null;
  }

  howToPay() {
    const { howtopay, data, itemHowtopayExpand } = this.state;
    // console.log(data);
    if (howtopay && howtopay.length) {
      const htmlStyle =
        '<Style>ol{margin-left: -20px;} li,p {font-size: 12px;}</Style>';

      const itemIndex = howtopay.findIndex(element => {
        return data.payment.bank_code === element.code;
      });

      if (itemIndex === -1) {
        return null;
      } else {
        const item = howtopay[itemIndex];
        return (
          <View key={itemIndex} style={{ height: 175 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomWidth: 0.3,
                marginTop: 8,
              }}
            >
              <NormalText>{item.platform}</NormalText>
            </View>

            <WebView
              ref={e => (this.webview = e)}
              source={{ html: htmlStyle + item.text }}
              javaScriptEnabled={true}
              useWebKit={false}
              scalesPageToFit={false}
              style={{ backgroundColor: 'white', width: '100%' }}
              scrollEnabled={false}
            />
          </View>
        );
      }
    }
    return null;
  }

  renderAddress() {
    const { data } = this.state;
    if (data) {
      const address = data.address;

      return (
        <Card style={{ margin: 8 }}>
          <MediumText style={{ flex: 1, fontWeight: 'bold' }}>
            Alamat Pengiriman
          </MediumText>
          <MediumText style={{ marginTop: 10 }}>
            {address
              ? `${address.address}, ${address.district.subdistrict_name}, ${address.city.city_name}, ${address.province.province}, ${address.postal}`
              : '-'}
          </MediumText>
        </Card>
      );
    }

    return null;
  }

  renderListProducts() {
    const { data } = this.state;
    if (data) {
      const products = data.order;
      const _keyExtractor = (item, index) => {
        return `${index}`;
      };

      return (
        <View style={{ padding: 15, width: '100%' }}>
          <Card>
            <View style={{ flex: 1 }}>
              <MediumText style={{ fontWeight: 'bold' }}>
                Daftar Belanja
              </MediumText>
              <FlatList
                keyExtractor={_keyExtractor}
                data={products}
                renderItem={this.renderProduct}
              />
            </View>
          </Card>
        </View>
      );
    }
    return null;
  }

  renderProduct({ item }) {
    const productImage = item.product.images + '';
    return (
      <Card>
        <View style={{ flexDirection: 'row' }}>
          <Image
            style={styles.image}
            source={{ uri: productImage.substring(1) }}
          />
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <MediumText style={{ color: colors.GREY_COLOR }}>
                {item.product.name}
              </MediumText>
            </View>
            <View style={{ flex: 1 }}>
              <MediumText style={{ color: colors.GREY_COLOR }}>
                {`${item.qty} qty`}
              </MediumText>
            </View>
            <View style={{ flex: 1 }}>
              <MediumText
                style={{
                  color: colors.GREY_COLOR,
                  fontWeight: 'bold',
                }}
              >
                Rp. {formatThousand(item.price)}
              </MediumText>
            </View>
          </View>
        </View>
      </Card>
    );
  }

  renderShippingService() {
    const { data } = this.state;
    if (data && data.shipping && data.shipping !== '') {
      return (
        <Card style={{ margin: 8 }}>
          <MediumText style={{ flex: 1, fontWeight: 'bold' }}>
            Layanan Pengiriman
          </MediumText>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            {/* {this.state.logoService ? (
              <Image
                style={styles.imageLayanan}
                source={this.state.logoService}
              />
            ) : null} */}
            <View>
              <MediumText>{data.shipping.toUpperCase()}</MediumText>
              <MediumText
                style={{
                  color: colors.GREY_COLOR,
                  fontWeight: 'bold',
                  flexGrow: 1,
                }}
              >
                Rp. {formatThousand(Number(data.shipping_cost))}
              </MediumText>
            </View>
          </View>
        </Card>
      );
    }
    return null;
  }

  renderPaymentMethod() {
    const { data } = this.state;
    if (data && data.payment) {
      return (
        <View style={{ padding: 8, width: '100%' }}>
          <Card>
            <MediumText style={{ flex: 1, fontWeight: 'bold' }}>
              Metode Pembayaran
            </MediumText>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              {/* {this.state.logoPaymentType ? (
              <Image
                style={styles.imageLayanan}
                source={this.state.logoPaymentType}
              />
            ) : null} */}
              <View>
                <MediumText>{data.payment.bank_code}</MediumText>
                <MediumText
                  style={{
                    color: colors.GREY_COLOR,
                    fontWeight: 'bold',
                    flexGrow: 1,
                  }}
                >
                  {data.payment.bank_branch}
                </MediumText>
              </View>
            </View>
          </Card>
        </View>
      );
    }
    return null;
  }
  renderDetailCost() {
    const { data } = this.state;
    if (data) {
      return (
        <Card style={{ margin: 8 }}>
          <View style={{ margin: 10 }}>
            <MediumText style={{ fontWeight: 'bold' }}>Detail Biaya</MediumText>
          </View>
          <SeparatorHorizontal style={{ marginVertical: 10 }} />
          <View style={{ margin: 10, flexDirection: 'row' }}>
            <MediumText style={{ flexGrow: 1 }}>Total Belanja</MediumText>
            <MediumText>Rp. {formatThousand(Number(data.subtotal))}</MediumText>
          </View>
          <View style={{ margin: 10, flexDirection: 'row' }}>
            <MediumText style={{ flexGrow: 1 }}>Biaya Pengiriman</MediumText>
            <MediumText>
              Rp. {formatThousand(Number(data.shipping_cost))}
            </MediumText>
          </View>
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
              Rp. {formatThousand(Number(data.total))}
            </MediumText>
          </View>
        </Card>
      );
    }
    return null;
  }

  async copyToClipboard() {
    const { data } = this.state;
    await Clipboard.setString(data.payment.bank_account_number);
    Platform.OS === 'android'
      ? ToastAndroid.show('Copied to Clipboard!', ToastAndroid.SHORT)
      : Alert.alert('Copied to Clipboard!');
  }

  handleBackPress() {
    this.props.navigation.popToTop();
    return true;
  }
}

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  imageLayanan: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
});
