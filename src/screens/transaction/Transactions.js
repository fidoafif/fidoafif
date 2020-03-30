import { inject, observer } from "mobx-react/native";
import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
  FlatList,
  NavigationScreenProps,
  NavigationStackScreenOptions
} from "react-navigation";
import { AwareScroll } from "../../components/AwareScroll";
import { ButtonNavBack } from "../../components/buttons/ButtonNavBack";
import { Card } from "../../components/Card";
import { Loading } from "../../components/modal/Loading";
import { HeaderText } from "../../components/texts/HeaderText";
import { NormalText } from "../../components/texts/NormalText";
import { ViewCenter } from "../../components/ViewCenter";
import { apiListTransaction } from "../../utils/api";
import { colors } from "../../utils/Colors";
import { formatDateTimeStamp } from "../../utils/FormatDate";

// interface IProps extends NavigationScreenProps {}

// interface IState {
//   transactionList;
//   loading: boolean;
// }

@inject("cartStore")
@observer
class Transactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      transactionList: []
    };

    this.renderItem = this.renderItem.bind(this);
    this.navigateDetailTransaction = this.navigateDetailTransaction.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <ButtonNavBack navigation={navigation} />,
      headerTitle: <HeaderText>{"Transactions"}</HeaderText>,
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
    try {
      this.setState({ loading: true });
      const response = await apiListTransaction();
      console.log(response);
      if (response && response.data) {
        this.setState({ transactionList: response.data.reverse() });
      }
    } catch (error) {
      //
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <AwareScroll>{this.renderItems()}</AwareScroll>
        <Loading visible={loading} />
      </View>
    );
  }

  renderItems() {
    const { transactionList } = this.state;

    const _keyExtractor = (item, index) => {
      return `${index}`;
    };

    if (!transactionList.length) {
      return (
        <ViewCenter style={{ flex: 1 }}>
          <Text>{"Transaction is empty"}</Text>
        </ViewCenter>
      );
    }

    return (
      <FlatList
        keyExtractor={_keyExtractor}
        data={transactionList}
        renderItem={this.renderItem}
      />
    );
  }

  renderItem(data) {
    // console.log(data);
    const onPress = () => {
      this.navigateDetailTransaction(data.item);
    };
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={{ padding: 8, width: "100%" }}>
          <Card>
            <View style={{ display: "flex" }}>
              <NormalText bold={true}>
                Order Number: {data.item.order_number}
              </NormalText>
              <NormalText bold={true}>{`Date: ${formatDateTimeStamp(
                data.item.order_date
              )}`}</NormalText>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  display: "flex",
                  marginTop: 10
                }}
              >
                <NormalText bold={true}>Status </NormalText>
                {data.user && data.user.type.toLowerCase() === "agent" ? (
                  <MediumText color={colors.ORANGE_COLOR}>
                    {data.user.name} - {data.user.type} - {data.approval}
                  </MediumText>
                ) : (
                  <View />
                )}
                <NormalText color={colors.PRIMARY_COLOR}>
                  {data.item.status}
                </NormalText>
              </View>
            </View>
          </Card>
        </View>
      </TouchableOpacity>
    );
  }

  navigateDetailTransaction(data) {
    const { navigation } = this.props;
    navigation.navigate("DetailTransaction", { data });
  }
}

export default Transactions;
