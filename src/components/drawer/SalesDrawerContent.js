import { Icon } from "react-native-elements";
import { StatusBar } from "react-native";
import { inject, observer } from "mobx-react/native";
import React, { Component } from "react";
import { Image, Platform, TouchableOpacity, View } from "react-native";
import { DrawerItemsProps } from "react-navigation";
import { apiGetProfile } from "../../utils/api";
import { clearUserData } from "../../utils/authentication";
import { colors } from "../../utils/Colors";
import { AwareScroll } from "../AwareScroll";
import { ButtonIcon } from "../buttons/ButtonIcon";
import { ButtonNavigationDrawer } from "../buttons/ButtonNavigationDrawer";
import { LargeText } from "../texts/LargeText";
import { MediumText } from "../texts/MediumText";
import { NormalText } from "../texts/NormalText";
import { ViewCenter } from "../ViewCenter";

// interface IProps extends DrawerItemsProps {
//   homeStore;
//   categoryStore;
// }
// interface IState {
//   categoryExpanded: boolean;
//   profile;
// }

@inject("homeStore", "categoryStore", "salesAgentStore")
@observer
class SalesDrawerContent extends Component {
  constructor(props) {
    super(props);

    this.navigateProfile = this.navigateProfile.bind(this);
    this.navigateDashboard = this.navigateDashboard.bind(this);
    this.navigateOrder = this.navigateOrder.bind(this);
    this.navigateOrderAgent = this.navigateOrderAgent.bind(this);
    this.navigateAgent = this.navigateAgent.bind(this);
    this.navigatePromo = this.navigatePromo.bind(this);
    this.navigateLogout = this.navigateLogout.bind(this);

    this.state = {
      categoryExpanded: false,
      profile: null
    };
  }

  async componentDidMount() {
    const { homeStore } = this.props;
    const profile = await apiGetProfile();
    if (profile && profile.data) {
      this.setState({ profile: profile.data });
    }

    await homeStore.fetchCategories();
  }

  render() {
    const { index } = this.props.navigation.state;
    const { profile } = this.state;
    const salesAgentStore = this.props.salesAgentStore;

    const sizeProfile = 80;
    const radiusProfile = (50 * sizeProfile) / 100;
    return (
      <View
        style={{
          flex: 1,
          position: "relative",
          paddingTop: StatusBar.currentHeight
        }}
      >
        {/* <SafeAreaView> */}
        <ViewCenter
          style={{
            paddingTop:
              Platform.OS === "android" ? 40 + StatusBar.currentHeight : 40,
            backgroundColor: colors.GREY_COLOR_LIGHT
          }}
        >
          <ViewCenter
            style={{
              width: "100%",
              position: "absolute",
              top: 0,
              paddingVertical: 10,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <ButtonNavigationDrawer
              color={colors.PRIMARY_COLOR}
              isClose={true}
              navigation={this.props.navigation}
            />
            <ButtonIcon onPress={this.navigateProfile}>
              <Icon
                type={"evilicon"}
                name="gear"
                size={28}
                color={colors.PRIMARY_COLOR}
              />
            </ButtonIcon>
          </ViewCenter>
          <Image
            source={{
              uri:
                // tslint:disable-next-line:max-line-length
                "http://cdn.onlinewebfonts.com/svg/img_266351.png"
            }}
            style={{
              width: sizeProfile,
              height: sizeProfile,
              borderRadius: radiusProfile
            }}
            height={sizeProfile}
            width={sizeProfile}
            borderRadius={radiusProfile}
            resizeMode={"contain"}
          />
          <ViewCenter style={{ paddingVertical: 20 }}>
            <LargeText bold={true}>{profile ? profile.name : ""}</LargeText>
            {
              <MediumText color={colors.PRIMARY_COLOR}>
                {salesAgentStore.name ? `Agent: ${salesAgentStore.name}` : ""}
              </MediumText>
            }
          </ViewCenter>
        </ViewCenter>
        <AwareScroll>
          <TouchableOpacity
            onPress={this.navigateDashboard}
            style={{ paddingHorizontal: 16, paddingVertical: 16 }}
          >
            <MediumText
              bold={true}
              color={
                index === 0 ? colors.PRIMARY_COLOR : colors.BUTTON_TEXT_COLOR
              }
            >
              {"Dashboard"}
            </MediumText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.navigateOrder}
            style={{ paddingHorizontal: 16, paddingVertical: 16 }}
          >
            <MediumText
              bold={true}
              color={
                index === 2 ? colors.PRIMARY_COLOR : colors.BUTTON_TEXT_COLOR
              }
            >
              {"Manage Order"}
            </MediumText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.navigateOrderAgent}
            style={{ paddingHorizontal: 16, paddingVertical: 16 }}
          >
            <MediumText
              bold={true}
              color={
                index === 2 ? colors.PRIMARY_COLOR : colors.BUTTON_TEXT_COLOR
              }
            >
              {"Order Agent"}
            </MediumText>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.navigateAgent}
            style={{ paddingHorizontal: 16, paddingVertical: 16 }}
          >
            <MediumText
              bold={true}
              color={
                index === 2 ? colors.PRIMARY_COLOR : colors.BUTTON_TEXT_COLOR
              }
            >
              {"Manage Agent"}
            </MediumText>
          </TouchableOpacity>

          {
            <TouchableOpacity
              onPress={this.navigatePromo}
              style={{ paddingHorizontal: 16, paddingVertical: 16 }}
            >
              <MediumText
                bold={true}
                color={
                  index === 2 ? colors.PRIMARY_COLOR : colors.BUTTON_TEXT_COLOR
                }
              >
                {"Manage Discount"}
              </MediumText>
            </TouchableOpacity>
          }

          <TouchableOpacity
            onPress={this.navigateLogout}
            style={{ paddingHorizontal: 16, paddingVertical: 16 }}
          >
            <MediumText bold={true} color={colors.NEGATIVE_COLOR}>
              {"Logout"}
            </MediumText>
          </TouchableOpacity>
        </AwareScroll>
        {/* </SafeAreaView> */}
      </View>
    );
  }

  navigateProfile() {
    const { navigation } = this.props;

    navigation.navigate("EditProfile", {
      data: this.state.profile,
      onBack: async () => {
        const profile = await apiGetProfile();
        if (profile && profile.data) {
          this.setState({ profile: profile.data });
        }
      }
    });
    navigation.closeDrawer();
  }

  navigateDashboard() {
    const { navigation } = this.props;

    navigation.navigate("DashboardPage");
    navigation.closeDrawer();
  }

  navigateOrder() {
    const { navigation } = this.props;

    navigation.navigate("SalesManageOrder");
    navigation.closeDrawer();
  }

  navigatePromo() {
    const { navigation } = this.props;

    navigation.navigate("SalesManageDiscount");
    navigation.closeDrawer();
  }

  navigateAgent() {
    const { navigation } = this.props;

    navigation.navigate("SalesManageAgent");
    navigation.closeDrawer();
  }

  navigateOrderAgent() {
    const { navigation } = this.props;

    navigation.navigate("OrderAgent");
    navigation.closeDrawer();
  }

  async navigateLogout() {
    const { navigation } = this.props;
    const salesAgentStore = this.props.salesAgentStore;
    salesAgentStore.clearStore();
    await clearUserData();
    navigation.navigate("Authentication");
  }
}

export { SalesDrawerContent };
