// @@flow
import { Icon } from "react-native-elements";
import { inject, observer } from "mobx-react/native";
import React, { Component } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import * as _ from "lodash";
import { AwareScroll } from "../../components/AwareScroll";
import { ButtonNavCart } from "../../components/buttons/ButtonNavCart";
import ListProduct from "../../components/product/ListProduct";
import { HeaderText } from "../../components/texts/HeaderText";
import { SmallText } from "../../components/texts/SmallText";
import { ViewCenter } from "../../components/ViewCenter";
import { colors } from "../../utils/Colors";
import { productSortManagement } from "../../utils/dataManagement";
import { LargeText } from "../../components/texts/LargeText";

// interface IProps extends NavigationScreenProps {
//   categoryStore;
// }

// interface IState {
//   loading: boolean;
// }

@inject("categoryStore", "salesAgentStore")
@observer
class CategoryPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSortAsc: true,
      isSortLowestPrice: true,
      sortType: 0,
      products: []
    };

    this.toggleSortName = this.toggleSortName.bind(this);
    this.toggleSortPrice = this.toggleSortPrice.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params;

    const navCartOnPress = () => {
      navigation.navigate("Cart");
    };
    // console.log(params.category);
    return {
      // headerLeft: <ButtonNavBack navigation={navigation} />,
      headerTitle: (
        <HeaderText>
          {params && params.category ? params.category.name : "Category"}
        </HeaderText>
      ),
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
    const { params } = this.props.navigation.state;
    const { categoryStore } = this.props;

    if (params && params.category) {
      await categoryStore.fetchProductsByCategory(params.category.id);

      // const { isSortAsc, isSortLowestPrice } = this.state;

      // this.setState({ products: [] });
      // const productSort = _.orderBy(
      //   productSortManagement(categoryStore.products),
      //   ['name'],
      //   [isSortAsc ? 'asc' : 'desc'],
      // );

      // this.setState({ products: productSort });
    }
  }

  render() {
    const { categoryStore } = this.props;
    const { isSortAsc, isSortLowestPrice, sortType } = this.state;
    const salesAgentStore = this.props.salesAgentStore;

    if (!categoryStore.products.length) {
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
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: colors.BORDER_COLOR
          }}
        >
          <TouchableOpacity
            onPress={this.toggleSortName}
            style={{
              flex: 1,
              borderRightWidth: 1,
              borderColor: colors.BORDER_COLOR,
              paddingVertical: 8,
              flexDirection: "row",
              paddingHorizontal: 8,
              backgroundColor:
                sortType === 0 ? colors.PRIMARY_COLOR : colors.WHITE_COLOR
            }}
          >
            <Icon
              type={"font-awesome"}
              name={isSortAsc ? "sort-alpha-asc" : "sort-alpha-desc"}
              size={28}
              style={{ paddingHorizontal: 8 }}
            />

            <View style={{ paddingHorizontal: 8 }}>
              <SmallText>{"Urutkan"}</SmallText>
              <SmallText bold={true} numberOfLines={1} ellipsizeMode={"tail"}>
                {"Product"}
              </SmallText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.toggleSortPrice}
            style={{
              flex: 1,
              paddingVertical: 8,
              flexDirection: "row",
              paddingHorizontal: 8,
              backgroundColor:
                sortType === 1 ? colors.PRIMARY_COLOR : colors.WHITE_COLOR
            }}
          >
            <Icon
              type={"feather"}
              name={"sliders"}
              size={28}
              style={{ paddingHorizontal: 8 }}
            />
            <View style={{ paddingHorizontal: 8 }}>
              <SmallText>{"Filter"}</SmallText>
              <SmallText bold={true} numberOfLines={1} ellipsizeMode={"tail"}>
                {isSortLowestPrice ? "Lowest price" : "Highest price"}
              </SmallText>
            </View>
          </TouchableOpacity>
        </View>
        <AwareScroll>
          <View style={{ padding: 16, marginBottom: 30 }}>
            <ListProduct
              navigation={this.props.navigation}
              productList={categoryStore.products}
            />
          </View>
        </AwareScroll>
      </View>
    );
  }

  async toggleSortName() {
    await this.setState({ isSortAsc: !this.state.isSortAsc, sortType: 0 });
    const { categoryStore } = this.props;
    const { isSortAsc, isSortLowestPrice } = this.state;

    // this.setState({ products: [] });
    // const productSort = _.orderBy(
    //   productSortManagement(categoryStore.products),
    //   ['name'],
    //   [isSortAsc ? 'asc' : 'desc'],
    // );
    // const productSort = _.orderBy(
    //   productSortManagement(categoryStore.products),
    //   ['name', 'price'],
    //   [isSortAsc ? 'asc' : 'desc', isSortLowestPrice ? 'asc' : 'desc'],
    // );

    // this.setState({ products: productSort });
    // console.log(productSort);
    // await categoryStore.setProductsSort(productSort);

    categoryStore.toggleSortName(isSortAsc);
  }
  async toggleSortPrice() {
    await this.setState({
      isSortLowestPrice: !this.state.isSortLowestPrice,
      sortType: 1
    });
    const { categoryStore } = this.props;

    const { isSortAsc, isSortLowestPrice } = this.state;
    // console.log(isSortLowestPrice);
    // this.setState({ products: [] });
    // const productSort = _.orderBy(
    //   productSortManagement(categoryStore.products),
    //   ['price'],
    //   [isSortLowestPrice ? 'asc' : 'desc'],
    // );
    // const productSort = _.orderBy(
    //   productSortManagement(categoryStore.products),
    //   ['name', 'price'],
    //   [isSortAsc ? 'asc' : 'desc', isSortLowestPrice ? 'asc' : 'desc'],
    // );

    // this.setState({ products: productSort });

    categoryStore.toggleSortPrice(isSortLowestPrice);
  }
}

export default CategoryPage;
