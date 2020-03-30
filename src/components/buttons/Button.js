import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import { colors } from "../../utils/Colors";
import { MediumText } from "../texts/MediumText";

export class Button extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { color, label } = this.props;
    const style = {
      height: 50,
      backgroundColor: color || colors.PRIMARY_COLOR,
      borderRadius: 4,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3
    };
    return (
      <View style={viewStyle}>
        <TouchableOpacity {...this.props} style={style}>
          <MediumText color={colors.WHITE_COLOR} bold={true}>
            {label}
          </MediumText>
        </TouchableOpacity>
      </View>
    );
  }
}

const viewStyle = {
  width: "100%",
  marginVertical: 8
};
