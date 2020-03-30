import React, { Component } from "react";
import { Image } from "react-native";
import { logo } from "../../assets";

export class AppLogo extends Component {
  render() {
    const { width, height } = this.props;
    return (
      <Image
        source={logo}
        style={{
          width: width || 250,
          height: height || 250
        }}
        resizeMode={"contain"}
      />
    );
  }
}
