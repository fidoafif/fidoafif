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
import { CityPicker } from '../../../components/pickers/CityPicker';
import { ProductPicker } from '../../../components/pickers/ProductPicker';
import TextFieldDefault from '../../../components/textField/TextFieldDefault';
import { HeaderText } from '../../../components/texts/HeaderText';
import { ViewCenter } from '../../../components/ViewCenter';
import {
  apiDeletePromo,
  apiEditPromo,
  apiDetailDiscount,
  apiEditDiscount,
} from '../../../utils/api';
import { colors } from '../../../utils/Colors';
import { API_DETAIL_DISCOUNT } from '../../../config';
import { CategoryPicker } from '../../../components/pickers/CategoryPicker';

// interface IProps extends NavigationScreenProps {}

// interface IState {
//   loading: boolean;
//   id_promo;
//   price;
//   product;
//   city;
// }

export default class SalesEditDiscount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      category: null,
      discount: '',
      id_discount: '',
    };

    this.editPromo = this.editPromo.bind(this);
    this.deletePromo = this.deletePromo.bind(this);
    this.renderHeaderRight = this.renderHeaderRight.bind(this);
    this.successEditDiscount = this.successEditDiscount.bind(this);
    this.setCategory = this.setCategory.bind(this);
    this.setDiscount = this.setDiscount.bind(this);

    props.navigation.setParams({ headerRight: this.renderHeaderRight });
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      headerLeft: <ButtonNavBack navigation={navigation} />,
      headerTitle: <HeaderText>{'Edit Discount'}</HeaderText>,
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

    if (params && params.data) {
      const discount = params.data;

      this.setState({
        id_discount: discount.id_discount,
        category: discount.category,
        discount: discount.discount,
      });
    }
  }

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
            value={this.state.discount}
          />
          <Button label={'Edit Discount'} onPress={this.editPromo} />
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

  setDiscount(value) {
    this.setState({ discount: value });
  }

  setCategory(value) {
    this.setState({ category: value });
  }

  async editPromo() {
    const { category, discount, id_discount } = this.state;
    if (category && discount && id_discount) {
      try {
        this.setState({ loading: true });

        const category_id = category
          ? category.id_category
            ? category.id_category
            : category
          : category;
        const response = await apiEditDiscount(
          id_discount,
          category_id,
          discount,
        );
        if (response && Number(response.status) === 201) {
          this.successEditDiscount();
        }
      } catch (error) {
        Alert.alert('Error', 'Edit Discount Failed');
      } finally {
        this.setState({ loading: false });
      }
    } else {
      Alert.alert('Error', 'Please complete the form');
    }
  }

  async deletePromo() {
    const { id_discount } = this.state;
    if (id_discount) {
      try {
        this.setState({ loading: true });
        const response = await apiDeletePromo(id_discount);

        if (response && Number(response.status) === 200) {
          this.successEditDiscount();
        }
      } catch (error) {
        Alert.alert('Error', 'Delete Discount Failed');
      } finally {
        this.setState({ loading: false });
      }
    } else {
      Alert.alert('Error', 'Cannot identify this Discount');
    }
  }

  successEditDiscount() {
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
