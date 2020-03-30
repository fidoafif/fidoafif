// @@flow

import { Icon } from 'react-native-elements';
import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import _ from 'lodash';
import { AwareScroll } from '../../../components/AwareScroll';
import { Card } from '../../../components/Card';
import { Loading } from '../../../components/modal/Loading';
import { HeaderText } from '../../../components/texts/HeaderText';
import { MediumText } from '../../../components/texts/MediumText';
import { SmallText } from '../../../components/texts/SmallText';
import { ViewCenter } from '../../../components/ViewCenter';
import { apiGetProducts } from '../../../utils/api';
import { colors } from '../../../utils/Colors';
import { formatThousand } from '../../../utils/FormatThousand';
import TextField from '../../../components/TextInput';

// interface IProps extends NavigationScreenProps {}

// interface IState {
//   loading: boolean;
//   products;
// }

class ManageProduct extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, products: null, itemValue: '' };

    this.navigateAddProduct = this.navigateAddProduct.bind(this);
    this.renderProducts = this.renderProducts.bind(this);
    this.itemOnchangeText = this.itemOnchangeText.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      // headerLeft: <ButtonNavBack navigation={navigation} />,
      headerTitle: <HeaderText>{'Manage Product'}</HeaderText>,
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
      const response = await apiGetProducts();

      if (response.data.length) {
        this.setState({ products: response.data });
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
            placeholder={'Find product'}
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
              onPress={this.navigateAddProduct}
            >
              <View style={localStyle.topButtonStyle}>
                <MediumText color={colors.WHITE_COLOR}>
                  {'Add new product'}
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

          {this.renderProducts()}
          <Loading visible={loading} />
        </AwareScroll>
      </View>
    );
  }

  renderProducts() {
    const { products, filteredItemValue } = this.state;
    const { navigation } = this.props;

    if (filteredItemValue && filteredItemValue.length) {
      return filteredItemValue.map((product, index) => {
        let productImage =
          'https://i2.wp.com/mercurytwenty.com/wp-content/uploads/2016/10/default-placeholder.png?fit=600%2C600';

        if (product.images && product.images.length) {
          for (const element of product.images) {
            if (element) {
              productImage = element;
              break;
            }
          }
        }

        const onPress = () => {
          navigation.navigate('EditProduct', {
            product,
            onBack: async () => {
              try {
                this.setState({ loading: true, products: null });
                const response = await apiGetProducts();

                if (response.data.length) {
                  this.setState({ products: response.data });
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
            style={{ padding: 8, width: '100%', height: 140 }}
            onPress={onPress}
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
                  <MediumText
                    style={{
                      color: '#5c5c5c',
                      fontWeight: 'bold',
                      flexGrow: 1,
                    }}
                  >
                    Jawa: Rp. {formatThousand(Number(product.harga_jawa))}
                  </MediumText>
                  <MediumText
                    style={{
                      color: '#5c5c5c',
                      fontWeight: 'bold',
                      flexGrow: 1,
                    }}
                  >
                    Non Jawa: Rp.{' '}
                    {formatThousand(Number(product.harga_luar_jawa))}
                  </MediumText>
                  <SmallText>
                    Weight {formatThousand(Number(product.weight))}
                  </SmallText>
                  <SmallText>
                    Stock {formatThousand(Number(product.stock))}
                  </SmallText>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        );
      });
    }

    if (products && products.length) {
      return products.map(product => {
        let productImage =
          'https://i2.wp.com/mercurytwenty.com/wp-content/uploads/2016/10/default-placeholder.png?fit=600%2C600';

        if (product.images && product.images.length) {
          for (const element of product.images) {
            if (element) {
              productImage = element;
              break;
            }
          }
        }

        const onPress = () => {
          navigation.navigate('EditProduct', {
            product,
            onBack: async () => {
              try {
                this.setState({ loading: true, products: null });
                const response = await apiGetProducts();

                if (response.data.length) {
                  this.setState({ products: response.data });
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
            key={product.id_product}
            style={{ padding: 8, width: '100%', height: 140 }}
            onPress={onPress}
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
                  <MediumText
                    style={{
                      color: '#5c5c5c',
                      fontWeight: 'bold',
                      flexGrow: 1,
                    }}
                  >
                    Jawa: Rp. {formatThousand(Number(product.harga_jawa))}
                  </MediumText>
                  <MediumText
                    style={{
                      color: '#5c5c5c',
                      fontWeight: 'bold',
                      flexGrow: 1,
                    }}
                  >
                    Non Jawa: Rp.{' '}
                    {formatThousand(Number(product.harga_luar_jawa))}
                  </MediumText>
                  <SmallText>
                    Weight {formatThousand(Number(product.weight))}
                  </SmallText>
                  <SmallText>
                    Stock {formatThousand(Number(product.stock))}
                  </SmallText>
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

  navigateAddProduct() {
    const { navigation } = this.props;

    navigation.navigate('AddProduct', {
      onBack: async () => {
        try {
          this.setState({ loading: true, products: null });
          const response = await apiGetProducts();

          if (response.data.length) {
            this.setState({ products: response.data });
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

    const filteredItemValue = _.filter(this.state.products, item => {
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

export default ManageProduct;
