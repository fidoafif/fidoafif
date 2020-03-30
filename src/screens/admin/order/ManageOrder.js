// @@flow

import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import _ from 'lodash';
import { AwareScroll } from '../../../components/AwareScroll';
import { Card } from '../../../components/Card';
import { Loading } from '../../../components/modal/Loading';
import { HeaderText } from '../../../components/texts/HeaderText';
import { MediumText } from '../../../components/texts/MediumText';
import { NormalText } from '../../../components/texts/NormalText';
import { ViewCenter } from '../../../components/ViewCenter';
import { apiListTransaction } from '../../../utils/api';
import { colors } from '../../../utils/Colors';
import { formatDateTimeStamp } from '../../../utils/FormatDate';
import TextField from '../../../components/TextInput';
import { Icon } from 'react-native-elements';

// interface IProps extends NavigationScreenProps {}

// interface IState {
//   orders;
//   loading: boolean;
// }

export default class ManageOrder extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, orders: null, itemValue: '' };

    this.renderOrders = this.renderOrders.bind(this);
    this.itemOnchangeText = this.itemOnchangeText.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      // headerLeft: <ButtonNavBack navigation={navigation} />,
      headerTitle: <HeaderText>{'Manage Order'}</HeaderText>,
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
    try {
      this.setState({ loading: true });
      const response = await apiListTransaction();

      if (response.data.length) {
        this.setState({ orders: response.data });
      }
    } catch (error) {
      // return null;
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading } = this.state;

    return (
      <AwareScroll>
        <View
          style={{
            paddingVertical: 8,
            backgroundColor: colors.BACKGROUND_FIELD_COLOR,
            height: 40,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderRadius: 4,
            marginTop: 16,
            marginHorizontal: 8,
          }}
        >
          <TextField
            value={this.state.itemValue}
            placeholder={'Find order'}
            onChangeText={this.itemOnchangeText}
            style={{ flex: 1, height: 40 }}
          />
          {this.state.itemValue !== '' && (
            <TouchableOpacity
              style={{ padding: 8 }}
              onPress={() => {
                this.setState({ itemValue: '', filteredItemValue: null });
              }}
            >
              <Icon
                type={'material'}
                color={colors.NEGATIVE_COLOR}
                name="clear"
                size={24}
              />
            </TouchableOpacity>
          )}
        </View>
        {this.renderOrders()}
        <Loading visible={loading} />
      </AwareScroll>
    );
  }

  renderOrders() {
    const { orders, filteredItemValue } = this.state;
    const { navigation } = this.props;

    if (filteredItemValue && filteredItemValue.length) {
      return filteredItemValue.map((order, index) => {
        const onPress = () => {
          navigation.navigate('DetailAdminOrder', {
            data: order,
            onBack: async () => {
              try {
                this.setState({ loading: true, orders: null });
                const response = await apiListTransaction();

                if (response.data.length) {
                  this.setState({ orders: response.data });
                }
              } catch (error) {
                // return null;
              } finally {
                this.setState({ loading: false });
              }
            },
          });
        };
        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={{ padding: 8, width: '100%', height: 120 }}
          >
            <Card>
              <View style={{ display: 'flex' }}>
                <NormalText bold={true}>
                  Order Number: {order.order_number}
                </NormalText>
                <NormalText bold={true}>{`Date: ${formatDateTimeStamp(
                  order.order_date,
                )}`}</NormalText>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    display: 'flex',
                    marginTop: 10,
                  }}
                >
                  <NormalText bold={true}>Status </NormalText>
                  <NormalText color={colors.PRIMARY_COLOR}>
                    {order.status}
                  </NormalText>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        );
      });
    }

    if (orders && orders.length) {
      return orders.map(order => {
        const onPress = () => {
          navigation.navigate('DetailAdminOrder', {
            data: order,
            onBack: async () => {
              try {
                this.setState({ loading: true, orders: null });
                const response = await apiListTransaction();

                if (response.data.length) {
                  this.setState({ orders: response.data });
                }
              } catch (error) {
                // return null;
              } finally {
                this.setState({ loading: false });
              }
            },
          });
        };
        return (
          <TouchableOpacity
            key={order.id_transaction}
            onPress={onPress}
            style={{ padding: 8, width: '100%', height: 120 }}
          >
            <Card>
              <View style={{ display: 'flex' }}>
                <NormalText bold={true}>
                  Order Number: {order.order_number}
                </NormalText>
                <NormalText bold={true}>{`Date: ${formatDateTimeStamp(
                  order.order_date,
                )}`}</NormalText>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    display: 'flex',
                    marginTop: 10,
                  }}
                >
                  <NormalText bold={true}>Status </NormalText>
                  <NormalText color={colors.PRIMARY_COLOR}>
                    {order.status}
                  </NormalText>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        );
      });
    }
    return (
      <ViewCenter style={{ flex: 1, height: '100%' }}>
        <MediumText>{'Empty'}</MediumText>
      </ViewCenter>
    );
  }

  itemOnchangeText(itemValue) {
    this.setState({
      itemValue,
    });

    const filteredItemValue = _.filter(this.state.orders, item => {
      return (
        item.order_number.toLowerCase().indexOf(itemValue.toLowerCase()) > -1
      );
    });

    this.setState({
      filteredItemValue,
    });
  }
}
