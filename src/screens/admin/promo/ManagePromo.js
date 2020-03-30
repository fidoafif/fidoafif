// @@flow

import { Icon } from 'react-native-elements';
import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  NavigationScreenProps,
  NavigationStackScreenOptions,
} from 'react-navigation';
import { AwareScroll } from '../../../components/AwareScroll';
import { Card } from '../../../components/Card';
import { Loading } from '../../../components/modal/Loading';
import { HeaderText } from '../../../components/texts/HeaderText';
import { MediumText } from '../../../components/texts/MediumText';
import { NormalText } from '../../../components/texts/NormalText';
import { ViewCenter } from '../../../components/ViewCenter';
import { apiListPromo } from '../../../utils/api';
import { colors } from '../../../utils/Colors';
import { formatThousand } from '../../../utils/FormatThousand';

// interface IProps extends NavigationScreenProps {}

// interface IState {
//   promos;
//   loading: boolean;
// }

export default class ManagePromo extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, promos: null };

    this.navigateAddPromo = this.navigateAddPromo.bind(this);
    this.renderPromos = this.renderPromos.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      // headerLeft: <ButtonNavBack navigation={navigation} />,
      headerTitle: <HeaderText>{'Manage Promo'}</HeaderText>,
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
      // console.log('response');
      const response = await apiListPromo();
      // console.log('response', response);
      if (response.data.length) {
        this.setState({ promos: response.data });
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
            paddingHorizontal: 8,
            paddingVertical: 8,
            flexDirection: 'row',
          }}
        >
          <TouchableOpacity style={{ flex: 1 }} onPress={this.navigateAddPromo}>
            <View style={localStyle.topButtonStyle}>
              <MediumText color={colors.WHITE_COLOR}>
                {'Add new promo'}
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
        {this.renderPromos()}
        <Loading visible={loading} />
      </AwareScroll>
    );
  }

  renderPromos() {
    const { promos } = this.state;
    const { navigation } = this.props;

    if (promos && promos.length) {
      return promos.map(promo => {
        const product = promo.product;
        const productImage =
          promo.product && promo.product.images
            ? promo.product.images.substring(1)
            : 'https://www.hygeiahmo.com/wp-content/themes/uplift/images/default-thumb.png';
        const onPress = () => {
          navigation.navigate('EditPromo', {
            data: promo,
            onBack: async () => {
              try {
                this.setState({ loading: true });
                const response = await apiListPromo();
                // console.log(response);
                if (response.data.length) {
                  this.setState({ promos: response.data });
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
            key={promo.id_promo}
            onPress={onPress}
            style={{ padding: 8, width: '100%', height: 120 }}
          >
            <Card>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Image
                  style={{ width: 70, height: 70 }}
                  source={{
                    uri: productImage,
                  }}
                />
                <View style={{ flex: 1, paddingHorizontal: 8 }}>
                  <MediumText style={{ color: '#5c5c5c' }}>
                    {product.name}
                  </MediumText>
                  <NormalText
                    style={{
                      textDecorationLine: 'line-through',
                    }}
                  >
                    Rp. {formatThousand(Number(product.price))}
                  </NormalText>
                  <MediumText
                    style={{
                      color: '#5c5c5c',
                      fontWeight: 'bold',
                      flexGrow: 1,
                    }}
                  >
                    Rp. {formatThousand(Number(promo.price))}
                  </MediumText>
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

  navigateAddPromo() {
    const { navigation } = this.props;

    navigation.navigate('AddPromo', {
      onBack: async () => {
        try {
          this.setState({ loading: true });
          const response = await apiListPromo();
          // console.log(response);
          if (response.data.length) {
            this.setState({ promos: response.data });
          }
        } catch (error) {
          // return null;
        } finally {
          this.setState({ loading: false });
        }
      },
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
