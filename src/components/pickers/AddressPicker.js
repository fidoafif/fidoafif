import { Icon } from "react-native-elements";
import { StatusBar } from "react-native";
import React, { Component } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { apiGetCity, apiGetDistrict, apiGetProvince } from "../../utils/api";
import { colors } from "../../utils/Colors";
import { AwareScroll } from "../AwareScroll";
import { MediumText } from "../texts/MediumText";
import { ViewCenter } from "../ViewCenter";
import { ListItem } from "../ListItem";

// interface IProps {
//   textFieldLabel;
//   type: 'province' | 'city' | 'district' | 'posCode';
//   provinceId?;
//   cityId?;
//   renderItem: (item, close: () => void) => JSX.Element;
//   renderData: () => JSX.Element;
// }

// interface IState {
//   modalVisible: boolean;
//   loading: boolean;
//   itemList | null;
// }

export class AddressPicker extends Component {
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
          <ListItem leftContent={this.props.textFieldLabel}>
            <View style={{ flexDirection: "row" }}>
              {this.props.renderData()}
              <Icon type={"ionicon"} name="ios-arrow-forward" size={18} />
            </View>
          </ListItem>
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
          {this.props.textFieldLabel}
        </MediumText>
        <TouchableOpacity onPress={this.closeModal}>
          <Icon
            type={"material"}
            color={colors.NEGATIVE_COLOR}
            name="close"
            size={24}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderModalBody() {
    const { loading, itemList } = this.state;
    if (loading) {
      return (
        <ViewCenter style={{ flex: 1 }}>
          <ActivityIndicator />
        </ViewCenter>
      );
    }

    return (
      <AwareScroll>
        {itemList.map(item => {
          return this.props.renderItem(item, this.closeModal);
        })}
      </AwareScroll>
    );
  }

  async fetchAddressData() {
    const { type, provinceId, cityId } = this.props; // 'province' | 'city' | 'district' | 'posCode'

    if (type === "province") {
      try {
        this.setState({ loading: true });
        const response = await apiGetProvince();
        if (response && response.rajaongkir && response.rajaongkir.results) {
          this.setState({ itemList: response.rajaongkir.results });
        }
      } catch (error) {
        Alert.alert("Cannot get data province");
      } finally {
        this.setState({ loading: false });
      }
    }

    if (type === "city" && provinceId) {
      try {
        this.setState({ loading: true });
        const response = await apiGetCity(provinceId);
        if (response && response.rajaongkir && response.rajaongkir.results) {
          this.setState({ itemList: response.rajaongkir.results });
        }
      } catch (error) {
        Alert.alert("Cannot get data province");
      } finally {
        this.setState({ loading: false });
      }
    }
    if (type === "district" && cityId) {
      try {
        this.setState({ loading: true });
        const response = await apiGetDistrict(cityId);
        if (response && response.rajaongkir && response.rajaongkir.results) {
          this.setState({ itemList: response.rajaongkir.results });
        }
      } catch (error) {
        Alert.alert("Cannot get data province");
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  onModalClose() {
    //
  }

  async openModal() {
    const { type, provinceId, cityId } = this.props;

    if (type === "province") {
      Keyboard.dismiss();
      this.setState({ modalVisible: true });
      await this.fetchAddressData();
    } else if (type === "city") {
      if (provinceId) {
        Keyboard.dismiss();
        this.setState({ modalVisible: true });
        await this.fetchAddressData();
      } else {
        Alert.alert("Please Select Province");
      }
    } else if (type === "district") {
      if (cityId) {
        Keyboard.dismiss();
        this.setState({ modalVisible: true });
        await this.fetchAddressData();
      } else {
        Alert.alert("Please Select City");
      }
    }
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
