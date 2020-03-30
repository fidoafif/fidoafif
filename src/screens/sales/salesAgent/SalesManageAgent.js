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
import TextField from '../../../components/TextInput';
import { colors } from '../../../utils/Colors';
import { Icon } from 'react-native-elements';

// interface IProps extends NavigationScreenProps {
//   homeStore;
// }

// interface IState {
//   loading: boolean;
//   agentList;
// }

@inject('homeStore')
@observer
class SalesManageAgent extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, agentList: null, itemValue: '' };

    this.itemOnchangeText = this.itemOnchangeText.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      // headerLeft: <ButtonNavBack navigation={navigation} />,
      headerTitle: <HeaderText>{'Manage Agent'}</HeaderText>,
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
      const response = await apiGetBecomeAgent();

      if (response.data.length) {
        this.setState({ agentList: response.data.reverse() });
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
            placeholder={'Find agent'}
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
        {this.renderList()}
        <Loading visible={loading} />
      </AwareScroll>
    );
  }

  renderList() {
    const { agentList, filteredItemValue } = this.state;

    if (filteredItemValue && filteredItemValue.length) {
      return filteredItemValue.map(agent => {
        const onPress = () => {
          this.props.navigation.push('DetailSalesAgent', {
            data: agent,
            onBack: async () => {
              try {
                this.setState({ loading: true });
                const response = await apiGetBecomeAgent();
                if (response.data.length) {
                  this.setState({ agentList: response.data.reverse() });
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
            key={agent.id_become_agent}
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
                    {agent.name}
                  </MediumText>

                  <SmallText>Phonenumber: {agent.phone}</SmallText>
                  <SmallText>Email: {agent.email}</SmallText>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        );
      });
    }

    if (agentList && agentList.length) {
      return agentList.map(agent => {
        const onPress = () => {
          this.props.navigation.push('DetailSalesAgent', {
            data: agent,
            onBack: async () => {
              try {
                this.setState({ loading: true });
                const response = await apiGetBecomeAgent();
                if (response.data.length) {
                  this.setState({ agentList: response.data.reverse() });
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
            key={agent.id_become_agent}
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
                    {agent.name}
                  </MediumText>

                  <SmallText>Phonenumber: {agent.phone}</SmallText>
                  <SmallText>Email: {agent.email}</SmallText>
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

    const filteredItemValue = _.filter(this.state.agentList, item => {
      return item.name.toLowerCase().indexOf(itemValue.toLowerCase()) > -1;
    });

    this.setState({
      filteredItemValue,
    });
  }
}

export default SalesManageAgent;
