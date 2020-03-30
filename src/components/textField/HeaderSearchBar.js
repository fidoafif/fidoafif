import { Icon } from 'react-native-elements';
import React, { Component } from 'react';
import {
  TextInput,
  TextInputProperties,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../utils/Colors';

// interface IProps extends TextInputProperties {
//   hint?;
//   inputOnFocus?: () => void;
//   inputOnBlur?: () => void;
//   inputOnChange?: (value) => void;
// }
// interface IStates {
//   borderColor;
// }
export class HeaderSearchBar extends Component {
  constructor(props) {
    super(props);

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      borderColor: colors.BACKGROUND_FIELD_COLOR,
    };
  }
  render() {
    const { hint } = this.props;
    const { borderColor } = this.state;
    const style = {
      // height: 45,
      flex: 1,
      paddingVertical: 8,
      paddingLeft: 8,
      ...this.props.style,
    };
    return (
      <View style={[viewStyle, { borderColor }]}>
        <TextInput
          style={style}
          keyboardType={'default'}
          autoCorrect={false}
          placeholder={hint || 'Search'}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onChangeText={this.onChange}
        />
        <TouchableOpacity onPress={this.props.onPress}>
          <Icon type={'evilicon'} name={'search'} size={24} />
        </TouchableOpacity>
      </View>
    );
  }

  onFocus() {
    const { inputOnFocus } = this.props;
    if (inputOnFocus) {
      inputOnFocus();
    }
    this.setState({
      borderColor: colors.BACKGROUND_FIELD_COLOR,
    });
  }

  onBlur() {
    const { inputOnBlur } = this.props;
    if (inputOnBlur) {
      inputOnBlur();
    }
    this.setState({
      borderColor: colors.BACKGROUND_FIELD_COLOR,
    });
  }

  onChange(value) {
    const { onChangeText } = this.props;

    if (onChangeText) {
      onChangeText(value);
    }
  }
}

const viewStyle = {
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  borderColor: colors.BACKGROUND_FIELD_COLOR,
  backgroundColor: colors.BACKGROUND_FIELD_COLOR,
  borderWidth: 1.1,
  borderRadius: 4,
  // marginBottom: 16,
};
