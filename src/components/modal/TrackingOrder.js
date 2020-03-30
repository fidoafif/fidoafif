import { Icon } from 'react-native-elements';
import { StatusBar, ActivityIndicator } from 'react-native';
import _ from 'lodash';
import React, { Component } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { apiGetTracking } from '../../utils/api';
import { colors } from '../../utils/Colors';
import { MediumText } from '../texts/MediumText';
import { ViewCenter } from '../ViewCenter';
import { AwareScroll } from '../AwareScroll';
import { NormalText } from '../texts/NormalText';

// interface IProps {
//   label;
//   value;
//   provideAll?: boolean;
//   onSelect: (item) => void;
// }

// interface IState {
//   modalVisible: boolean;
//   loading: boolean;
//   cities | null;
//   itemValue;
//   filteredItemValue | null;
//   error;
// }

export class TrackingOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      loading: false,
      id_transaction: '',
      error: '',
    };

    this.openModal = this.openModal.bind(this);
    this.fetchTrack = this.fetchTrack.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  async componentWillMount() {
    const { order } = this.props;

    this.setState({ id_transaction: order.id_transaction });
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
          <MediumText>{`Tracking Order`}</MediumText>
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={this.onModalClose}
        >
          <View style={{ flex: 1, backgroundColor: '#33333369' }}>
            <TouchableOpacity onPress={this.closeModal} style={{ flex: 1 }} />
            <View
              style={{
                height: 300,
                backgroundColor: colors.WHITE_COLOR,
              }}
            >
              {this.renderModalHeader()}
              <AwareScroll>
                <View style={{ padding: 16 }}>{this.renderModalBody()}</View>
              </AwareScroll>
            </View>
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
          {`Tracking Order`}
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
    const { loading, trackData } = this.state;
    if (loading) {
      return (
        <ViewCenter style={{ flex: 1 }}>
          <ActivityIndicator />
        </ViewCenter>
      );
    }

    if (trackData) {
      console.log('trackData', trackData);
      const manifest = trackData.manifest ? trackData.manifest : [];
      return (
        <View style={{ flex: 1 }}>
          <MediumText style={{ paddingBottom: 8 }}>
            {`Delivery Status: `}
            <MediumText color={colors.PRIMARY_COLOR} bold={true}>
              {trackData.delivery_status.status}
            </MediumText>
          </MediumText>

          {manifest.length ? (
            manifest.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{ flexDirection: 'row', paddingTop: 8 }}
                >
                  <Icon
                    type="material"
                    name="lens"
                    size={16}
                    color={colors.BORDER_COLOR}
                    style={{ paddingTop: 4 }}
                  />
                  <View style={{ paddingLeft: 8 }}>
                    <MediumText>{item.manifest_description}</MediumText>
                    <NormalText color={colors.BORDER_COLOR}>{`${
                      item.manifest_date
                    } ${item.manifest_time}`}</NormalText>
                  </View>
                </View>
              );
            })
          ) : (
            <View />
          )}
        </View>
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
    this.setState({ modalVisible: true });
    await this.fetchTrack();
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  async fetchTrack() {
    const { id_transaction } = this.state;
    try {
      this.setState({ loading: true });
      const response = await apiGetTracking(id_transaction);

      this.setState({ trackData: response });
    } catch (error) {
      // return null;
      this.setState({ loading: false, error: 'error' });
    } finally {
      this.setState({ loading: false });
    }
  }
}

const localStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'flex-end',
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
