import { Icon } from 'react-native-elements';
import React, { Component } from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProperties,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from '../../utils/Colors';
import { MediumText } from '../texts/MediumText';
import { ViewCenter } from '../ViewCenter';

// interface IProps extends TouchableOpacityProperties {
//   label;
//   color?;
// }
// interface IStates {}

export class ButtonLoginFacebook extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { color, label } = this.props;
    const style = {
      height: 50,
      backgroundColor: color || colors.PRIMARY_COLOR,
      borderRadius: 4,
      flex: 1,

      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      ...this.props.style,
    };
    return (
      <View style={viewStyle}>
        <TouchableOpacity {...this.props} style={style}>
          <Icon
            name={'facebook-box'}
            size={28}
            type={'material-community'}
            color={colors.WHITE_COLOR}
            iconStyle={{ paddingHorizontal: 16 }}
          />
          <ViewCenter>
            <MediumText color={colors.WHITE_COLOR} bold={true}>
              {label}
            </MediumText>
          </ViewCenter>
        </TouchableOpacity>
      </View>
    );
  }
}

const viewStyle = {
  width: '100%',
  marginVertical: 8,
};
