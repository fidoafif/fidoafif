// @@flow

import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  NavigationScreenProps,
  NavigationStackScreenOptions,
} from 'react-navigation';
import { AwareScroll } from '../../../components/AwareScroll';
import { Loading } from '../../../components/modal/Loading';
import { HeaderText } from '../../../components/texts/HeaderText';
import { LargeText } from '../../../components/texts/LargeText';
import { NormalText } from '../../../components/texts/NormalText';
import { SmallText } from '../../../components/texts/SmallText';
import { apiGetDashBoard } from '../../../utils/api';
import { colors } from '../../../utils/Colors';
import { formatThousand } from '../../../utils/FormatThousand';
import { ViewCenter } from '../../../components/ViewCenter';

// interface IProps extends NavigationScreenProps {}

// interface IState {
//   loading: boolean;
//   data;
// }

export default class SalesDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: {
        finished: 0,
        paid_order: 0,
        total_order: 0,
        total_sales: 0,
        unfinished: 0,
        unpaid: 0,
      },
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      // headerLeft: <ButtonNavBack navigation={navigation} />,
      headerTitle: <HeaderText>{'Dashboard'}</HeaderText>,
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
      const response = await apiGetDashBoard();

      if (response.data) {
        this.setState({ data: response.data });
      }
    } catch (error) {
      // return null;
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading, data } = this.state;
    return (
      <AwareScroll>
        <View
          style={{
            flexDirection: 'column',
            paddingVertical: 16,
            borderBottomWidth: 0.5,
            borderBottomColor: colors.BORDER_COLOR,
          }}
        >
          <ViewCenter style={{ flexDirection: 'row' }}>
            <LargeText bold={true} color={colors.PRIMARY_COLOR}>
              {`Last Month Omzet Rp. ${formatThousand(
                Number(data.last_month_omzet),
              )}`}
            </LargeText>
          </ViewCenter>
          <View style={{ paddingTop: 16, flexDirection: 'row' }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <SmallText color={colors.GREY_COLOR}>{'Orders'}</SmallText>
              <LargeText
                color={colors.PRIMARY_COLOR}
                style={{ paddingTop: 16 }}
              >
                {data.total_order}
              </LargeText>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <NormalText color={colors.GREY_COLOR}>{'Sales'}</NormalText>
              <LargeText
                color={colors.PRIMARY_COLOR}
                style={{ paddingTop: 16 }}
              >
                {`Rp. ${formatThousand(Number(data.total_sales))}`}
              </LargeText>
            </View>
          </View>
        </View>

        <View
          style={{ paddingHorizontal: 8, paddingTop: 16, flexDirection: 'row' }}
        >
          <TouchableOpacity style={{ flex: 1, padding: 8 }}>
            <View style={localStyle.buttonStyle}>
              <NormalText>{'Finished orders'}</NormalText>
              <LargeText
                color={colors.PRIMARY_COLOR}
                style={{
                  alignSelf: 'flex-end',
                  fontSize: 28,
                }}
              >
                {formatThousand(data.finished)}
              </LargeText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, padding: 8 }}>
            <View style={localStyle.buttonStyle}>
              <NormalText>{'Paid orders'}</NormalText>
              <LargeText
                color={colors.PRIMARY_COLOR}
                style={{ alignSelf: 'flex-end', fontSize: 28 }}
              >
                {formatThousand(Number(data.paid_order))}
              </LargeText>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 8, flexDirection: 'row' }}>
          <TouchableOpacity style={{ flex: 1, padding: 8 }}>
            <View style={localStyle.buttonStyle}>
              <NormalText>{'Orders awaiting payments'}</NormalText>
              <LargeText
                color={colors.GREY_COLOR}
                style={{
                  alignSelf: 'flex-end',
                  fontSize: 28,
                }}
              >
                {formatThousand(Number(data.unpaid))}
              </LargeText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, padding: 8 }}>
            <View style={localStyle.buttonStyle}>
              <NormalText>{'Unfinished orders'}</NormalText>
              <LargeText
                color={colors.GREY_COLOR}
                style={{ alignSelf: 'flex-end', fontSize: 28 }}
              >
                {formatThousand(Number(data.unfinished))}
              </LargeText>
            </View>
          </TouchableOpacity>
        </View>
        <Loading visible={loading} />
      </AwareScroll>
    );
  }
}

const localStyle = StyleSheet.create({
  topButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    padding: 8,
    backgroundColor: colors.PRIMARY_COLOR,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  buttonStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 8,
    height: 90,
    backgroundColor: colors.WHITE_COLOR,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
