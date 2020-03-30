// @@flow

import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-navigation';
import { AwareScroll } from '../../../components/AwareScroll';
import { ButtonNavBack } from '../../../components/buttons/ButtonNavBack';
import { Card } from '../../../components/Card';
import { Loading } from '../../../components/modal/Loading';
import { SeparatorHorizontal } from '../../../components/SeparatorHorizontal';
import { HeaderText } from '../../../components/texts/HeaderText';
import { LargeText } from '../../../components/texts/LargeText';
import { MediumText } from '../../../components/texts/MediumText';
import { SmallText } from '../../../components/texts/SmallText';
import { ViewCenter } from '../../../components/ViewCenter';
import { apiDetailTransaction } from '../../../utils/api';
import { colors } from '../../../utils/Colors';
import { formatDateTimeStamp } from '../../../utils/FormatDate';
import { formatThousand } from '../../../utils/FormatThousand';
import { UpdateOrderModal } from './UpdateOrderModal';
import { TrackingOrder } from '../../../components/modal/TrackingOrder';

// interface IProps extends NavigationScreenProps {}

// interface IState {
//   data;
//   orderStatus;
//   trackingNumber;
//   loading: boolean;
//   updateModal: boolean;
// }

export default class DetailAdminOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      updateModal: false,
      data: null,
      orderStatus: null,
      trackingNumber: '',
    };

    this.showUpdateModal = this.showUpdateModal.bind(this);
    this.hideUpdateModal = this.hideUpdateModal.bind(this);
    this.setTrackingNumber = this.setTrackingNumber.bind(this);
    this.setOrderStatus = this.setOrderStatus.bind(this);
    this.updateOrderSuccess = this.updateOrderSuccess.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <ButtonNavBack navigation={navigation} />,
      headerTitle: <HeaderText>{'Detail Order'}</HeaderText>,
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
      try {
        this.setState({ loading: true });
        const response = await apiDetailTransaction(params.data.id_transaction);

        if (response) {
          console.log(response.data);
          this.setState({
            data: response.data,
          });
        }
      } catch (error) {
        //
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  render() {
    const {
      data,
      loading,
      updateModal,
      orderStatus,
      trackingNumber,
    } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <AwareScroll>
          {this.renderDetailOrder()}
          {/* {this.renderDetailsBank()} */}
          {this.renderAddress()}
          {this.renderListProducts()}
          {this.renderShippingService()}
          {this.renderPaymentMethod()}
          {this.renderDetailCost()}
          {this.renderPaymentConfirmation()}
          <SeparatorHorizontal />
        </AwareScroll>
        <TouchableOpacity onPress={this.showUpdateModal}>
          <ViewCenter
            style={{ padding: 16, backgroundColor: colors.PRIMARY_COLOR }}
          >
            <MediumText color={colors.WHITE_COLOR}>{'Update Order'}</MediumText>
          </ViewCenter>
        </TouchableOpacity>
        <Loading visible={loading} />
        <UpdateOrderModal
          dataOrder={data}
          trackingNumber={trackingNumber}
          orderStatus={orderStatus}
          visible={updateModal}
          close={this.hideUpdateModal}
          setTrackingNumber={this.setTrackingNumber}
          setOrderStatus={this.setOrderStatus}
          updateSuccess={this.updateOrderSuccess}
        />
      </View>
    );
  }

  renderPaymentConfirmation() {
    const { data } = this.state;
    if (data && data.paid) {
      const paid = data.paid;
      return (
        <Card style={{ margin: 8 }}>
          <MediumText style={{ flex: 1, fontWeight: 'bold' }}>
            {`Konfirmasi Pembayaran`}
          </MediumText>
          <MediumText style={{ flex: 1 }}>{`Bank: ${paid.bank}`}</MediumText>
          <MediumText style={{ marginTop: 10 }}>
            {`Account Number: ${paid.account_number}`}
          </MediumText>
          <MediumText style={{ marginTop: 10 }}>
            {`Confirmation Date: ${formatDateTimeStamp(
              paid.confirmation_date,
            )}`}
          </MediumText>
          {/*<MediumText style={{ marginTop: 10 }}>
            {`Transfer Date: ${formatDateTimeStamp(paid.transfer_date)}`}
            </MediumText>*/}
          <Image
            source={{ uri: paid.image }}
            style={{ width: '100%', height: 260, marginTop: 10 }}
            resizeMode={'cover'}
          />
        </Card>
      );
    }

    return <View />;
  }

  updateOrderSuccess() {
    const { navigation } = this.props;
    const { params } = this.props.navigation.state;

    this.setState({ updateModal: false });
    if (params && params.onBack) {
      params.onBack();
      navigation.goBack();
    }
  }

  showUpdateModal() {
    this.setState({ updateModal: true });
  }

  hideUpdateModal() {
    this.setState({ updateModal: false });
  }

  setTrackingNumber(value) {
    this.setState({ trackingNumber: value });
  }

  setOrderStatus(value) {
    this.setState({ orderStatus: value });
  }

  renderDetailOrder() {
    const { data } = this.state;
    if (data) {
      return (
        <Card style={{ margin: 8 }}>
          <View style={{ display: 'flex' }}>
            <LargeText bold={true}>Order Number: {data.order_number}</LargeText>

            <SmallText style={{ marginTop: 10 }}>{`Date: ${formatDateTimeStamp(
              data.order_date,
            )}`}</SmallText>
            {data.user ? (
              <MediumText color={colors.ORANGE_COLOR}>
                {data.user.name} - {data.user.type} - {data.approval}
              </MediumText>
            ) : (
              <View />
            )}
            <MediumText color={colors.ORANGE_COLOR} style={{ marginTop: 10 }}>
              {data.status}
            </MediumText>
          </View>
        </Card>
      );
    }

    return null;
  }

  // renderDetailsBank() {
  //   const { data } = this.state;
  //   // console.log(data);
  //   if (data && data.payment) {
  //     return (
  //       <Card style={{ margin: 8 }}>
  //         <View style={{ display: 'flex', alignItems: 'center' }}>
  //           <LargeText>{`${data.payment.bank_code} ${
  //             data.payment.bank_branch
  //           }`}</LargeText>
  //           <ExtraLargeText style={{ fontWeight: 'bold' }}>
  //             {data.payment.bank_account_number}
  //           </ExtraLargeText>
  //           {/* <ButtonText
  //             onPress={this.copyToClipboard}
  //             style={{
  //               borderColor: colors.GOLD_COLOR,
  //               borderWidth: 1,
  //               padding: 5,
  //               width: 80,
  //               borderRadius: 2,
  //               alignItems: 'center',
  //             }}
  //           >
  //             <NormalText
  //               onPress={this.copyToClipboard}
  //               style={{ color: colors.GOLD_COLOR }}
  //             >
  //               Salin Kode
  //             </NormalText>
  //           </ButtonText> */}
  //           <MediumText style={{ marginTop: 8 }}>
  //             Account: {data.payment.account_holder_name}
  //           </MediumText>
  //         </View>
  //         {/* <View>{this.howToPay()}</View> */}
  //       </Card>
  //     );
  //   }

  //   return null;
  // }

  // howToPay() {
  //   const { howtopay, data, itemHowtopayExpand } = this.state;
  //   // console.log(data);
  //   if (howtopay && howtopay.length) {
  //     const htmlStyle = `<Style>ol{margin-left: -20px;} li,p {font-size: 12px;}</Style>`;
  //     return howtopay.map((item, index) => {
  //       if (data.payment.bank_code === item.code) {
  //         const expand = () => {
  //           this.setState({ itemHowtopayExpand: item });
  //         };
  //         return (
  //           <View key={index}>
  //             <TouchableOpacity onPress={expand}>
  //               <View
  //                 style={{
  //                   flexDirection: 'row',
  //                   justifyContent: 'space-between',
  //                   borderBottomWidth: 0.3,
  //                   marginTop: 8,
  //                 }}
  //               >
  //                 <NormalText>{item.platform}</NormalText>

  //                 <Ionicons
  //                   name={
  //                     item === itemHowtopayExpand
  //                       ? 'ios-arrow-up'
  //                       : 'ios-arrow-down'
  //                   }
  //                   size={22}
  //                 />
  //               </View>
  //             </TouchableOpacity>

  //             {item === itemHowtopayExpand ? (
  //               <AutoResizeHeightWebView
  //                 defaultHeight={120}
  //                 style={{ backgroundColor: 'white', width: '100%' }}
  //                 AnimationDuration={500}
  //                 source={{ html: htmlStyle + item.text }}
  //                 // scalesPageToFit={false}
  //                 needAnimate={true}
  //                 needAutoResetHeight={true}
  //               />
  //             ) : (
  //               // <WebView
  //               //   style={{ height: 180, width: '100%' }}
  //               //   automaticallyAdjustContentInsets={true}
  //               //   source={{ html: htmlStyle + item.text }}
  //               //   scalesPageToFit={true}
  //               // />
  //               <View />
  //             )}
  //           </View>
  //         );
  //       }
  //       return null;
  //     });
  //   }
  //   return null;
  // }

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
              ? `${address.address}, ${address.district.subdistrict_name}, ${
                  address.city.city_name
                }, ${address.province.province}, ${address.postal}`
              : '-'}
          </MediumText>
        </Card>
      );
    }

    return null;
  }

  renderListProducts() {
    const { data } = this.state;
    if (data && data.order) {
      const products = data.order;
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
    const productImage = item.images + '';
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
                {item.name}
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
    if (data && data.shipping) {
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
    if (data) {
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
