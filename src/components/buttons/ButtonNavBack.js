import { Icon } from "react-native-elements";
import React, { Component } from "react";
import {
  TouchableOpacity,
  TouchableOpacityProperties,
  View,
  ViewStyle
} from "react-native";
import {
  NavigationRoute,
  NavigationScreenProp,
  NavigationStackScreenOptions
} from "react-navigation";
import { colors } from "../../utils/Colors";

// interface IProps extends TouchableOpacityProperties {
//   navigation: NavigationScreenProp<
//     NavigationRoute<NavigationStackScreenOptions>
//   >;
//   backToInitial?: boolean;
//   color?;
//   onBack?: () => void;
// }
// interface IStates {}

export class ButtonNavBack extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { navigation, color, backToInitial } = this.props;
    const style = {
      paddingLeft: 8,
      ...this.props.style
    };
    const goBack = async () => {
      const params = navigation.state.params;
      if (backToInitial) {
        // navigation.goBack('HomePage');
        navigation.popToTop();
      } else if (params && params.onBack) {
        params.onBack();
        navigation.goBack();
      } else {
        navigation.goBack();
      }
    };

    if (navigation.goBack) {
      return (
        <TouchableOpacity {...this.props} onPress={goBack} style={style}>
          <Icon
            color={color ? color : colors.PRIMARY_COLOR}
            name="arrow-left"
            type={"material-community"}
            size={28}
          />
        </TouchableOpacity>
      );
    }
    return <View />;
  }
}
