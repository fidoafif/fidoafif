// @@flow
import React, { Component } from "react";
import { NavigationScreenProps } from "react-navigation";
import ListProduct from "../../components/product/ListProduct";
import { smiliarProductList } from "../../mocks/product";

// interface IProps extends NavigationScreenProps {}

// interface IState {
//   loading: boolean;
// }

export default class SimilarProduct extends Component {
  ref;
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ListProduct
        navigation={this.props.navigation}
        productList={smiliarProductList}
      />
    );
  }
}
