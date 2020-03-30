import React, { Component } from "react";
import { View } from "react-native";

// interface IProps {
//   style?;
// }
export class SeparatorHorizontal extends Component {
  render() {
    return (
      <View
        style={{
          borderBottomColor: "#d8d8d8",
          borderBottomWidth: 1,
          width: "100%",
          ...this.props.style
        }}
      />
    );
  }
}
