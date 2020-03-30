// @@flow

import { inject, observer } from 'mobx-react/native';
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
import { CategoryPicker } from '../../../components/pickers/CategoryPicker';
import TextFieldDefault from '../../../components/textField/TextFieldDefault';
import { HeaderText } from '../../../components/texts/HeaderText';
import { ViewCenter } from '../../../components/ViewCenter';
import { apiEditProduct } from '../../../utils/api';

// interface IProps extends NavigationScreenProps {
//   editProductStore;
// }

// interface IState {
//   loading: boolean;
//   products;
// }

@inject('editProductStore')
@observer
class EditProduct extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, products: null };

    this.editProduct = this.editProduct.bind(this);
    this.successEditProduct = this.successEditProduct.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <ButtonNavBack navigation={navigation} />,
      headerTitle: <HeaderText>{'Edit Product'}</HeaderText>,
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
    const store = this.props.editProductStore;

    if (params && params.product) {
      await store.setProduct(params.product);
    }
  }

  render() {
    const { loading } = this.state;
    const store = this.props.editProductStore;
    return (
      <AwareScroll>
        <ViewCenter style={styles.content}>
          {/* <ImageField placeholder={'Images product'} /> */}
          <TextFieldDefault
            placeholder={'Name'}
            inputOnChange={store.setName}
            value={store.name}
          />
          <TextFieldDefault
            placeholder={'Sku'}
            inputOnChange={store.setSku}
            value={store.sku}
          />
          <TextFieldDefault
            placeholder={'Description'}
            inputOnChange={store.setDescription}
            value={store.description}
          />
          <CategoryPicker
            label={'Category'}
            onSelect={store.setIdCategory}
            value={store.category}
          />
          <TextFieldDefault
            placeholder={'Weight'}
            inputOnChange={store.setWeight}
            value={store.weight}
          />
          <TextFieldDefault
            placeholder={'Stock'}
            inputOnChange={store.setStock}
            value={store.stock}
          />
          <TextFieldDefault
            placeholder={'Price'}
            inputOnChange={store.setPrice}
            value={store.price}
          />
          <TextFieldDefault
            placeholder={'HET'}
            inputOnChange={store.setHetPrice}
            value={store.het}
          />

          <TextFieldDefault
            placeholder={'Jawa Price'}
            inputOnChange={store.setJavaPrice}
            value={store.javaPrice}
          />
          <Button label={'Edit Product'} onPress={this.editProduct} />
        </ViewCenter>
        <Loading visible={loading} />
      </AwareScroll>
    );
  }

  async editProduct() {
    const store = this.props.editProductStore;

    try {
      this.setState({ loading: true });
      const response = await apiEditProduct(
        store.id,
        store.name,
        store.sku,
        store.description,
        store.id_category,
        store.weight,
        store.stock,
        store.price,
        store.javaPrice,
      );

      if (response && Number(response.status) === 201) {
        store.clearStore();
        this.successEditProduct();
      }
    } catch (error) {
      Alert.alert('Error', 'Edit Product Failed');
    } finally {
      this.setState({ loading: false });
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
    // marginHorizontal: 50,
    // marginVertical: 70,
    marginVertical: 20,
    marginBottom: 70,
    paddingHorizontal: 16,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EditProduct;
