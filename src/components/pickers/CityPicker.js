import { Icon } from 'react-native-elements';
import { StatusBar } from 'react-native';
import _ from 'lodash';
import React, { Component } from 'react';
import {
  FlatList,
  Keyboard,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { apiGetAllCity, apiGetCities } from '../../utils/api';
import { colors } from '../../utils/Colors';
import { AwareScroll } from '../AwareScroll';
import TextField from '../TextInput';
import { MediumText } from '../texts/MediumText';
import { NormalText } from '../texts/NormalText';
import { ViewCenter } from '../ViewCenter';

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

export class CityPicker extends Component {
  ref;
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      loading: false,
      cities: [],
      itemValue: '',
      filteredItemValue: '',
      error: '',
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.listItem = this.listItem.bind(this);
    this.itemOnchangeText = this.itemOnchangeText.bind(this);
    this.clearField = this.clearField.bind(this);
  }

  async componentDidMount() {
    try {
      this.setState({ loading: true });

      const response = this.props.provideAll
        ? await apiGetAllCity()
        : await apiGetCities();

      if (this.props.provideAll) {
        if (response.rajaongkir && response.rajaongkir.results.length) {
          this.setState({ cities: response.rajaongkir.results });
        }
      } else {
        if (response.data.length) {
          this.setState({ cities: response.data });
        }
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
            {this.props.value ? this.props.value.city_name : this.props.label}
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
                {this.props.provideAll ? (
                  <View
                    style={{
                      paddingVertical: 8,
                      backgroundColor: colors.WHITE_COLOR,
                      height: 50,
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      borderBottomColor: colors.BORDER_COLOR,
                    }}
                  >
                    <TextField
                      value={this.state.itemValue}
                      placeholder={`Cari ${this.props.label}`}
                      onChangeText={this.itemOnchangeText}
                      style={{ flex: 1 }}
                    />
                    {this.state.itemValue !== '' && (
                      <TouchableOpacity
                        style={{ padding: 8 }}
                        onPress={this.clearField}
                      >
                        <Icon
                          type={'material'}
                          color={colors.NEGATIVE_COLOR}
                          name="clear"
                          size={24}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                ) : (
                  <View />
                )}
                {this.renderModalBody()}
              </View>
            </ViewCenter>
          </View>
        </Modal>
      </View>
    );
  }

  clearField() {
    this.setState({ itemValue: '', filteredItemValue: null });
  }

  itemOnchangeText(itemValue) {
    this.setState({
      itemValue,
    });

    const filteredItemValue = _.filter(this.state.cities, item => {
      return item.city_name.toLowerCase().indexOf(itemValue.toLowerCase()) > -1;
    });

    this.setState({
      filteredItemValue,
    });
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
    const { cities, filteredItemValue, itemValue } = this.state;

    const _keyExtractor = (item, index) => {
      return `${index}`;
    };

    const _ref = c => {
      this.ref = c;
    };

    if (itemValue && filteredItemValue.length) {
      return (
        <FlatList
          ref={_ref}
          data={[...filteredItemValue]}
          renderItem={this.listItem}
          keyExtractor={_keyExtractor}
        />
        // <AwareScroll>
        //   {filteredItemValue.map((item) => {
        //     const select = () => {
        //       this.props.onSelect(item);
        //       this.closeModal();
        //     };

        //     return (
        //       <TouchableOpacity
        //         key={this.props.provideAll ? item.city_id : item.id_city}
        //         onPress={select}
        //         style={{
        //           paddingVertical: 10,
        //           borderColor: colors.BORDER_COLOR,
        //           paddingHorizontal: 8,
        //         }}
        //       >
        //         <NormalText>{item.city_name}</NormalText>
        //       </TouchableOpacity>
        //     );
        //   })}
        // </AwareScroll>
      );
    }
    if (cities.length) {
      return (
        <AwareScroll>
          {cities.map(item => {
            const select = () => {
              this.props.onSelect(item);
              this.closeModal();
            };

            return (
              <TouchableOpacity
                key={this.props.provideAll ? item.city_id : item.id_city}
                onPress={select}
                style={{
                  paddingVertical: 10,
                  borderColor: colors.BORDER_COLOR,
                  paddingHorizontal: 8,
                }}
              >
                <NormalText>{item.city_name}</NormalText>
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

  listItem({ item }) {
    const select = () => {
      this.props.onSelect(item);
      this.closeModal();
    };

    return (
      <TouchableOpacity
        // key={this.props.provideAll ? item.city_id : item.id_city}
        onPress={select}
        style={{
          paddingVertical: 10,
          borderColor: colors.BORDER_COLOR,
          paddingHorizontal: 8,
        }}
      >
        <NormalText>{item.city_name}</NormalText>
      </TouchableOpacity>
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
