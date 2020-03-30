// @@flow

import React, { Component } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import {
  NavigationScreenProps,
  NavigationStackScreenOptions,
} from 'react-navigation';
import { AwareScroll } from '../../../components/AwareScroll';
import { Button } from '../../../components/buttons/Button';
import { ButtonNavBack } from '../../../components/buttons/ButtonNavBack';
import { Loading } from '../../../components/modal/Loading';
import { CityPicker } from '../../../components/pickers/CityPicker';
import { ProductPicker } from '../../../components/pickers/ProductPicker';
import TextFieldDefault from '../../../components/textField/TextFieldDefault';
import { HeaderText } from '../../../components/texts/HeaderText';
import { ViewCenter } from '../../../components/ViewCenter';
import { apiCreatePromo } from '../../../utils/api';

// interface IProps extends NavigationScreenProps {}

// interface IState {
//   loading: boolean;
//   price;
//   product;
//   city;
// }

export default class AddPromo extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, product: null, city: null, price: '' };

    this.addPromo = this.addPromo.bind(this);
    this.successAddPromo = this.successAddPromo.bind(this);
    this.setPrice = this.setPrice.bind(this);
    this.setCity = this.setCity.bind(this);
    this.setProduct = this.setProduct.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <ButtonNavBack navigation={navigation} />,
      headerTitle: <HeaderText>{'Add Product'}</HeaderText>,
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

  render() {
    const { loading } = this.state;

    return (
      <AwareScroll>
        <ViewCenter style={styles.content}>
          <CityPicker
            label={'City'}
            onSelect={this.setCity}
            value={this.state.city}
          />
          <ProductPicker
            label={'Product'}
            onSelect={this.setProduct}
            value={this.state.product}
          />
          <TextFieldDefault
            placeholder={'Price'}
            inputOnChange={this.setPrice}
            keyboardType={'numeric'}
          />
          <Button label={'Add Promo'} onPress={this.addPromo} />
        </ViewCenter>
        <Loading visible={loading} />
      </AwareScroll>
    );
  }

  setPrice(value) {
    this.setState({ price: value });
  }

  setProduct(value) {
    this.setState({ product: value });
  }

  setCity(value) {
    this.setState({ city: value });
  }

  async addPromo() {
    const { city, product, price } = this.state;
    if (city && product && price) {
      try {
        this.setState({ loading: true });
        const response = await apiCreatePromo(
          product.id_product,
          price,
          city.id_city,
        );
        if (response && Number(response.status) === 201) {
          this.successAddPromo();
        }
      } catch (error) {
        // console.log(error);
        Alert.alert('Error', 'Add Promo Failed');
      } finally {
        this.setState({ loading: false });
      }
    } else {
      Alert.alert('Error', 'Please complete the form');
    }
  }

  successAddPromo() {
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
