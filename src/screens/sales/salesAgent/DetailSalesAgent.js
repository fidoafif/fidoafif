// @@flow

import { inject, observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { AwareScroll } from '../../../components/AwareScroll';
import { ButtonNavBack } from '../../../components/buttons/ButtonNavBack';
import { Loading } from '../../../components/modal/Loading';
import { HeaderText } from '../../../components/texts/HeaderText';
import { MediumText } from '../../../components/texts/MediumText';
import { ViewCenter } from '../../../components/ViewCenter';
import { colors } from '../../../utils/Colors';

// interface IProps extends NavigationScreenProps {
//   homeStore;
// }

// interface IState {
//   loading: boolean;
//   data;
// }

@inject('homeStore')
@observer
class DetailSalesAgent extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, data: null };

    this.acceptAgent = this.acceptAgent.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <ButtonNavBack navigation={navigation} />,
      headerTitle: <HeaderText>{'Detail Agent'}</HeaderText>,
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
      this.setState({ data: params.data });
    }
  }

  render() {
    const { loading, data } = this.state;

    return (
      <AwareScroll>
        {data ? (
          <View>
            <View style={{ padding: 8 }}>
              <MediumText>{'Name'}</MediumText>
              <MediumText
                style={{
                  backgroundColor: colors.BACKGROUND_FIELD_COLOR,
                  padding: 8,
                }}
              >
                {data.name}
              </MediumText>
            </View>
            <View style={{ padding: 8 }}>
              <MediumText>{'Email'}</MediumText>
              <MediumText
                style={{
                  backgroundColor: colors.BACKGROUND_FIELD_COLOR,
                  padding: 8,
                }}
              >
                {data.email}
              </MediumText>
            </View>
            <View style={{ padding: 8 }}>
              <MediumText>{'Phonenumber'}</MediumText>
              <MediumText
                style={{
                  backgroundColor: colors.BACKGROUND_FIELD_COLOR,
                  padding: 8,
                }}
              >
                {data.phone}
              </MediumText>
            </View>
            <View style={{ padding: 8 }}>
              <MediumText>{'Kode Area'}</MediumText>
              <MediumText
                style={{
                  backgroundColor: colors.BACKGROUND_FIELD_COLOR,
                  padding: 8,
                }}
              >
                {data.code}
              </MediumText>
            </View>
            <View style={{ padding: 8 }}>
              <MediumText>{'Telephone'}</MediumText>
              <MediumText
                style={{
                  backgroundColor: colors.BACKGROUND_FIELD_COLOR,
                  padding: 8,
                }}
              >
                {data.telp}
              </MediumText>
            </View>
            <View style={{ padding: 8 }}>
              <MediumText>{'Contact'}</MediumText>
              <MediumText
                style={{
                  backgroundColor: colors.BACKGROUND_FIELD_COLOR,
                  padding: 8,
                }}
              >
                {data.contact}
              </MediumText>
            </View>
            <View style={{ padding: 8 }}>
              <MediumText>{'Owner NIK'}</MediumText>
              <MediumText
                style={{
                  backgroundColor: colors.BACKGROUND_FIELD_COLOR,
                  padding: 8,
                }}
              >
                {data.nik_owner}
              </MediumText>
            </View>
            <View style={{ padding: 8 }}>
              <MediumText>{'Owner SIUP'}</MediumText>
              <MediumText
                style={{
                  backgroundColor: colors.BACKGROUND_FIELD_COLOR,
                  padding: 8,
                }}
              >
                {data.siup_owner}
              </MediumText>
            </View>
            <View style={{ padding: 8 }}>
              <MediumText>{'NPWP'}</MediumText>
              <MediumText
                style={{
                  backgroundColor: colors.BACKGROUND_FIELD_COLOR,
                  padding: 8,
                }}
              >
                {data.npwp}
              </MediumText>
            </View>
            <View style={{ padding: 8 }}>
              <MediumText>{'Merchant Status'}</MediumText>
              <MediumText
                style={{
                  backgroundColor: colors.BACKGROUND_FIELD_COLOR,
                  padding: 8,
                }}
              >
                {data.merchant_status && data.merchant_status === '0'
                  ? 'PTPK'
                  : 'NON PTPK'}
              </MediumText>
            </View>
          </View>
        ) : (
          <View />
        )}
        {data && !data.status ? (
          <TouchableOpacity onPress={this.acceptAgent}>
            <ViewCenter
              style={{ padding: 16, backgroundColor: colors.PRIMARY_COLOR }}
            >
              <MediumText color={colors.WHITE_COLOR}>
                {'Accept Agent'}
              </MediumText>
            </ViewCenter>
          </TouchableOpacity>
        ) : (
          <View />
        )}
        <Loading visible={loading} />
      </AwareScroll>
    );
  }

  acceptAgent() {
    const { navigation } = this.props;
    const { params } = this.props.navigation.state;

    if (params) {
      navigation.replace('AcceptAgentSales', {
        data: this.state.data,
        onBack: params.onBack,
      });
    }
  }
}

export default DetailSalesAgent;
