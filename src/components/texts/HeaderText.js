import React, { Component } from "react";
import { Text, TextProperties, TextStyle } from "react-native";
import { colors } from "../../utils/Colors";
import { textSize } from "../../utils/TextSize";
import { ViewCenter } from "../ViewCenter";

// interface IProps extends TextProperties {
//   color?;
// }
// interface IStates {}

export class HeaderText extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { color } = this.props;
    const style = {
      fontSize: textSize.LARGE,
      textAlign: "center",
      flex: 1,
      fontWeight: "bold",
      color: color || colors.BUTTON_TEXT_COLOR,
      ...this.props.style
    };
    return (
      <Text {...this.props} style={style}>
        {this.props.children}
      </Text>
    );
  }
}
