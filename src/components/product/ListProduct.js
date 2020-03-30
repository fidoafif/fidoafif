// @@flow
import React, { Component } from "react";
import { View } from "react-native";
import { FlatList, NavigationScreenProps } from "react-navigation";
import { formatDataColumn } from "../../utils/FormatDataColumn";
import { MediumText } from "../texts/MediumText";
import { ProductCard } from "./ProductCard";
import { ViewCenter } from "../ViewCenter";

// interface IProps extends NavigationScreenProps {
//   productList;
// }

// interface IState {
//   loading: boolean;
// }

export default class ListProduct extends Component {
  ref;
  constructor(props) {
    super(props);

    this.listItem = this.listItem.bind(this);
  }

  render() {
    const { productList } = this.props;

    const numColumns = 2;
    const _keyExtractor = (item, index) => {
      return `${index}`;
    };

    const _ref = c => {
      this.ref = c;
    };

    if (productList.length) {
      return (
        <View>
          <FlatList
            ref={_ref}
            data={formatDataColumn([...productList], numColumns)}
            renderItem={this.listItem}
            keyExtractor={_keyExtractor}
            numColumns={numColumns}
          />
        </View>
      );
    }
    return (
      <View>
        <MediumText>{"No data"}</MediumText>
      </View>
    );
  }

  listItem({ item }) {
    if (item.empty === true) {
      return (
        <View
          style={{
            minWidth: 145,
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            margin: 4,
            backgroundColor: "transparent"
          }}
        />
      );
    }
    return <ProductCard navigation={this.props.navigation} item={item} />;
  }
}
