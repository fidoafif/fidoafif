import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../utils/Colors";
import { MediumText } from "./texts/MediumText";

// interface IProps {
//   leftContent?;
// }

export class ListItem extends Component {
  render() {
    return (
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: colors.GREY_COLOR_LIGHT
        }}
      >
        <View style={styles.section}>
          <MediumText style={styles.box}>{this.props.leftContent}</MediumText>
          <View style={styles.box2}>{this.props.children}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  section: {
    margin: 15,
    flexDirection: "row",
    display: "flex",
    alignItems: "center"
  },
  box: {
    color: colors.GREY_COLOR
  },
  box2: {
    flex: 1,
    alignItems: "flex-end",
    color: colors.GREY_COLOR
  }
});
