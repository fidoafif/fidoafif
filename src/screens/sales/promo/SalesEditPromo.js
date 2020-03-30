// @@flow

import { Icon } from 'react-native-elements';
import React, { Component } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  NavigationScreenProps,
  NavigationStackScreenOptions,
} from 'react-navigation';
import { AwareScroll } from '../../../components/AwareScroll';
import { Button } from '../../../components/buttons/Button';
import { ButtonNavBack } from '../../../components/buttons/ButtonNavBack';
import { Loading } from '../../../components/modal/Loading';
import { ProductPicker } from '../../../components/pickers/ProductPicker';
import TextFieldDefault from '../../../components/textField/TextFieldDefault';
import { HeaderText } from '../../../components/texts/HeaderText';
import { ViewCenter } from '../../../components/ViewCenter';
import { apiDeletePromo, apiEditPromo } from '../../../utils/api';
import { colors } from '../../../utils/Colors';

// interface IProps extends NavigationScreenProps {}

// interface IState {
//   loading: boolean;
//   id_promo;
//   price;
//   product;
// }

export default class SalesEditPromo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      product: null,
      price: '',
      id_promo: '',
    };

    this.editPromo = this.editPromo.bind(this);
    this.deletePromo = this.deletePromo.bind(this);
    this.renderHeaderRight = this.renderHeaderRight.bind(this);
    this.successEditProduct = this.successEditProduct.bind(this);
    this.setPrice = this.setPrice.bind(this);
    this.setProduct = this.setProduct.bind(this);

    props.navigation.setParams({ headerRight: this.renderHeaderRight });
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      headerLeft: <ButtonNavBack navigation={navigation} />,
      headerTitle: <HeaderText>{'Edit Promo'}</HeaderText>,
      headerRight:
        params && params.headerRight ? params.headerRight() : <View />,
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
      const promo = params.data;
      this.setState({
        id_promo: promo.id_promo,
        product: promo.product,
        price: promo.price,
      });
    }
  }

  render() {
    const { loading } = this.state;
    return (
      <AwareScroll>
        <ViewCenter style={styles.content}>
          <ProductPicker
            label={'Promo'}
            onSelect={this.setProduct}
            value={this.state.product}
          />
          <TextFieldDefault
            placeholder={'Price'}
            inputOnChange={this.setPrice}
            keyboardType={'numeric'}
            value={this.state.price}
          />
          <Button label={'Edit Promo'} onPress={this.editPromo} />
        </ViewCenter>
        <Loading visible={loading} />
      </AwareScroll>
    );
  }

  renderHeaderRight() {
    const onPress = async () => {
      await this.deletePromo();
    };
    return (
      <View>
        <TouchableOpacity onPress={onPress}>
          <Icon
            type={'material-community'}
            color={colors.NEGATIVE_COLOR}
            name="delete"
            size={28}
            style={{ marginRight: 8 }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  setPrice(value) {
    this.setState({ price: value });
  }

  setProduct(value) {
    this.setState({ product: value });
  }

  async editPromo() {
    const { product, price, id_promo } = this.state;
    if (product && price && id_promo) {
      try {
        this.setState({ loading: true });
        const response = await apiEditPromo(
          id_promo,
          product.id_product,
          price,
        );
        if (response && Number(response.status) === 201) {
          this.successEditProduct();
        }
      } catch (error) {
        Alert.alert('Error', 'Edit Promo Failed');
      } finally {
        this.setState({ loading: false });
      }
    } else {
      Alert.alert('Error', 'Please complete the form');
    }
  }

  async deletePromo() {
    const { id_promo } = this.state;
    if (id_promo) {
      try {
        this.setState({ loading: true });
        const response = await apiDeletePromo(id_promo);

        if (response && Number(response.status) === 200) {
          this.successEditProduct();
        }
      } catch (error) {
        Alert.alert('Error', 'Delete Promo Failed');
      } finally {
        this.setState({ loading: false });
      }
    } else {
      Alert.alert('Error', 'Cannot identify this promo');
    }
  }

  successEditProduct() {
    const { navigation } = this.props;
    const { params } = this.props.navigation.state;

    if (params && params.onBack) {
      params.onBack();
      navigation.goBack();
    }
  }
}

const styles = StyleSheet.create({
  content: {
    marginVertical: 20,
    marginBottom: 70,
    paddingHorizontal: 16,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
