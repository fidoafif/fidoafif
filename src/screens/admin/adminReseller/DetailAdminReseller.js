// @@flow

import { inject, observer } from "mobx-react/native";
import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import {
  NavigationScreenProps,
  NavigationStackScreenOptions
} from "react-navigation";
import { AwareScroll } from "../../../components/AwareScroll";
import { ButtonNavBack } from "../../../components/buttons/ButtonNavBack";
import { Loading } from "../../../components/modal/Loading";
import { HeaderText } from "../../../components/texts/HeaderText";
import { MediumText } from "../../../components/texts/MediumText";
import { ViewCenter } from "../../../components/ViewCenter";
import { colors } from "../../../utils/Colors";
import { apiPostAcceptReseller } from "../../../utils/api/apiReseller";

// interface IProps extends NavigationScreenProps {
//   homeStore;
// }

// interface IState {
//   loading: boolean;
//   data;
// }

@inject("homeStore")
@observer
class DetailAdminReseller extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, data: null };

    this.acceptReseller = this.acceptReseller.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <ButtonNavBack navigation={navigation} />,
      headerTitle: <HeaderText>{"Detail Reseller"}</HeaderText>,
      headerRight: <View />,
      headerStyle: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3
      }
    };
  };

  async componentDidMount() {
    const { params } = this.props.navigation.state;

    if (params && params.data) {
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
              <MediumText>{"Name"}</MediumText>
              <MediumText
                style={{
                  backgroundColor: colors.BACKGROUND_FIELD_COLOR,
                  padding: 8
                }}
              >
                {data.name}
              </MediumText>
            </View>
            <View style={{ padding: 8 }}>
              <MediumText>{"Email"}</MediumText>
              <MediumText
                style={{
                  backgroundColor: colors.BACKGROUND_FIELD_COLOR,
                  padding: 8
                }}
              >
                {data.email}
              </MediumText>
            </View>
            <View style={{ padding: 8 }}>
              <MediumText>{"Phonenumber"}</MediumText>
              <MediumText
                style={{
                  backgroundColor: colors.BACKGROUND_FIELD_COLOR,
                  padding: 8
                }}
              >
                {data.phone}
              </MediumText>
            </View>
          </View>
        ) : (
          <View />
        )}
        {/*<TouchableOpacity onPress={this.acceptReseller}>
          <ViewCenter
            style={{ padding: 16, backgroundColor: colors.PRIMARY_COLOR }}
          >
            <MediumText color={colors.WHITE_COLOR}>
              {'Accept Reseller'}
            </MediumText>
          </ViewCenter>
        </TouchableOpacity>*/}
        <Loading visible={loading} />
      </AwareScroll>
    );
  }

  async acceptReseller() {
    const { navigation } = this.props;
    const { data } = this.state;

    try {
      this.setState({ loading: true });
      const response = await apiPostAcceptReseller(data.user);

      if (response) {
        navigation.goBack();
      }
    } catch (error) {
      // return null;
    } finally {
      this.setState({ loading: false });
    }
  }
}

export default DetailAdminReseller;
