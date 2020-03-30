import { Icon } from "react-native-elements";
import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProperties,
  View
} from "react-native";
import { colors } from "../../utils/Colors";

// interface IProps extends TouchableOpacityProperties {
//   style?;
//   icon?;
//   disableIcon?: boolean;
//   size?;
//   color?;
// }

// interface IState {
//   status;
// }

export class ButtonCircle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: this.props.disableIcon ? this.props.disableIcon : false
    };
  }

  render() {
    return (
      <TouchableOpacity
        {...this.props}
        style={{
          borderWidth: 1,
          borderColor: colors.WHITE_COLOR,
          alignItems: "center",
          justifyContent: "center",
          width: this.props.size ? this.props.size : 45,
          height: this.props.size ? this.props.size : 45,
          borderRadius: 50,
          elevation: 1.5,
          shadowOffset: { width: 5, height: 2 },
          shadowColor: colors.GREY_COLOR,
          shadowOpacity: 10,
          shadowRadius: 2,
          ...this.props.style
        }}
      >
        {this.state.status ? (
          this.props.children
        ) : (
          <Icon name={this.props.icon} type="ionicon" size={20} />
        )}
      </TouchableOpacity>
    );
  }
}
