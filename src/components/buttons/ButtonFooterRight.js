import React, { Component } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { colors } from "../../utils/Colors";
import { LargeText } from "../texts/LargeText";
import { ButtonText } from "./ButtonText";

// interface IProps {
//   rightLabel;
//   onPress: () => void;
//   oneButton?: boolean;
// }
// interface IStates {
//   oneButton: boolean;
// }

export class ButtonFooterRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oneButton: this.props.oneButton ? this.props.oneButton : false
    };
  }
  render() {
    return (
      <View>
        {this.state.oneButton ? (
          <View
            style={{
              borderTopWidth: 0.5,
              borderColor: colors.BORDER_COLOR,
              width: "100%"
            }}
          >
            <ButtonText
              style={styles.buttonRightOne}
              onPress={this.props.onPress}
            >
              <LargeText
                style={{ color: colors.WHITE_COLOR, fontWeight: "bold" }}
              >
                {this.props.rightLabel}
              </LargeText>
            </ButtonText>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              borderTopWidth: 0.5,
              borderColor: colors.BORDER_COLOR
            }}
          >
            <View style={styles.buttonLeft}>{this.props.children}</View>
            <ButtonText style={styles.buttonRight} onPress={this.props.onPress}>
              <LargeText
                style={{ color: colors.WHITE_COLOR, fontWeight: "bold" }}
              >
                {this.props.rightLabel}
              </LargeText>
            </ButtonText>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonRight: {
    width: Dimensions.get("screen").width / 2 - 8,
    backgroundColor: colors.PRIMARY_COLOR,
    height: 50,
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginRight: 5
  },
  buttonRightOne: {
    backgroundColor: colors.PRIMARY_COLOR,
    height: 50,
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginHorizontal: 15
  },
  buttonLeft: {
    width: Dimensions.get("screen").width / 2 - 8,
    backgroundColor: colors.WHITE_COLOR,
    height: 50,
    borderRadius: 5,
    padding: 15,
    marginHorizontal: 5
  }
});
