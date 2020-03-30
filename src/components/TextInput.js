import React, { Component } from "react";
import { TextInput, TextInputProperties } from "react-native";
import { colors } from "../utils/Colors";

// interface IProps extends TextInputProperties {
//   value;
//   placeholder;
//   style?;
// }
export default class TextField extends Component {
  render() {
    return (
      <TextInput
        {...this.props}
        value={this.props.value}
        placeholder={this.props.placeholder}
        autoCorrect={false}
        placeholderTextColor={colors.GREY_COLOR}
        style={{
          color: "black",
          paddingHorizontal: 16,
          ...this.props.style
        }}
      />
    );
  }
}
