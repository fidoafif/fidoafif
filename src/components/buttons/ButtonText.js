import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";

export class ButtonText extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const style = {
      ...this.props.style
    };
    return (
      <View style={viewStyle}>
        <TouchableOpacity {...this.props} style={style}>
          {this.props.children}
        </TouchableOpacity>
      </View>
    );
  }
}

const viewStyle = {
  marginVertical: 8
};
