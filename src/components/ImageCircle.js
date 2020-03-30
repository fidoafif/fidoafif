import React, { Component } from "react";
import { Image, View } from "react-native";

// interface IProps {
//   source;
// }

export class ImageCircle extends Component {
  render() {
    return (
      <View>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 200 / 2,
            marginRight: 15
          }}
          source={{ uri: this.props.source }}
        />
      </View>
    );
  }
}
