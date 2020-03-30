import { Icon } from 'react-native-elements';
import _ from 'lodash';
import { inject, observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  NavigationScreenProps,
  NavigationStackScreenOptions,
} from 'react-navigation';
import { AwareScroll } from '../../components/AwareScroll';
import { ButtonNavBack } from '../../components/buttons/ButtonNavBack';
import { Loading } from '../../components/modal/Loading';
import TextField from '../../components/TextInput';
import { HeaderText } from '../../components/texts/HeaderText';
import { MediumText } from '../../components/texts/MediumText';
import { NormalText } from '../../components/texts/NormalText';
import { ViewCenter } from '../../components/ViewCenter';
import { apiGetAllCity } from '../../utils/api';
import { colors } from '../../utils/Colors';

// interface IProps extends NavigationScreenProps {
//   registerResellerStore;
// }

// interface IState {
//   loading: boolean;
//   cities | null;
//   itemValue;
//   filteredItemValue | null;
//   error;
// }

@inject('registerResellerStore')
@observer
class SelectCityReseller extends Component {
  ref;
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      cities: [],
      itemValue: '',
      filteredItemValue: '',
      error: '',
    };

    this.listItem = this.listItem.bind(this);
    this.itemOnchangeText = this.itemOnchangeText.bind(this);
    this.clearField = this.clearField.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <ButtonNavBack navigation={navigation} />,
      headerTitle: <HeaderText>{'Select City'}</HeaderText>,
      headerRight: <View />,
      headerStyle: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
      },
    };
  };

  async componentDidMount() {
    try {
      this.setState({ loading: true });

      const response = await apiGetAllCity();

      if (response.rajaongkir && response.rajaongkir.results.length) {
        this.setState({ cities: response.rajaongkir.results });
      }
    } catch (error) {
      // return null;
      this.setState({ loading: false, error: 'error' });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading } = this.state;
    return (
      <View style={{ flex: 1, paddingHorizontal: 8 }}>
        <View
          style={{
            paddingVertical: 8,
            backgroundColor: colors.BACKGROUND_FIELD_COLOR,
            height: 40,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderRadius: 4,
            marginTop: 16,
          }}
        >
          <TextField
            value={this.state.itemValue}
            placeholder={'Find city'}
            onChangeText={this.itemOnchangeText}
            style={{ flex: 1, height: 40 }}
          />
          {this.state.itemValue !== '' && (
            <TouchableOpacity style={{ padding: 8 }} onPress={this.clearField}>
              <Icon
                type={'material'}
                color={colors.NEGATIVE_COLOR}
                name="clear"
                size={24}
              />
            </TouchableOpacity>
          )}
        </View>
        {this.renderModalBody()}
        <Loading visible={loading} />
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

  renderModalBody() {
    const store = this.props.registerResellerStore;
    const { cities, filteredItemValue, itemValue } = this.state;

    if (itemValue && filteredItemValue.length) {
      return (
        <AwareScroll>
          {filteredItemValue.map(item => {
            const select = () => {
              store.setCity(item);
              this.props.navigation.goBack();
            };

            return (
              <TouchableOpacity
                key={item.city_id}
                onPress={select}
                style={{
                  paddingVertical: 10,
                  borderColor: colors.BORDER_COLOR,
                  paddingHorizontal: 8,
                }}
              >
                <MediumText>{item.city_name}</MediumText>
              </TouchableOpacity>
            );
          })}
        </AwareScroll>
      );
    }
    if (cities.length) {
      return (
        <AwareScroll>
          {cities.map(item => {
            const select = () => {
              store.setCity(item);
              this.props.navigation.goBack();
            };

            return (
              <TouchableOpacity
                key={item.city_id}
                onPress={select}
                style={{
                  paddingVertical: 10,
                  borderColor: colors.BORDER_COLOR,
                  paddingHorizontal: 8,
                }}
              >
                <MediumText>{item.city_name}</MediumText>
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
    const store = this.props.registerResellerStore;
    const select = () => {
      store.setCity(item);
      this.props.navigation.goBack();
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
}
export default SelectCityReseller;
