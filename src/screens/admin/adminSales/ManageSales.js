// @@flow

import { Icon } from 'react-native-elements';
import { inject, observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import _ from 'lodash';
import { AwareScroll } from '../../../components/AwareScroll';
import { Card } from '../../../components/Card';
import { Loading } from '../../../components/modal/Loading';
import { HeaderText } from '../../../components/texts/HeaderText';
import { MediumText } from '../../../components/texts/MediumText';
import { SmallText } from '../../../components/texts/SmallText';
import { ViewCenter } from '../../../components/ViewCenter';
import { apiGetSales } from '../../../utils/api';
import { colors } from '../../../utils/Colors';
import TextField from '../../../components/TextInput';

// interface IProps extends NavigationScreenProps {
//   homeStore;
// }

// interface IState {
//   loading: boolean;
//   salesList;
// }

@inject('homeStore')
@observer
class ManageSales extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, salesList: null };

    this.navigateAddSales = this.navigateAddSales.bind(this);

    this.initData = this.initData.bind(this);
    this.itemOnchangeText = this.itemOnchangeText.bind(this);

    props.navigation.setParams({
      onPressRight: this.initData,
    });
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params;
    const right = () => {
      const onPress = () => {
        if (params && params.onPressRight) params.onPressRight();
      };
      return (
        <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 8 }}>
          <Icon
            type={'material'}
            color={colors.PRIMARY_COLOR}
            name="cached"
            size={24}
          />
        </TouchableOpacity>
      );
    };
    return {
      // headerLeft: <ButtonNavBack navigation={navigation} />,
      headerTitle: <HeaderText>{'Manage Sales'}</HeaderText>,
      headerRight: right(),
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
      const response = await apiGetSales();
      if (response.data.length) {
        this.setState({ salesList: response.data.reverse() });
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
      <View>
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
            placeholder={'Find sales'}
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
        <AwareScroll>
          <View
            style={{
              paddingHorizontal: 8,
              paddingVertical: 8,
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={this.navigateAddSales}
            >
              <View style={localStyle.topButtonStyle}>
                <MediumText color={colors.WHITE_COLOR}>
                  {'Add new sales'}
                </MediumText>
                <Icon
                  type={'material-community'}
                  color={colors.WHITE_COLOR}
                  name="plus"
                  size={28}
                />
              </View>
            </TouchableOpacity>
          </View>
          {this.renderSales()}
          <Loading visible={loading} />
        </AwareScroll>
      </View>
    );
  }

  async initData() {
    try {
      this.setState({ loading: true });
      const response = await apiGetSales();
      if (response.data.length) {
        this.setState({ salesList: response.data.reverse() });
      }
    } catch (error) {
      // return null;
    } finally {
      this.setState({ loading: false });
    }
  }

  renderSales() {
    const { salesList, filteredItemValue } = this.state;

    if (filteredItemValue && filteredItemValue.length) {
      return filteredItemValue.map((sales, index) => {
        return (
          <TouchableOpacity
            key={sales.id_user}
            style={{ padding: 8, width: '100%', height: 90 }}
          >
            <Card>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                {/* <Image
                    style={{ width: 70, height: 70 }}
                    source={{
                      uri: productImage,
                    }}
                  /> */}
                <View style={{ flex: 1, paddingHorizontal: 8 }}>
                  <MediumText style={{ color: '#5c5c5c' }}>
                    {sales.name}
                  </MediumText>

                  <SmallText>Phonenumber: {sales.phone}</SmallText>
                  <SmallText>Email: {sales.email}</SmallText>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        );
      });
    }

    if (salesList && salesList.length) {
      return salesList.map(sales => {
        return (
          <TouchableOpacity
            key={sales.id_user}
            style={{ padding: 8, width: '100%', height: 90 }}
          >
            <Card>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                {/* <Image
                  style={{ width: 70, height: 70 }}
                  source={{
                    uri: productImage,
                  }}
                /> */}
                <View style={{ flex: 1, paddingHorizontal: 8 }}>
                  <MediumText style={{ color: '#5c5c5c' }}>
                    {sales.name}
                  </MediumText>

                  <SmallText>Phonenumber: {sales.phone}</SmallText>
                  <SmallText>Email: {sales.email}</SmallText>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        );
      });
    }

    return (
      <ViewCenter style={{ flex: 1 }}>
        <MediumText>{'Empty'}</MediumText>
      </ViewCenter>
    );
  }

  navigateAddSales() {
    const { navigation } = this.props;

    navigation.navigate('AddSales', {
      onBack: async () => {
        try {
          this.setState({ loading: true });
          const response = await apiGetSales();
          if (response.data.length) {
            this.setState({ salesList: response.data.reverse() });
          }
        } catch (error) {
          // return null;
        } finally {
          this.setState({ loading: false });
        }
      },
    });
  }

  itemOnchangeText(itemValue) {
    this.setState({
      itemValue,
    });

    const filteredItemValue = _.filter(this.state.salesList, item => {
      return item.name.toLowerCase().indexOf(itemValue.toLowerCase()) > -1;
    });

    this.setState({
      filteredItemValue,
    });
  }
}

const localStyle = StyleSheet.create({
  topButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    padding: 8,
    backgroundColor: colors.PRIMARY_COLOR,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  buttonStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 8,
    height: 90,
    backgroundColor: colors.WHITE_COLOR,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});

export default ManageSales;
