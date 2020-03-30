import React, { Component } from "react";
import { ActivityIndicator, Modal } from "react-native";
import { colors } from "../../utils/Colors";
import { ViewCenter } from "../ViewCenter";

export class Loading extends Component {
  render() {
    const { visible } = this.props;
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {}}
      >
        <ViewCenter style={{ flex: 1, backgroundColor: "#33333369" }}>
          <ActivityIndicator color={colors.WHITE_COLOR} />
        </ViewCenter>
      </Modal>
    );
  }
}
