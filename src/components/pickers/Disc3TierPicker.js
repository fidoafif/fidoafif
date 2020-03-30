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
import TextFieldDefault from '../textField/TextFieldDefault';
import { LargeText } from '../texts/LargeText';
import { MediumText } from '../texts/MediumText';
import { ViewCenter } from '../ViewCenter';

// interface IProps {
//   label;
//   value;
//   onSelect: (item) => void;
// }

// interface IState {
//   modalVisible: boolean;
//   param1;
//   param2;
//   param3;
// }

export class Disc3TierPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      param1: '0',
      param2: '0',
      param3: '0',
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.setParam1 = this.setParam1.bind(this);
    this.setParam2 = this.setParam2.bind(this);
    this.setParam3 = this.setParam3.bind(this);
    this.save = this.save.bind(this);
  }

  render() {
    const { modalVisible } = this.state;
    return (
      <View style={{ flex: 1, width: '100%' }}>
        <TouchableOpacity
          onPress={this.openModal}
          style={{
            flex: 1,
            width: '100%',
            height: 45,
            marginBottom: 16,
            borderColor: colors.BORDER_COLOR,
            borderWidth: 1.1,
            borderRadius: 4,
            justifyContent: 'center',
            paddingLeft: 8,
          }}
        >
          <MediumText
            color={this.props.value ? colors.BLACK_COLOR : colors.BORDER_COLOR}
          >
            {this.props.value
              ? `${this.props.value.param1}+${this.props.value.param2}+${
                  this.props.value.param3
                }`
              : this.props.label}
          </MediumText>
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
              <View style={{ width: '100%' }}>
                <TouchableOpacity onPress={this.save}>
                  <ViewCenter
                    style={{
                      padding: 8,
                      backgroundColor: colors.PRIMARY_COLOR,
                    }}
                  >
                    <MediumText color={colors.WHITE_COLOR}>{'Save'}</MediumText>
                  </ViewCenter>
                </TouchableOpacity>
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
      <View
        style={{
          marginVertical: 16,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{ width: 60, height: 35 }}>
          <TextFieldDefault
            placeholder={'%'}
            style={{ height: 35, paddingHorizontal: 8 }}
            inputOnChange={this.setParam1}
            value={this.state.param1}
            maxLength={3}
            keyboardType={'numeric'}
          />
        </View>
        <LargeText>{' + '}</LargeText>
        <View style={{ width: 60, height: 35 }}>
          <TextFieldDefault
            placeholder={'%'}
            style={{ height: 35, paddingHorizontal: 8 }}
            inputOnChange={this.setParam2}
            value={this.state.param2}
            maxLength={3}
            keyboardType={'numeric'}
          />
        </View>
        <LargeText>{' + '}</LargeText>
        <View style={{ width: 60, height: 35 }}>
          <TextFieldDefault
            placeholder={'%'}
            style={{ height: 35, paddingHorizontal: 8 }}
            inputOnChange={this.setParam3}
            value={this.state.param3}
            maxLength={3}
            keyboardType={'numeric'}
          />
        </View>
      </View>
    );
  }

  setParam1(param1) {
    if (Number(param1) <= 100) {
      this.setState({ param1 });
    }
  }
  setParam2(param2) {
    if (Number(param2) <= 100) {
      this.setState({ param2 });
    }
  }
  setParam3(param3) {
    if (Number(param3) <= 100) {
      this.setState({ param3 });
    }
  }
  save() {
    const { param1, param2, param3 } = this.state;
    const obj = { param1, param2, param3 };

    this.props.onSelect(obj);
    this.closeModal();
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
