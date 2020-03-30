import { Icon } from "react-native-elements";
import { StatusBar } from "react-native";
import React, { Component } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { colors } from "../../utils/Colors";
import { AwareScroll } from "../AwareScroll";
import { MediumText } from "../texts/MediumText";
import { ViewCenter } from "../ViewCenter";

// interface IProps {
//   label;
//   shippingMethods;
//   renderItem: (item, close: () => void) => JSX.Element;
//   renderData: () => JSX.Element;
// }

// interface IState {
//   modalVisible: boolean;
//   loading: boolean;
//   itemList | null;
// }

export class ShippingPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      loading: false,
      itemList: []
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  render() {
    const { modalVisible } = this.state;

    return (
      <View>
        <TouchableOpacity onPress={this.openModal}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <MediumText style={{ flex: 1, fontWeight: "bold" }}>
              {this.props.label}
            </MediumText>

            <Icon type={"ionicon"} name="ios-arrow-forward" size={24} />
          </View>
          <View>{this.props.renderData()}</View>
        </TouchableOpacity>
        <Modal
          animationType="fade"
          visible={modalVisible}
          transparent={true}
          onRequestClose={this.onModalClose}
          onDismiss={this.onModalClose}
        >
          <View style={localStyles.modalContainer}>
            <ViewCenter
              style={{
                height: "60%",
                width: "80%",
                backgroundColor: colors.WHITE_COLOR,
                borderRadius: 4,
                justifyContent: "flex-start"
              }}
            >
              {this.renderModalHeader()}

              <View style={{ flex: 1, width: "100%" }}>
                {this.renderModalBody()}
              </View>
            </ViewCenter>
          </View>
        </Modal>
      </View>
    );
  }

  renderModalHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 8,
          paddingVertical: 8,
          backgroundColor: colors.PRIMARY_COLOR,
          alignItems: "center"
        }}
      >
        <MediumText color={colors.WHITE_COLOR} style={{ flex: 1 }}>
          {this.props.label}
        </MediumText>
        <TouchableOpacity onPress={this.closeModal}>
          <Icon color={colors.NEGATIVE_COLOR} name="close" size={24} />
        </TouchableOpacity>
      </View>
    );
  }

  renderModalBody() {
    const { shippingMethods } = this.props;
    if (!shippingMethods || !shippingMethods.length) {
      return (
        <ViewCenter style={{ flex: 1, paddingHorizontal: 16 }}>
          <MediumText>{"Silahkan lengkapi alamat pengiriman!"}</MediumText>
        </ViewCenter>
      );
    }

    return (
      <AwareScroll>
        {shippingMethods.map(item => {
          return this.props.renderItem(item, this.closeModal);
        })}
      </AwareScroll>
    );
  }

  onModalClose() {
    //
  }

  async openModal() {
    Keyboard.dismiss();
    this.setState({ modalVisible: true });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }
}

const localStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000047"
  },

  modalHeaderContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.PRIMARY_COLOR,
    flexDirection: "row",
    paddingBottom: 25
  },

  leftNavButton: {
    padding: 8,
    marginTop: StatusBar.currentHeight
  },

  modalHeader: {
    color: colors.WHITE_COLOR,
    textAlignVertical: "center",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    marginRight: 32,
    marginTop: StatusBar.currentHeight
  },

  modalContent: {
    flex: 1,
    backgroundColor: colors.WHITE_COLOR
  },

  item: {
    marginTop: 24,
    marginVertical: 8,
    backgroundColor: colors.WHITE_COLOR
  },

  modalItem: {
    paddingVertical: 8,
    backgroundColor: colors.WHITE_COLOR,
    height: 50,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottomWidth: 1
  }
});
