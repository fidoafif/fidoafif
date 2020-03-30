// @@flow
import { inject, observer } from "mobx-react/native";
import React, { Component } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  BackHandler,
  ActivityIndicator,
  Alert
} from "react-native";
import { AwareScroll } from "../../components/AwareScroll";
import { ButtonNavCart } from "../../components/buttons/ButtonNavCart";
import { SlideShow } from "../../components/SlideShow";
import { HeaderSearchBar } from "../../components/textField/HeaderSearchBar";
import { LargeText } from "../../components/texts/LargeText";
import HomeStore from "../../stores/home/HomeStore";
import { colors } from "../../utils/Colors";
import CategoryView from "./CategoryView";
import LatestProduct from "./LatestProduct";
import { apiGetAgent, apiGetSearchProduct } from "../../utils/api";
import { NormalText } from "../../components/texts/NormalText";
import { MediumText } from "../../components/texts/MediumText";
import { productManagement } from "../../utils/dataManagement";

// interface IProps extends NavigationScreenProps {
//   homeStore;
//   cartStore;
// }

// interface IState {
//   banners;
//   loading: boolean;
// }

@inject("homeStore", "cartStore", "salesAgentStore")
@observer
class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = { banners: null, loading: false };

    this.slideItem = this.slideItem.bind(this);
    this.navigationToCart = this.navigationToCart.bind(this);
    this.navigateProduct = this.navigateProduct.bind(this);
    this.renderSearchResult = this.renderSearchResult.bind(this);
    this.setSearchValue = this.setSearchValue.bind(this);
    this.searchProduct = this.searchProduct.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    // this.handleBackPress = this.handleBackPress.bind(this);

    props.navigation.setParams({
      renderHeader: this.renderHeader
    });
  }

  static navigationOptions = ({ navigation }) => {
    const navCartOnpress = () => {
      navigation.navigate("Cart");
    };

    const params = navigation.state.params;
    return {
      // headerLeft: <ButtonNavBack navigation={navigation} />,
      headerTitle:
        params && params.renderHeader ? params.renderHeader : <View />,
      headerRight: <ButtonNavCart onPress={navCartOnpress} />,
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
    const { cartStore } = this.props;

    await cartStore.getProductFromAsyncStorage();
    const response = await HomeStore.fetchBanner();

    if (response.length) {
      this.setState({ banners: response });
    }
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  // }

  render() {
    const salesAgentStore = this.props.salesAgentStore;
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
        {this.renderSearchResult()}
        <AwareScroll>
          {this.renderBanner()}
          <View style={{ padding: 16 }}>
            <LargeText bold={true}>{"Kateogri Produk"}</LargeText>

            <CategoryView navigation={this.props.navigation} />
          </View>

          <View
            style={{
              padding: 16
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <LargeText bold={true}>{"Produk Terbaru"}</LargeText>
              <TouchableOpacity onPress={this.navigateProduct}>
                <LargeText bold={true} color={colors.PRIMARY_COLOR}>
                  {"Lihat Semua"}
                </LargeText>
              </TouchableOpacity>
            </View>

            <LatestProduct navigation={this.props.navigation} />
          </View>
        </AwareScroll>
      </View>
    );
  }

  renderSearchResult() {
    if (this.state.searchLoading) {
      return (
        <View
          style={{
            height: 280,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            borderBottomWidth: 1,
            borderBottomColor: colors.BORDER_COLOR,
            shadowOffset: {
              width: 0,
              height: 1
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,

            elevation: 2
          }}
        >
          <ActivityIndicator />
        </View>
      );
    }
    if (this.state.productSearchList && this.state.productSearchList.length) {
      return (
        <View
          style={{
            height: 280,
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderBottomWidth: 1,
            borderBottomColor: colors.BORDER_COLOR,
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
          <View style={{ paddingBottom: 16 }}>
            <AwareScroll>
              {this.state.productSearchList.map(item => {
                const onPress = () => {
                  this.setState({ searchQuery: "", productSearchList: null });
                  this.props.navigation.navigate("DetailsProductPage", {
                    product: { ...item }
                  });
                };
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={onPress}
                    style={{ paddingVertical: 8 }}
                  >
                    <MediumText>{item.name}</MediumText>
                  </TouchableOpacity>
                );
              })}
            </AwareScroll>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.setState({ searchQuery: "", productSearchList: null });
            }}
            style={{
              paddingVertical: 8,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              bottom: 0,
              width: "100%",
              backgroundColor: colors.WHITE_COLOR
            }}
          >
            <LargeText color={colors.NEGATIVE_COLOR}>{"Close"}</LargeText>
          </TouchableOpacity>
        </View>
      );
    }
  }

  renderHeader() {
    return (
      <HeaderSearchBar
        hint={"Cari barang disini.."}
        onPress={this.searchProduct}
        value={this.state.searchQuery}
        onChangeText={this.setSearchValue}
      />
    );
  }

  setSearchValue(value) {
    this.setState({ searchQuery: value });
  }

  async searchProduct() {
    const { searchQuery } = this.state;

    try {
      this.setState({ searchLoading: true });
      if (searchQuery) {
        const response = await apiGetSearchProduct(searchQuery);
        // console.log(response);
        if (response && response.data) {
          this.setState({
            productSearchList: productManagement(response.data)
          });
        }
      }
    } catch (error) {
      this.setState({ searchError: error });
      Alert.alert("Search Fail", error.message);
    } finally {
      this.setState({ searchLoading: false });
    }
    // console.log(searchQuery);
  }

  renderBanner() {
    const { banners } = this.state;
    if (banners && banners.length) {
      return (
        <View style={{ padding: 8 }}>
          <SlideShow
            style={{ height: 160, borderRadius: 8 }}
            paginationStyle={{
              backgroundColor: colors.BORDER_COLOR,
              opacity: 0.5,
              bottom: 0,
              paddingVertical: 8,
              marginHorizontal: 8
            }}
          >
            {banners.map((banner, index) => {
              return <View key={index}>{this.slideItem(banner.image)}</View>;
            })}
          </SlideShow>
        </View>
      );
    }
    return null;
  }

  slideItem(uri) {
    return (
      <View
        style={{
          height: 160,
          borderRadius: 8,
          marginHorizontal: 8,
          backgroundColor: colors.BORDER_COLOR
        }}
      >
        <Image
          style={{
            flex: 1,
            borderRadius: 8
          }}
          source={{
            uri
          }}
          resizeMode={"cover"}
        />
      </View>
    );
  }

  navigationToCart() {
    const { navigation } = this.props;
    navigation.navigate("Cart");
  }

  navigateProduct() {
    const { navigation } = this.props;
    navigation.navigate("ProductPage");
  }

  // handleBackPress() {
  //   const params = this.props.navigation.state.params;
  //   if (params && params.goBack) {
  //     params.goBack();
  //     this.props.navigation.goBack();
  //   } else {
  //     this.props.navigation.goBack();
  //   }
  //   return true;
  // }
}

export default HomePage;
