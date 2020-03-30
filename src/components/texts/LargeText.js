import React, { Component } from "react";
import { Text, TextProperties, TextStyle } from "react-native";
import { colors } from "../../utils/Colors";
import { textSize } from "../../utils/TextSize";

// interface IProps extends TextProperties {
//   color?;
//   bold?: boolean;
// }
// interface IStates {}

export class LargeText extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { color, bold, size } = this.props;
    const style = {
      fontSize: size ? size : textSize.LARGE,
      fontWeight: bold ? "bold" : "normal",
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
