// @@flow

import { inject, observer } from "mobx-react/native";
import React, { Component } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import {
  NavigationScreenProps,
  NavigationStackScreenOptions
} from "react-navigation";
import { AwareScroll } from "../../components/AwareScroll";
import { ButtonNavBack } from "../../components/buttons/ButtonNavBack";
import { ButtonNavCart } from "../../components/buttons/ButtonNavCart";
import ListProduct from "../../components/product/ListProduct";
import { HeaderText } from "../../components/texts/HeaderText";
import { SmallText } from "../../components/texts/SmallText";
import { ViewCenter } from "../../components/ViewCenter";
import { colors } from "../../utils/Colors";
import { LargeText } from "../../components/texts/LargeText";

// interface IProps extends NavigationScreenProps {
//   homeStore;
// }

// interface IState {
//   loading: boolean;
// }

@inject("homeStore", "salesAgentStore")
@observer
class ProductPage extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => {
    const navCartOnPress = () => {
      navigation.navigate("Cart");
    };
    return {
      headerLeft: <ButtonNavBack navigation={navigation} />,
      headerTitle: <HeaderText>{"Latest Product"}</HeaderText>,
      headerRight: <ButtonNavCart onPress={navCartOnPress} />,
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
    const { homeStore } = this.props;

    await homeStore.fetchProducts();
  }

  render() {
    const { homeStore } = this.props;
    const salesAgentStore = this.props.salesAgentStore;

    if (!homeStore.products.length) {
      return (
        <ViewCenter style={{ flex: 1 }}>
          <ActivityIndicator />
        </ViewCenter>
      );
    }

    return (
      <View>
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
          <View style={{ padding: 16 }}>
            <ListProduct
              navigation={this.props.navigation}
              productList={homeStore.products}
            />
          </View>
        </AwareScroll>
      </View>
    );
  }
}

export default ProductPage;
