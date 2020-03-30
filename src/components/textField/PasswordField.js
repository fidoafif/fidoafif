import React, { Component } from "react";
import { TextInput, View } from "react-native";
import { colors } from "../../utils/Colors";

// interface IProps extends TextInputProperties {
//   label?;
//   inputOnFocus?: () => void;
//   inputOnBlur?: () => void;
//   inputOnChange?: (value) => void;
// }
// interface IStates {
//   borderColor;
// }

export class PasswordField extends Component {
  constructor(props) {
    super(props);

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      borderColor: colors.BORDER_COLOR
    };
  }
  render() {
    const { borderColor } = this.state;
    const { label } = this.props;
    const style = {
      height: 45,
      paddingLeft: 8,
      ...this.props.style
    };
    return (
      <View style={[viewStyle, { borderColor }]}>
        <TextInput
          style={style}
          keyboardType={"default"}
          secureTextEntry={true}
          autoCorrect={false}
          placeholder={label ? label : "Password"}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChangeText={this.onChange}
        />
      </View>
    );
  }

  onFocus() {
    const { inputOnFocus } = this.props;
    if (inputOnFocus) {
      inputOnFocus();
    }
    this.setState({
      borderColor: colors.PRIMARY_COLOR
    });
  }

  onBlur() {
    const { inputOnBlur } = this.props;
    if (inputOnBlur) {
      inputOnBlur();
    }
    this.setState({
      borderColor: colors.BORDER_COLOR
    });
  }

  onChange(value) {
    const { inputOnChange } = this.props;

    if (inputOnChange) {
      inputOnChange(value);
    }
  }
}

const viewStyle = {
  width: "100%",
  borderColor: colors.BORDER_COLOR,
  borderWidth: 1.1,
  borderRadius: 4,
  marginBottom: 16
};
