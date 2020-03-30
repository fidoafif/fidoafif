import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProperties
} from "react-native";
import { colors } from "../../utils/Colors";
import { NormalText } from "../texts/NormalText";

// interface IProps extends TouchableOpacityProperties {
//   label;
//   color?;
//   style?;
//   width?;
//   height?;
// }
// interface IStates {}

export class ButtonSmall extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity
        {...this.props}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: this.props.color
            ? this.props.color
            : colors.GOLD_COLOR,
          width: this.props.width ? this.props.width : 90,
          height: this.props.height ? this.props.height : 25,
          borderRadius: 3
        }}
      >
        <NormalText style={{ color: colors.WHITE_COLOR }}>
          {this.props.label}
        </NormalText>
      </TouchableOpacity>
    );
  }
}
