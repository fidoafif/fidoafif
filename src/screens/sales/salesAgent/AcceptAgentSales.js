// @@flow

import { inject, observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { AwareScroll } from '../../../components/AwareScroll';
import { ButtonNavBack } from '../../../components/buttons/ButtonNavBack';
import { Loading } from '../../../components/modal/Loading';
import { DefaultPicker } from '../../../components/pickers/DefaultPicker';
import { Disc3TierPicker } from '../../../components/pickers/Disc3TierPicker';
import TextFieldDefault from '../../../components/textField/TextFieldDefault';
import { HeaderText } from '../../../components/texts/HeaderText';
import { MediumText } from '../../../components/texts/MediumText';
import { ViewCenter } from '../../../components/ViewCenter';
import { apiPostAgentMeta } from '../../../utils/api';
import { colors } from '../../../utils/Colors';

// interface IProps extends NavigationScreenProps {
//   homeStore;
// }

// interface IState {
//   loading: boolean;
//   data;
//   priceOption;
//   laurent;
//   nonLaurent;
//   codeArea;
// }

const price_options = [{ id: 0, name: 'Jawa' }, { id: 1, name: 'Luar Jawa' }];

@inject('homeStore')
@observer
class AcceptAgentSales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: null,
      priceOption: null,
      laurent: null,
      nonLaurent: null,
      codeArea: '',
    };

    this.priceOptionOnSelect = this.priceOptionOnSelect.bind(this);

    this.setCodeArea = this.setCodeArea.bind(this);
    this.setLaurent = this.setLaurent.bind(this);
    this.setNonLaurent = this.setNonLaurent.bind(this);
    this.acceptAgent = this.acceptAgent.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <ButtonNavBack navigation={navigation} />,
      headerTitle: <HeaderText>{'Accept Agent'}</HeaderText>,
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
    const { params } = this.props.navigation.state;

    if (params && params.data) {
      // console.log(params.data);
      this.setCodeArea(params.data.code);
      this.setState({ data: params.data });
    }
  }

  render() {
    const { loading } = this.state;

    return (
      <AwareScroll>
        <ViewCenter
          style={{
            marginVertical: 20,
            paddingHorizontal: 8,
            flex: 1,
          }}
        >
          <DefaultPicker
            label={'Opsi Harga'}
            items={price_options}
            onSelect={this.priceOptionOnSelect}
            value={this.state.priceOption ? this.state.priceOption.name : ''}
          />
          <Disc3TierPicker
            label={'Laurent'}
            onSelect={this.setLaurent}
            value={this.state.laurent}
          />
          <Disc3TierPicker
            label={'Non Laurent'}
            onSelect={this.setNonLaurent}
            value={this.state.nonLaurent}
          />

          <View style={{ width: '100%' }}>
            <MediumText>{'Kode Area'}</MediumText>
            <MediumText
              style={{
                backgroundColor: colors.BACKGROUND_FIELD_COLOR,
                padding: 8,
              }}
            >
              {this.state.data && this.state.data.code
                ? this.state.data.code
                : '-'}
            </MediumText>
          </View>
        </ViewCenter>
        <View>
          <TouchableOpacity onPress={this.acceptAgent}>
            <ViewCenter
              style={{ padding: 16, backgroundColor: colors.PRIMARY_COLOR }}
            >
              <MediumText color={colors.WHITE_COLOR}>{'Save'}</MediumText>
            </ViewCenter>
          </TouchableOpacity>
        </View>
        <Loading visible={loading} />
      </AwareScroll>
    );
  }

  setCodeArea(value) {
    this.setState({ codeArea: value });
  }
  setLaurent(value) {
    this.setState({ laurent: value });
  }
  setNonLaurent(value) {
    this.setState({ nonLaurent: value });
  }

  priceOptionOnSelect(value) {
    this.setState({ priceOption: value });
  }

  async acceptAgent() {
    const { navigation } = this.props;
    const { params } = this.props.navigation.state;

    const { data, priceOption, laurent, nonLaurent, codeArea } = this.state;

    if (data && priceOption && laurent && nonLaurent && codeArea) {
      try {
        this.setState({ loading: true });
        const response = await apiPostAgentMeta(
          data.user,
          priceOption.id,
          `${laurent.param1}+${laurent.param2}+${laurent.param3}`,
          `${nonLaurent.param1}+${nonLaurent.param2}+${nonLaurent.param3}`,
          codeArea + '',
        );
        // console.warn(response);
        if (response) {
          if (params && params.onBack) {
            params.onBack();
            navigation.goBack();
          }
        }
      } catch (error) {
        // console.warn(error);
      } finally {
        this.setState({ loading: false });
      }
    } else if (!priceOption) {
      Alert.alert('Failed', 'Please choose price option');
    } else if (!laurent) {
      Alert.alert('Failed', 'Please add laurent');
    } else if (!nonLaurent) {
      Alert.alert('Failed', 'Please add non laurent');
    } else if (!codeArea) {
      Alert.alert('Failed', 'Please add code area');
    }
  }
}

export default AcceptAgentSales;
