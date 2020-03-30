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
import ImageField from '../../../components/textField/ImageField';
import TextFieldDefault from '../../../components/textField/TextFieldDefault';
import { HeaderText } from '../../../components/texts/HeaderText';
import { ViewCenter } from '../../../components/ViewCenter';
import { apiAddProduct } from '../../../utils/api';

// interface IProps extends NavigationScreenProps {
//   addProductStore;
// }

// interface IState {
//   loading: boolean;
//   products;
//   images;
// }

@inject('addProductStore')
@observer
class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, products: null, images: [] };

    this.addProduct = this.addProduct.bind(this);
    this.successAddProduct = this.successAddProduct.bind(this);
    this.setImages = this.setImages.bind(this);
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
    const store = this.props.addProductStore;

    return (
      <AwareScroll>
        <ViewCenter style={styles.content}>
          <ImageField
            placeholder={'Images product'}
            setImages={this.setImages}
          />
          <TextFieldDefault
            placeholder={'Name'}
            inputOnChange={store.setName}
          />
          <TextFieldDefault placeholder={'Sku'} inputOnChange={store.setSku} />
          <TextFieldDefault
            placeholder={'Description'}
            inputOnChange={store.setDescription}
          />
          <CategoryPicker
            label={'Category'}
            onSelect={store.setIdCategory}
            value={store.category}
          />
          <TextFieldDefault
            placeholder={'Weight'}
            inputOnChange={store.setWeight}
          />
          <TextFieldDefault
            placeholder={'Stock'}
            inputOnChange={store.setStock}
          />
          <TextFieldDefault
            placeholder={'HET'}
            inputOnChange={store.setHetPrice}
            value={store.het}
          />
          <TextFieldDefault
            placeholder={'Price'}
            inputOnChange={store.setPrice}
            value={store.price}
          />

          <TextFieldDefault
            placeholder={'Java Price'}
            inputOnChange={store.setJavaPrice}
            value={store.javaPrice}
          />
          <Button label={'Add Product'} onPress={this.addProduct} />
        </ViewCenter>
        <Loading visible={loading} />
      </AwareScroll>
    );
  }

  setImages(images) {
    this.setState({ images });
  }

  async addProduct() {
    const store = this.props.addProductStore;

    try {
      this.setState({ loading: true });

      const response = await apiAddProduct(
        store.name,
        store.sku,
        store.description,
        store.id_category,
        store.weight,
        store.stock,
        store.het,
        store.price,
        store.javaPrice,
        this.state.images,
      );

      if (response && Number(response.status) === 201) {
        store.clearStore();
        this.successAddProduct();
      }
    } catch (error) {
      Alert.alert('Error', 'Add Product Failed');
    } finally {
      this.setState({ loading: false });
    }
  }

  successAddProduct() {
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

export default AddProduct;
