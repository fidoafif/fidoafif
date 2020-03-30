// @@flow
import { inject, observer } from "mobx-react/native";
import React, { Component } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
  View
} from "react-native";
import { FlatList, NavigationScreenProps } from "react-navigation";
import { LargeText } from "../../components/texts/LargeText";
import { ViewCenter } from "../../components/ViewCenter";
import { colors } from "../../utils/Colors";
import { formatDataColumn } from "../../utils/FormatDataColumn";

// interface IProps extends NavigationScreenProps {
//   homeStore?;
// }

// interface IState {
//   loading: boolean;
// }

@inject("homeStore")
@observer
class CategoryView extends Component {
  ref;
  constructor(props) {
    super(props);

    this.listItem = this.listItem.bind(this);
    this.navigateCategory = this.navigateCategory.bind(this);
  }

  async componentDidMount() {
    const { homeStore } = this.props;

    await homeStore.fetchCategories();
  }

  render() {
    const { homeStore } = this.props;

    const numColumns = 2;
    const _keyExtractor = (item, index) => {
      return `${index}`;
    };

    const _ref = c => {
      this.ref = c;
    };

    if (homeStore.categories.length) {
      const categories = [...homeStore.categories];
      return (
        <View>
          <FlatList
            ref={_ref}
            data={formatDataColumn(categories, numColumns)}
            renderItem={this.listItem}
            keyExtractor={_keyExtractor}
            numColumns={numColumns}
          />
        </View>
      );
    }

    return (
      <ViewCenter style={{ height: 80 }}>
        <ActivityIndicator />
      </ViewCenter>
    );
  }

  listItem({ item }) {
    const onPress = () => {
      this.navigateCategory(item);
    };
    if (item.empty === true) {
      return (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            minWidth: 100,
            width: undefined,
            maxHeight: 70,
            margin: 4,
            backgroundColor: "transparent"
          }}
        />
      );
    }
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          flex: 1,
          minWidth: 100,
          width: undefined,
          maxHeight: 70,
          // paddingTop: 18,

          margin: 4,
          borderRadius: 8,
          shadowColor: colors.BLACK_COLOR,
          shadowOffset: {
            width: 0,
            height: 1
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3
        }}
      >
        <ImageBackground
          source={{ uri: item.image }}
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8
          }}
          imageStyle={{ borderRadius: 8 }}
        >
          <ViewCenter
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: colors.BLACK_COLOR,
              opacity: 0.4,
              position: "absolute",
              borderRadius: 8
            }}
          />
          <LargeText
            color={colors.WHITE_COLOR}
            bold={true}
            style={{ textAlign: "center" }}
          >
            {item.name}
          </LargeText>
        </ImageBackground>
      </TouchableOpacity>
    );
  }

  navigateCategory(category) {
    const { navigation } = this.props;

    navigation.navigate("CategoryPage", { category });
  }
}

export default CategoryView;
