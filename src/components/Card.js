import React, { Component } from "react";
import { View } from "react-native";

// interface IProps {
//   height?;
//   style?;
// }
export class Card extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,

          elevation: 4,
          borderRadius: 1,
          padding: 15,

          height: this.props.height ? this.props.height : null,
          ...this.props.style
        }}
      >
        {this.props.children}
      </View>
    );
  }
}
