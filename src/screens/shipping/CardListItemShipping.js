import React, { Component } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card } from "../../components/Card";
import { MediumText } from "../../components/texts/MediumText";
import { colors } from "../../utils/Colors";
import { formatThousand } from "../../utils/FormatThousand";

// interface IState {
//   qty;
// }
// interface IProps {
//   item;
// }

export default class CardListItemShipping extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { item } = this.props;
    // console.log(item);
    return (
      <View style={{ width: "100%", flex: 1 }}>
        <Card>
          <View style={{ flexDirection: "row" }}>
            <Image style={styles.image} source={{ uri: item.image }} />
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <MediumText style={{ color: colors.GREY_COLOR }}>
                  {item.name}
                </MediumText>
              </View>
              <View style={{ flex: 1 }}>
                <MediumText style={{ color: colors.GREY_COLOR }}>
                  {`${item.qty} qty`}
                </MediumText>
              </View>
              <View style={{ flex: 1 }}>
                <MediumText
                  style={{
                    color: colors.GREY_COLOR,
                    fontWeight: "bold"
                  }}
                >
                  Rp. {formatThousand(item.price)}
                </MediumText>
              </View>
            </View>
          </View>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    marginRight: 10
  }
});
