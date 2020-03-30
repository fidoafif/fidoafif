import React, { Component } from "react";
import { TextInput, View } from "react-native";
import { colors } from "../../utils/Colors";

// interface IProps extends TextInputProperties {
//   textValue;
//   inputOnFocus?: () => void;
//   inputOnBlur?: () => void;
//   inputOnChange?: (value) => void;
// }
// interface IStates {
//   borderColor;
// }

export class EmailField extends Component {
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
    const style = {
      height: 45,
      paddingLeft: 8,
      ...this.props.style
    };
    return (
      <View style={[viewStyle, { borderColor }]}>
        <TextInput
          style={style}
          keyboardType={"email-address"}
          autoCapitalize={"none"}
          autoCorrect={false}
          value={this.props.textValue}
          placeholder={"Email"}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChangeText={this.onChange}
        />
      </View>
    );
  }

  onFocus() {
    const { inputOnFocus, textValue } = this.props;
    if (inputOnFocus) {
      inputOnFocus();
    }
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
      textValue
    )
      ? undefined
      : "Email format wrong";

    if (textValue && emailPattern) {
      this.setState({
        borderColor: colors.NEGATIVE_COLOR
      });
    } else {
      this.setState({
        borderColor: colors.PRIMARY_COLOR
      });
    }
  }

  onBlur() {
    const { inputOnBlur, textValue } = this.props;
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
      textValue
    )
      ? undefined
      : "Email format wrong";

    if (textValue && emailPattern) {
      this.setState({
        borderColor: colors.NEGATIVE_COLOR
      });
    } else {
      this.setState({
        borderColor: colors.BORDER_COLOR
      });
    }
    if (inputOnBlur) {
      inputOnBlur();
    }
  }

  onChange(value) {
    const { inputOnChange } = this.props;

    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ? undefined
      : "Email format wrong";

    if (value && emailPattern) {
      this.setState({
        borderColor: colors.NEGATIVE_COLOR
      });
    } else {
      this.setState({
        borderColor: colors.PRIMARY_COLOR
      });
    }

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
