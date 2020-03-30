import { Icon } from 'react-native-elements';
import { StatusBar } from 'react-native';
import React, { Component } from 'react';
import {
  Keyboard,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../utils/Colors';
import { AwareScroll } from '../AwareScroll';
import { MediumText } from '../texts/MediumText';
import { NormalText } from '../texts/NormalText';
import { ViewCenter } from '../ViewCenter';

// interface IProps {
//   label;
//   bankChoose;
//   onSelect: (item) => void;
// }

// interface IState {
//   modalVisible: boolean;
//   loading: boolean;
//   itemList | null;
// }

const banks = [
  { id: 0, name: 'BNI' },
  { id: 1, name: 'BCA' },
  { id: 2, name: 'MANDIRI' },
];

export class BankPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      loading: false,
      itemList: [],
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  render() {
    const { modalVisible } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={this.openModal}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <MediumText style={{ flex: 1, fontWeight: 'bold' }}>
              {this.props.label}
            </MediumText>
            <Icon type={'ionicon'} name="ios-arrow-forward" size={24} />
          </View>

          <View>
            <NormalText>
              {this.props.bankChoose
                ? this.props.bankChoose
                : 'Please select payment method'}
            </NormalText>
          </View>
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
                height: '60%',
                width: '80%',
                backgroundColor: colors.WHITE_COLOR,
                borderRadius: 4,
                justifyContent: 'flex-start',
              }}
            >
              {this.renderModalHeader()}

              <View style={{ flex: 1, width: '100%' }}>
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
          flexDirection: 'row',
          paddingHorizontal: 8,
          paddingVertical: 8,
          backgroundColor: colors.PRIMARY_COLOR,
          alignItems: 'center',
        }}
      >
        <MediumText color={colors.WHITE_COLOR} style={{ flex: 1 }}>
          {this.props.label}
        </MediumText>
        <TouchableOpacity onPress={this.closeModal}>
          <Icon
            type={'material'}
            color={colors.NEGATIVE_COLOR}
            name="close"
            size={24}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderModalBody() {
    return (
      <AwareScroll>
        {banks.map(item => {
          const select = () => {
            this.props.onSelect(item);
            this.closeModal();
          };

          return (
            <TouchableOpacity
              key={item.id}
              onPress={select}
              style={{
                paddingVertical: 10,
                borderColor: colors.BORDER_COLOR,
                paddingHorizontal: 8,
              }}
            >
              <NormalText>{item.name}</NormalText>
            </TouchableOpacity>
          );
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000047',
  },

  modalHeaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.PRIMARY_COLOR,
    flexDirection: 'row',
    paddingBottom: 25,
  },

  leftNavButton: {
    padding: 8,
    marginTop: StatusBar.currentHeight,
  },

  modalHeader: {
    color: colors.WHITE_COLOR,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 32,
    marginTop: StatusBar.currentHeight,
  },

  modalContent: {
    flex: 1,
    backgroundColor: colors.WHITE_COLOR,
  },

  item: {
    marginTop: 24,
    marginVertical: 8,
    backgroundColor: colors.WHITE_COLOR,
  },

  modalItem: {
    paddingVertical: 8,
    backgroundColor: colors.WHITE_COLOR,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
});
