import { Icon } from "react-native-elements";
import { inject, observer } from "mobx-react/native";
import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProperties,
  View,
  ViewStyle
} from "react-native";
import { colors } from "../../utils/Colors";

// interface IProps extends TouchableOpacityProperties {
//   cartStore?;
//   color?;
//   onBack?: () => void;
// }
// interface IStates {}

@inject("cartStore")
@observer
class ButtonNavCart extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { color, cartStore } = this.props;
    const style = {
      paddingRight: 8,
      ...this.props.style
    };

    return (
      <TouchableOpacity {...this.props} style={style}>
        <Icon
          color={color ? color : colors.PRIMARY_COLOR}
          name="cart-outline"
          type={"material-community"}
          size={cartStore.totalItems ? 24 : 28}
        />
        {cartStore.totalItems ? (
          <View
            style={{
              backgroundColor: colors.PRIMARY_COLOR,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 4,
              paddingVertical: 1
            }}
          >
            <Text
              style={{
                color: colors.WHITE_COLOR,
                fontSize: 10,
                fontWeight: "600"
              }}
            >
              {Number(cartStore.totalItems) > 99 ? "99+" : cartStore.totalItems}
            </Text>
          </View>
        ) : (
          <View />
        )}
      </TouchableOpacity>
    );
  }
}

export { ButtonNavCart };
