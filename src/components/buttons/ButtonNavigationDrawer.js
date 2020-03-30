import { Icon } from "react-native-elements";
import React, { Component } from "react";
import {
  TouchableOpacity,
  TouchableOpacityProperties,
  View,
  ViewStyle
} from "react-native";
import {
  DrawerNavigationState,
  NavigationParams,
  NavigationRoute,
  NavigationScreenProp,
  NavigationStackScreenOptions
} from "react-navigation";
import { colors } from "../../utils/Colors";

// interface IProps extends TouchableOpacityProperties {
//   navigation:
//     | NavigationScreenProp<NavigationRoute<NavigationStackScreenOptions>>
//     | NavigationScreenProp<DrawerNavigationState, NavigationParams>;
//   isClose?: boolean;
//   color?;
// }
// interface IStates {}

export class ButtonNavigationDrawer extends Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }
  render() {
    const { color } = this.props;
    const style = {
      ...this.props.style
    };
    return (
      <View style={viewStyle}>
        <TouchableOpacity {...this.props} style={style} onPress={this.onPress}>
          <Icon
            name="navicon"
            size={28}
            type={"evilicon"}
            color={color || colors.PRIMARY_COLOR}
          />
        </TouchableOpacity>
      </View>
    );
  }

  onPress() {
    const { navigation, isClose } = this.props;
    isClose ? navigation.closeDrawer() : navigation.openDrawer();
  }
}

const viewStyle = {
  paddingHorizontal: 10
};
