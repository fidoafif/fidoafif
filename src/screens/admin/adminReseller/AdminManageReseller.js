// @@flow

import { inject, observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import _ from 'lodash';
import { AwareScroll } from '../../../components/AwareScroll';
import { Card } from '../../../components/Card';
import { Loading } from '../../../components/modal/Loading';
import { HeaderText } from '../../../components/texts/HeaderText';
import { MediumText } from '../../../components/texts/MediumText';
import { SmallText } from '../../../components/texts/SmallText';
import { ViewCenter } from '../../../components/ViewCenter';
import { apiGetBecomeAgent } from '../../../utils/api';
import { Icon } from 'react-native-elements';
import { colors } from '../../../utils/Colors';
import TextField from '../../../components/TextInput';
import { apiGetRequestedReseller } from '../../../utils/api/apiReseller';

// interface IProps extends NavigationScreenProps {
//   homeStore;
// }

// interface IState {
//   loading: boolean;
//   resellerList;
// }

@inject('homeStore')
@observer
class AdminManageReseller extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, resellerList: null };

    this.itemOnchangeText = this.itemOnchangeText.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      // headerLeft: <ButtonNavBack navigation={navigation} />,
      headerTitle: <HeaderText>{'Manage Reseller'}</HeaderText>,
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
      const response = await apiGetRequestedReseller();

      if (response.data.length) {
        this.setState({ resellerList: response.data.reverse() });
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
            placeholder={'Find reseller'}
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
          {this.renderList()}
          <Loading visible={loading} />
        </AwareScroll>
      </View>
    );
  }

  renderList() {
    const { resellerList, filteredItemValue } = this.state;

    if (filteredItemValue && filteredItemValue.length) {
      return filteredItemValue.map((item, index) => {
        const onPress = () => {
          this.props.navigation.push('DetailAdminReseller', {
            data: item,
            onBack: async () => {
              try {
                this.setState({ loading: true });
                const response = await apiGetRequestedReseller();
                if (response.data.length) {
                  this.setState({ resellerList: response.data.reverse() });
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
            style={{ padding: 8, width: '100%', height: 90 }}
            onPress={onPress}
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
                    {item.name}
                  </MediumText>

                  <SmallText>Phonenumber: {item.phone}</SmallText>
                  <SmallText>Email: {item.email}</SmallText>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        );
      });
    }

    if (resellerList && resellerList.length) {
      return resellerList.map((item, index) => {
        const onPress = () => {
          this.props.navigation.push('DetailAdminReseller', {
            data: item,
            onBack: async () => {
              try {
                this.setState({ loading: true });
                const response = await apiGetRequestedReseller();
                if (response.data.length) {
                  this.setState({ resellerList: response.data.reverse() });
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
            style={{ padding: 8, width: '100%', height: 90 }}
            onPress={onPress}
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
                    {item.name}
                  </MediumText>

                  <SmallText>Phonenumber: {item.phone}</SmallText>
                  <SmallText>Email: {item.email}</SmallText>
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

  itemOnchangeText(itemValue) {
    this.setState({
      itemValue,
    });

    const filteredItemValue = _.filter(this.state.resellerList, item => {
      return item.name.toLowerCase().indexOf(itemValue.toLowerCase()) > -1;
    });

    this.setState({
      filteredItemValue,
    });
  }
}

export default AdminManageReseller;
