// @@flow

import React, { Component } from "react";
import { Alert, StyleSheet, View } from "react-native";
import {
  NavigationScreenProps,
  NavigationStackScreenOptions
} from "react-navigation";
import { AwareScroll } from "../../../components/AwareScroll";
import { Button } from "../../../components/buttons/Button";
import { ButtonNavBack } from "../../../components/buttons/ButtonNavBack";
import { Loading } from "../../../components/modal/Loading";
import { ProductPicker } from "../../../components/pickers/ProductPicker";
import TextFieldDefault from "../../../components/textField/TextFieldDefault";
import { HeaderText } from "../../../components/texts/HeaderText";
import { ViewCenter } from "../../../components/ViewCenter";
import { apiCreatePromo } from "../../../utils/api";

// interface IProps extends NavigationScreenProps {}

// interface IState {
//   loading: boolean;
//   price;
//   product;
// }

export default class SalesAddPromo extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, product: null, price: "" };

    this.addPromo = this.addPromo.bind(this);
    this.successAddPromo = this.successAddPromo.bind(this);
    this.setPrice = this.setPrice.bind(this);
    this.setProduct = this.setProduct.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <ButtonNavBack navigation={navigation} />,
      headerTitle: <HeaderText>{"Add Product"}</HeaderText>,
      headerRight: <View />,
      headerStyle: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3
      }
    };
  };

  render() {
    const { loading } = this.state;

    return (
      <AwareScroll>
        <ViewCenter style={styles.content}>
          <ProductPicker
            label={"Product"}
            onSelect={this.setProduct}
            value={this.state.product}
          />
          <TextFieldDefault
            placeholder={"Price"}
            inputOnChange={this.setPrice}
            keyboardType={"numeric"}
          />
          <Button label={"Add Promo"} onPress={this.addPromo} />
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

  async addPromo() {
    const { product, price } = this.state;
    if (product && price) {
      try {
        this.setState({ loading: true });
        const response = await apiCreatePromo(product.id_product, price);
        if (response && Number(response.status) === 201) {
          this.successAddPromo();
        }
      } catch (error) {
        Alert.alert("Error", "Add Promo Failed");
      } finally {
        this.setState({ loading: false });
      }
    } else {
      Alert.alert("Error", "Please complete the form");
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
    alignItems: "center",
    justifyContent: "center"
  }
});
