import React, { Component } from "react";
import {
  TouchableOpacity,
  TouchableOpacityProperties,
  View,
  ViewStyle
} from "react-native";

// interface IProps extends TouchableOpacityProperties {}
// interface IStates {}

export class ButtonIcon extends Component {
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
  paddingHorizontal: 10
};
