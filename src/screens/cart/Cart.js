import { inject, observer } from "mobx-react/native";
import React, { Component } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import {
  FlatList,
  NavigationScreenProps,
  NavigationStackScreenOptions
} from "react-navigation";
import { AwareScroll } from "../../components/AwareScroll";
import { ButtonFooterRight } from "../../components/buttons/ButtonFooterRight";
import { ButtonNavBack } from "../../components/buttons/ButtonNavBack";
import { HeaderText } from "../../components/texts/HeaderText";
import { LargeText } from "../../components/texts/LargeText";
import { MediumText } from "../../components/texts/MediumText";
import { ViewCenter } from "../../components/ViewCenter";
import { cart } from "../../mocks/cart";
import { apiGetProfile } from "../../utils/api";
import { colors } from "../../utils/Colors";
import { formatThousand } from "../../utils/FormatThousand";
import CardCart from "./CardCart";

// interface IProps extends NavigationScreenProps {
//   cartStore;
// }

// interface IState {
//   totalPrice;
//   isAgent: boolean;
//   isJava: boolean;
// }

@inject("cartStore", "salesAgentStore")
@observer
class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalPrice: 0,
      isAgent: false,
      isReseller: false,
      isJava: false
    };
    this.onCheckout = this.onCheckout.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <ButtonNavBack navigation={navigation} />,
      headerTitle: <HeaderText>{"Keranjang"}</HeaderText>,
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

  async componentDidMount() {
    const store = this.props.salesAgentStore;
    const tokenStatus = store.validate();
    const profile = tokenStatus
      ? await store.getAgentData()
      : await apiGetProfile();

    if (profile && profile.data && profile.data.type === "1") {
      const { data } = profile;

      if (data.meta && data.meta.length) {
        this.props.cartStore.useAgentPrice(data.meta[0]);
        const priceOption = data.meta[0].price_option;
        // if (priceOption === '0') {
        //   this.props.cartStore.useJavaPrice();
        // }
        this.setState({
          isAgent: true,
          isJava: priceOption === "0" ? true : false
        });
      }
    }
    if (profile && profile.data && profile.data.type === "4") {
      this.setState({
        isReseller: true
      });
    }

    if (profile && profile.data && profile.data.type !== "0") {
      await this.props.cartStore.validateDiscount();
    }
    this.countTotalPrice();
  }

  render() {
    const { cartStore, salesAgentStore } = this.props;
    const _keyExtractor = (item, index) => {
      return `${index}`;
    };

    if (!cartStore.products.length) {
      return (
        <ViewCenter style={{ flex: 1 }}>
          <Text>{"Cart is empty"}</Text>
        </ViewCenter>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        {salesAgentStore.name ? (
          <View
            style={{
              padding: 16,
              backgroundColor: colors.WHITE_COLOR,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,

              elevation: 2
            }}
          >
            <LargeText size={18} bold={true} color={colors.PRIMARY_COLOR}>
              {`Agent: ${salesAgentStore.name}`}
            </LargeText>
          </View>
        ) : (
          <View />
        )}
        <AwareScroll>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={cartStore.removeAll}
              style={{
                display: "flex",
                alignItems: "flex-end",
                marginRight: 15
              }}
            >
              <Text style={{ color: colors.GOLD_COLOR, fontWeight: "bold" }}>
                Hapus Semua
              </Text>
            </TouchableOpacity>
            <FlatList
              keyExtractor={_keyExtractor}
              data={cartStore.products}
              renderItem={this.renderItem}
            />
          </View>
        </AwareScroll>
        <View>
          <ButtonFooterRight rightLabel={"Checkout"} onPress={this.onCheckout}>
            <MediumText>Total Keranjang</MediumText>
            <LargeText
              style={{
                color: colors.PRIMARY_COLOR,
                fontWeight: "bold",
                justifyContent: "flex-end"
              }}
            >
              Rp. {formatThousand(cartStore.totalPrice)}
            </LargeText>
          </ButtonFooterRight>
        </View>
      </View>
    );
  }

  renderItem = ({ item }) => {
    const { cartStore } = this.props;
    const remove = () => {
      cartStore.removeProduct(item);
    };
    return <CardCart item={item} onRemove={remove} />;
  };

  async countTotalPrice() {
    let total = 0;
    await cart.map(item => {
      total += item.price;
      this.setState({ totalPrice: total });
    });
  }

  async onCheckout() {
    const { navigation, cartStore } = this.props;
    const { isAgent, isReseller } = this.state;

    if (isAgent) {
      if (Number(cartStore.totalPrice) >= 150000) {
        await cartStore.validatingData();
        navigation.navigate("Shipping");
      } else {
        Alert.alert(
          "Error",
          "Maaf minimal belanja untuk Agent adalah Rp. 150.000"
        );
      }
    } else if (isReseller) {
      if (Number(cartStore.totalPrice) >= 300000) {
        await cartStore.validatingData();
        navigation.navigate("Shipping");
      } else {
        Alert.alert(
          "Error",
          "Maaf minimal belanja untuk Reseller adalah Rp. 300.000"
        );
      }
    } else {
      await cartStore.validatingData();
      navigation.navigate("Shipping");
    }
  }
}

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    marginRight: 10
  },
  container: {
    marginTop: 15,
    flexDirection: "column",
    justifyContent: "space-between",
    display: "flex"
  }
});

export default Cart;
