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
import { apiCreatePromo, apiCreateDiscount } from '../../../utils/api';
import { CategoryPicker } from '../../../components/pickers/CategoryPicker';

// interface IProps extends NavigationScreenProps {}

// interface IState {
//   loading: boolean;
//   price;
//   product;
//   city;
// }

export default class SalesAddDiscount extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, category: null, discount: '' };

    this.addDiscount = this.addDiscount.bind(this);
    this.successAddDiscount = this.successAddDiscount.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.setDiscount = this.setDiscount.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <ButtonNavBack navigation={navigation} />,
      headerTitle: <HeaderText>{'Add Discount'}</HeaderText>,
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
          <CategoryPicker
            label={'Category'}
            onSelect={this.setCategory}
            value={
              this.state.category
                ? this.state.category.name
                  ? this.state.category.name
                  : this.state.category
                : ''
            }
          />
          <TextFieldDefault
            placeholder={'Discount'}
            inputOnChange={this.setDiscount}
            keyboardType={'numeric'}
          />
          <Button label={'Add Discount'} onPress={this.addDiscount} />
        </ViewCenter>
        <Loading visible={loading} />
      </AwareScroll>
    );
  }

  setDiscount(value) {
    this.setState({ discount: value });
  }

  setCategory(value) {
    this.setState({ category: value });
  }

  async addDiscount() {
    const { category, discount } = this.state;
    if (category && discount) {
      try {
        this.setState({ loading: true });
        // console.log(category);
        const category_id = category
          ? category.id_category
            ? category.id_category
            : category
          : category;
        const response = await apiCreateDiscount(category_id, discount);
        if (response && Number(response.status) === 201) {
          this.successAddDiscount();
        }
      } catch (error) {
        // console.log(error);
        Alert.alert('Error', 'Add Discount Failed');
      } finally {
        this.setState({ loading: false });
      }
    } else {
      Alert.alert('Error', 'Please complete the form');
    }
  }

  successAddDiscount() {
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
