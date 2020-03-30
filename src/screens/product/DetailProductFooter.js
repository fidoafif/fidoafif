import React, { Component } from "react";
import { TouchableOpacityProperties, View } from "react-native";
import { ButtonOutline } from "../../components/buttons/ButtonOutline";
import { LargeText } from "../../components/texts/LargeText";
import { colors } from "../../utils/Colors";

// interface IProps extends TouchableOpacityProperties {
//   onBuyProduct: () => void;
//   onAddProduct: () => void;
// }
// interface IStates {}

export class DetailProductFooter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ flexDirection: "row", paddingVertical: 8, height: 50 }}>
        <View style={{ flex: 1, paddingHorizontal: 8 }}>
          <ButtonOutline style={{ flex: 1 }} onPress={this.props.onAddProduct}>
            <LargeText color={colors.PRIMARY_COLOR}>{"Tambah"}</LargeText>
          </ButtonOutline>
        </View>
        <View style={{ flex: 1, paddingHorizontal: 8 }}>
          <ButtonOutline
            style={{ flex: 1, backgroundColor: colors.PRIMARY_COLOR }}
            onPress={this.props.onBuyProduct}
          >
            <LargeText color={colors.WHITE_COLOR}>{"Beli"}</LargeText>
          </ButtonOutline>
        </View>
      </View>
    );
  }
}
