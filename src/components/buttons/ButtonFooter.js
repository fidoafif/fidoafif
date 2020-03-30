import React, { Component } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacityProperties,
  View
} from "react-native";
import { colors } from "../../utils/Colors";
import { LargeText } from "../texts/LargeText";
import { ButtonText } from "./ButtonText";
import { ButtonOutline } from "./ButtonOutline";

// interface IProps extends TouchableOpacityProperties {
//   leftOnPress: () => void;
//   rightOnPress: () => void;
//   leftLabel;
//   rightLabel;
// }
// interface IStates {}

export class ButtonFooter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ flexDirection: "row" }}>
        <ButtonOutline
          style={styles.buttonLeft}
          onPress={this.props.leftOnPress}
        >
          <LargeText style={{ color: colors.GOLD_COLOR, fontWeight: "bold" }}>
            {this.props.leftLabel}
          </LargeText>
        </ButtonOutline>
        <ButtonOutline
          onPress={this.props.rightOnPress}
          style={styles.buttonRight}
        >
          <LargeText style={{ color: colors.WHITE_COLOR, fontWeight: "bold" }}>
            {this.props.rightLabel}
          </LargeText>
        </ButtonOutline>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.GOLD_COLOR,
    width: 90,
    height: 25,
    borderRadius: 3
  },
  buttonRight: {
    width: Dimensions.get("screen").width / 2 - 8,
    backgroundColor: colors.GOLD_COLOR,
    height: 50,
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginRight: 5
  },
  buttonLeft: {
    width: Dimensions.get("screen").width / 2 - 8,
    backgroundColor: colors.WHITE_COLOR,
    height: 50,
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    borderColor: colors.GOLD_COLOR,
    borderWidth: 1,
    marginHorizontal: 5
  }
});
