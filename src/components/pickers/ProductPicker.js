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
import { apiGetProducts } from '../../utils/api';
import { colors } from '../../utils/Colors';
import { AwareScroll } from '../AwareScroll';
import { MediumText } from '../texts/MediumText';
import { NormalText } from '../texts/NormalText';
import { ViewCenter } from '../ViewCenter';

// interface IProps {
//   label;
//   value;
//   onSelect: (item) => void;
// }

// interface IState {
//   modalVisible: boolean;
//   loading: boolean;
//   products | null;
//   error;
// }

export class ProductPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      loading: false,
      products: [],
      error: '',
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  async componentDidMount() {
    try {
      this.setState({ loading: true });

      const response = await apiGetProducts();

      if (response.data.length) {
        this.setState({ products: response.data });
      }
    } catch (error) {
      // return null;
      this.setState({ loading: false, error: 'error' });
    } finally {
      this.setState({ loading: true });
    }
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
            {this.props.value ? this.props.value.name : this.props.label}
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
    const { products } = this.state;

    if (products.length) {
      return (
        <AwareScroll>
          {products.map(item => {
            const select = () => {
              this.props.onSelect(item);
              this.closeModal();
            };

            return (
              <TouchableOpacity
                key={item.id_product}
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

    return (
      <ViewCenter style={{ flex: 1 }}>
        <MediumText>{'Empty'}</MediumText>
      </ViewCenter>
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
