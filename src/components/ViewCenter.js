import React, { Component } from "react";
import { View } from "react-native";

export class ViewCenter extends Component {
  render() {
    const style = {
      justifyContent: "center",
      alignItems: "center",
      ...this.props.style
    };
    return (
      <View {...this.props} style={style}>
        {this.props.children}
      </View>
    );
  }
}
