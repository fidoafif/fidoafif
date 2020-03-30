// @@flow
import { inject, observer } from "mobx-react/native";
import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import ListProduct from "../../components/product/ListProduct";
import { ViewCenter } from "../../components/ViewCenter";

// interface IProps extends NavigationScreenProps {
//   homeStore?;
// }

// interface IState {
//   loading: boolean;
// }

@inject("homeStore")
@observer
class LatestProduct extends Component {
  ref;
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const { homeStore } = this.props;

    await homeStore.fetchProducts();
  }

  render() {
    const { homeStore } = this.props;

    if (homeStore.products.length) {
      const products = [...homeStore.products];
      return (
        <ListProduct
          navigation={this.props.navigation}
          productList={products.slice(0, 10)}
        />
      );
    }

    return (
      <ViewCenter style={{ height: 80 }}>
        <ActivityIndicator />
      </ViewCenter>
    );
  }
}

export default LatestProduct;
