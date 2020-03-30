import React, { Component } from "react";
import {
  TouchableOpacity,
  TouchableOpacityProperties,
  View,
  ViewStyle
} from "react-native";
import { colors } from "../../utils/Colors";

// interface IProps extends TouchableOpacityProperties {}
// interface IStates {}

export class ButtonOutline extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const style = {
      ...this.props.style
    };
    return (
      <View style={[viewStyle, style]}>
        <TouchableOpacity
          {...this.props}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {this.props.children}
        </TouchableOpacity>
      </View>
    );
  }
}

const viewStyle = {
  borderRadius: 5,
  borderColor: colors.PRIMARY_COLOR,
  borderWidth: 1
};
