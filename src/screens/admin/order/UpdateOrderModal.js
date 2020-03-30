import React, { Component } from "react";
import { FlatList, Modal, TouchableOpacity, View } from "react-native";
import { AwareScroll } from "../../../components/AwareScroll";
import TextFieldDefault from "../../../components/textField/TextFieldDefault";
import { MediumText } from "../../../components/texts/MediumText";
import { NormalText } from "../../../components/texts/NormalText";
import { ViewCenter } from "../../../components/ViewCenter";
import { apiUpdateTransaction } from "../../../utils/api";
import { colors } from "../../../utils/Colors";
import { formatDataColumn } from "../../../utils/FormatDataColumn";
// interface IProps {
//   visible: boolean;
//   dataOrder | null;
//   orderStatus | null;
//   trackingNumber | null;
//   close: () => void;
//   updateSuccess: () => void;
//   setTrackingNumber: (value) => void;
//   setOrderStatus: (value) => void;
// }
// interface IState {}

const statusOrder = [
  { id: 0, name: "Unpaid" },
  { id: 1, name: "Processed" },
  { id: 2, name: "Done" },
  { id: 3, name: "Expired" },
  { id: 4, name: "Waiting" }
];
export class UpdateOrderModal extends Component {
  ref;

  constructor(props) {
    super(props);
    this.renderStatusPricker = this.renderStatusPricker.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
  }
  render() {
    const { visible } = this.props;

    const numColumns = 2;
    const _keyExtractor = (item, index) => {
      return `${index}`;
    };

    const _ref = c => {
      this.ref = c;
    };

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={this.onClose}
      >
        <View style={{ flex: 1, backgroundColor: "#33333369" }}>
          <TouchableOpacity onPress={this.props.close} style={{ flex: 1 }} />
          <View
            style={{
              height: 300,
              backgroundColor: colors.WHITE_COLOR
            }}
          >
            <AwareScroll>
              <View style={{ padding: 16 }}>
                <TextFieldDefault
                  placeholder={"Tracking Number(optional)"}
                  inputOnChange={this.props.setTrackingNumber}
                />

                <MediumText>{"Status"}</MediumText>
                <View style={{ flexDirection: "row" }}>
                  <FlatList
                    ref={_ref}
                    data={formatDataColumn(statusOrder, numColumns)}
                    renderItem={this.renderStatusPricker}
                    keyExtractor={_keyExtractor}
                    numColumns={numColumns}
                    extraData={this.props}
                  />
                </View>
              </View>
            </AwareScroll>
            <TouchableOpacity onPress={this.updateOrder}>
              <ViewCenter
                style={{ padding: 16, backgroundColor: colors.PRIMARY_COLOR }}
              >
                <MediumText color={colors.WHITE_COLOR}>
                  {"Update Order"}
                </MediumText>
              </ViewCenter>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  renderStatusPricker({ item }) {
    const onPress = () => {
      this.props.setOrderStatus(item);
    };

    if (item.empty === true) {
      return (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            margin: 4,
            backgroundColor: "transparent"
          }}
        />
      );
    }

    return (
      <View
        key={item.id}
        style={{
          flex: 1,

          margin: 4
        }}
      >
        <TouchableOpacity onPress={onPress}>
          <ViewCenter
            style={{
              padding: 8,
              borderColor:
                this.props.orderStatus === item
                  ? colors.PRIMARY_COLOR
                  : colors.BORDER_COLOR,
              borderWidth: 0.5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,

              elevation: 2
            }}
          >
            <NormalText>{item.name}</NormalText>
          </ViewCenter>
        </TouchableOpacity>
      </View>
    );
  }

  async updateOrder() {
    const { orderStatus, trackingNumber, dataOrder } = this.props;
    try {
      this.setState({ loading: true });
      const response = await apiUpdateTransaction(
        dataOrder.id_transaction,
        trackingNumber ? trackingNumber : "",
        orderStatus ? orderStatus.id : ""
      );

      if (response && Number(response.status) === 201) {
        this.props.updateSuccess();
      }
    } catch (error) {
      // return null;
    } finally {
      this.setState({ loading: false });
    }
  }

  onClose() {
    //
  }
}
