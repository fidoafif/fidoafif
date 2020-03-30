import { Icon } from "react-native-elements";
import { StatusBar } from "react-native";
import React, { Component } from "react";
import {
  Dimensions,
  Keyboard,
  Modal,
  Platform,
  ShadowStyleIOS,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import { colors } from "../utils/Colors";
import { ButtonSmall } from "./buttons/SmallButton";
import TextField from "./TextInput";

// interface IProps {
//   itemList | null;
//   itemValue?;
//   textFieldLabel?;
//   isDefault?: boolean;
//   fieldOnBlur?: () => void;
//   fieldOnFocus?: () => void;
//   fieldOnSelect: (data) => void;
//   showData;
//   type?: 'icon' | 'button' ;
//   btnLabel?;
// }

// interface IState {
//   modalVisible: boolean;
//   itemValue;
//   filteredItemValue | null;
// }

export class PickerItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      itemValue: "",
      filteredItemValue: ""
    };

    this.openModal = this.openModal.bind(this);
    this.onModalBack = this.onModalBack.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.itemOnchangeText = this.itemOnchangeText.bind(this);
    this.clearField = this.clearField.bind(this);
  }
  render() {
    const renderItemList = () => {
      const {} = this.state;
      const { itemList, showData } = this.props;
      if (itemList) {
        return (
          <View
            style={{
              paddingHorizontal: 16,
              backgroundColor: colors.GREY_COLOR_LIGHT
            }}
          >
            {itemList.map(item => {
              const select = () => {
                this.props.fieldOnSelect(item);
                this.setState({ modalVisible: false });
              };
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={select}
                  style={{ paddingVertical: 16 }}
                >
                  <Text>{`${item[showData]}`}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      }
    };

    return (
      <View>
        {this.props.type === "button" ? (
          <ButtonSmall
            onPress={this.onFocus}
            width={100}
            label={this.props.btnLabel}
          />
        ) : (
          <TouchableOpacity onPress={this.onFocus}>
            <Icon type={"ionicon"} name="ios-arrow-forward" size={34} />
          </TouchableOpacity>
        )}
        {this.state.modalVisible ? (
          <Modal
            animationType="none"
            visible={this.state.modalVisible}
            transparent={false}
            onRequestClose={this.onModalClose}
            onDismiss={this.onModalClose}
          >
            <View style={localStyles.modalContainer}>
              <View
                style={[
                  styles.navbarContainer,
                  localStyles.modalHeaderContainer
                ]}
              >
                <TouchableOpacity
                  onPress={this.onModalBack}
                  style={localStyles.leftNavButton}
                >
                  <Icon
                    type={"material"}
                    color={colors.WHITE_COLOR}
                    name="arrow-back"
                    size={24}
                  />
                </TouchableOpacity>
                <Text style={localStyles.modalHeader}>
                  {this.props.textFieldLabel}
                </Text>
              </View>
              <View style={localStyles.modalContent}>
                <View
                  style={[
                    localStyles.modalItem,
                    {
                      borderBottomColor: colors.GREY_COLOR
                    }
                  ]}
                >
                  <TextField
                    value={this.state.itemValue}
                    placeholder={`Cari ${this.props.textFieldLabel}`}
                    onChangeText={this.itemOnchangeText}
                    style={{ width: Dimensions.get("window").width - 40 }}
                  />
                  {this.state.itemValue !== "" && (
                    <TouchableOpacity
                      style={{ padding: 8 }}
                      onPress={this.clearField}
                    >
                      <Icon
                        type={"material"}
                        color={colors.NEGATIVE_COLOR}
                        name="clear"
                        size={24}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                {renderItemList()}
              </View>
            </View>
          </Modal>
        ) : null}
      </View>
    );
  }

  onModalClose() {
    // tslint:disable-next-line:no-console
    console.log("Modal Closed!");
  }
  clearField() {
    this.setState({ itemValue: "", filteredItemValue: null });
  }

  onModalBack() {
    this.setState({
      modalVisible: false
    });
  }

  openModal() {
    this.setState({ modalVisible: true });
  }

  itemOnchangeText(itemValue) {
    this.setState({
      itemValue
    });

    if (!this.props.itemList || itemValue.length === 0) {
      this.setState({
        filteredItemValue: null
      });

      return;
    }
  }

  onFocus() {
    Keyboard.dismiss();
    if (this.props.fieldOnFocus) {
      this.props.fieldOnFocus();
    }
    this.setState({
      modalVisible: true
    });
  }
}
const shadowIOS = {
  shadowColor: "black",
  shadowOffset: { width: 2, height: 2 },
  shadowRadius: 3,
  shadowOpacity: 0.4
};

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
  },
  navbarContainer: {
    height: Platform.OS === "android" ? 48 : 64,
    ...shadowIOS
  }
});

const localStyles = StyleSheet.create({
  modalContainer: {
    flex: 1
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
