import { Icon } from 'react-native-elements';
import { StatusBar } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import { DrawerItemsProps } from 'react-navigation';
import { apiGetProfile } from '../../utils/api';
import { clearUserData } from '../../utils/authentication';
import { colors } from '../../utils/Colors';
import { AwareScroll } from '../AwareScroll';
import { ButtonIcon } from '../buttons/ButtonIcon';
import { ButtonNavigationDrawer } from '../buttons/ButtonNavigationDrawer';
import { LargeText } from '../texts/LargeText';
import { MediumText } from '../texts/MediumText';
import { NormalText } from '../texts/NormalText';
import { SmallText } from '../texts/SmallText';
import { ViewCenter } from '../ViewCenter';

// interface IProps extends DrawerItemsProps {
//   homeStore;
//   categoryStore;
// }
// interface IState {
//   categoryExpanded: boolean;
//   profile;
// }

@inject('homeStore', 'categoryStore')
@observer
class DrawerContent extends Component {
  constructor(props) {
    super(props);

    this.navigateProfile = this.navigateProfile.bind(this);
    this.navigateHome = this.navigateHome.bind(this);
    this.renderCategories = this.renderCategories.bind(this);
    this.renderMenuItemAgent = this.renderMenuItemAgent.bind(this);
    this.renderMenuItemReseller = this.renderMenuItemReseller.bind(this);
    this.navigateTransaction = this.navigateTransaction.bind(this);
    this.navigateBecomeAgent = this.navigateBecomeAgent.bind(this);
    this.navigateBecomeReseller = this.navigateBecomeReseller.bind(this);
    this.navigateFaq = this.navigateFaq.bind(this);
    this.navigateLogout = this.navigateLogout.bind(this);

    this.state = {
      categoryExpanded: false,
      profile: null,
    };
  }

  async componentDidMount() {
    const { homeStore } = this.props;
    const profile = await apiGetProfile();

    if (profile && profile.data) {
      console.info(profile.data);
      this.setState({ profile: profile.data });
    }

    await homeStore.fetchCategories();
  }

  render() {
    const { index } = this.props.navigation.state;
    const { profile } = this.state;

    const sizeProfile = 80;
    const radiusProfile = (50 * sizeProfile) / 100;
    return (
      <View
        style={{
          flex: 1,
          position: 'relative',
          paddingTop: StatusBar.currentHeight,
        }}
      >
        {/* <SafeAreaView> */}
        <ViewCenter
          style={{
            paddingTop:
              Platform.OS === 'android' ? 40 + StatusBar.currentHeight : 40,
            backgroundColor: colors.GREY_COLOR_LIGHT,
          }}
        >
          <ViewCenter
            style={{
              width: '100%',
              position: 'absolute',
              top: 0,
              paddingVertical: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <ButtonNavigationDrawer
              color={colors.PRIMARY_COLOR}
              isClose={true}
              navigation={this.props.navigation}
            />
            <ButtonIcon onPress={this.navigateProfile}>
              <Icon
                type={'evilicon'}
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
                'http://cdn.onlinewebfonts.com/svg/img_266351.png',
            }}
            style={{
              width: sizeProfile,
              height: sizeProfile,
              borderRadius: radiusProfile,
            }}
            height={sizeProfile}
            width={sizeProfile}
            borderRadius={radiusProfile}
            resizeMode={'contain'}
          />
          <ViewCenter style={{ paddingVertical: 20 }}>
            <LargeText bold={true}>{profile ? profile.name : ''}</LargeText>
            {/* <NormalText color={colors.PRIMARY_COLOR}>
              {profile && profile.type === "0" ? "Pembeli Biasa" : "Agent"}
          </NormalText>*/}
          </ViewCenter>
        </ViewCenter>
        <AwareScroll>
          <TouchableOpacity
            onPress={this.navigateHome}
            style={{ paddingHorizontal: 16, paddingVertical: 16 }}
          >
            <MediumText
              bold={true}
              color={
                index === 0 ? colors.PRIMARY_COLOR : colors.BUTTON_TEXT_COLOR
              }
            >
              {'Home'}
            </MediumText>
          </TouchableOpacity>
          {this.renderCategories()}
          <TouchableOpacity
            onPress={this.navigateTransaction}
            style={{ paddingHorizontal: 16, paddingVertical: 16 }}
          >
            <MediumText
              bold={true}
              color={
                index === 2 ? colors.PRIMARY_COLOR : colors.BUTTON_TEXT_COLOR
              }
            >
              {'Transaction'}
            </MediumText>
          </TouchableOpacity>

          {this.renderMenuItemAgent()}

          {this.renderMenuItemReseller()}

          <TouchableOpacity
            onPress={this.navigateFaq}
            style={{ paddingHorizontal: 16, paddingVertical: 16 }}
          >
            <MediumText bold={true}>{'Faq and Contact Us'}</MediumText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.navigateLogout}
            style={{ paddingHorizontal: 16, paddingVertical: 16 }}
          >
            <MediumText bold={true} color={colors.NEGATIVE_COLOR}>
              {'Logout'}
            </MediumText>
          </TouchableOpacity>
        </AwareScroll>
        {/* </SafeAreaView> */}
      </View>
    );
  }

  renderMenuItemAgent() {
    // Agent account type 1
    const { profile } = this.state;

    if (profile && (profile.type === '4' || profile.type === '1')) {
      return <View />;
    }

    if (profile && !profile.become_agent) {
      return (
        <TouchableOpacity
          onPress={this.navigateBecomeAgent}
          style={{ paddingHorizontal: 16, paddingVertical: 16 }}
        >
          <MediumText bold={true}>{'Become Agent'}</MediumText>
        </TouchableOpacity>
      );
    }

    return <View />;
  }

  renderMenuItemReseller() {
    // Reseller account type 4
    const { profile } = this.state;

    if (profile && (profile.type === '4' || profile.type === '1')) {
      return <View />;
    }

    if (profile && !profile.become_agent) {
      return (
        <TouchableOpacity
          onPress={this.navigateBecomeReseller}
          style={{ paddingHorizontal: 16, paddingVertical: 16 }}
        >
          <MediumText bold={true}>{'Become Reseller'}</MediumText>
        </TouchableOpacity>
      );
    }

    return <View />;
  }

  renderCategories() {
    const { index } = this.props.navigation.state;
    const { navigation, homeStore } = this.props;

    const toggleCategoryExpanded = () => {
      this.setState({ categoryExpanded: !this.state.categoryExpanded });
    };
    const categoryContent = () => {
      if (this.state.categoryExpanded) {
        const categories = [...homeStore.categories];

        if (homeStore.categories.length) {
          const { categoryStore } = this.props;
          return categories.map((category, categoryIndex) => {
            const onPress = async () => {
              await categoryStore.fetchProductsByCategory(category.id);
              navigation.navigate('CategoryPage', { category });

              toggleCategoryExpanded();
              navigation.closeDrawer();
            };
            return (
              <TouchableOpacity
                onPress={onPress}
                key={categoryIndex}
                style={{ paddingHorizontal: 16, paddingVertical: 16 }}
              >
                <SmallText bold={true}>{category.name}</SmallText>
              </TouchableOpacity>
            );
          });
        }
        return (
          <ViewCenter>
            <ActivityIndicator />
          </ViewCenter>
        );
      }
      return null;
    };
    return (
      <View>
        <TouchableOpacity
          onPress={toggleCategoryExpanded}
          style={{
            paddingHorizontal: 16,
            paddingVertical: 16,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <MediumText
              bold={true}
              color={
                index === 1 ? colors.PRIMARY_COLOR : colors.BUTTON_TEXT_COLOR
              }
            >
              {'Product Category'}
            </MediumText>
            <Icon
              type={'ionicon'}
              name={
                this.state.categoryExpanded ? 'ios-arrow-up' : 'ios-arrow-down'
              }
              size={22}
            />
          </View>
        </TouchableOpacity>
        {categoryContent()}
      </View>
    );
  }

  navigateProfile() {
    const { navigation } = this.props;

    navigation.navigate('EditProfile', {
      data: this.state.profile,
      onBack: async () => {
        const profile = await apiGetProfile();
        if (profile && profile.data) {
          this.setState({ profile: profile.data });
        }
      },
    });
    navigation.closeDrawer();
  }

  navigateHome() {
    const { navigation } = this.props;

    navigation.navigate('HomePage');
    navigation.closeDrawer();
  }

  navigateTransaction() {
    const { navigation } = this.props;

    navigation.navigate('Transactions');
    navigation.closeDrawer();
  }

  async navigateFaq() {
    const { navigation } = this.props;

    navigation.navigate('FaqPage');
    navigation.closeDrawer();
  }

  async navigateLogout() {
    const { navigation } = this.props;
    const salesAgentStore = this.props.salesAgentStore;
    salesAgentStore.clearStore();
    await clearUserData();
    navigation.navigate('Authentication');
  }

  async navigateBecomeAgent() {
    const { navigation } = this.props;

    navigation.navigate('BecomeAgent', {
      onBack: async () => {
        const profile = await apiGetProfile();

        if (profile && profile.data) {
          this.setState({ profile: profile.data });
        }
      },
    });
  }

  async navigateBecomeReseller() {
    const { navigation } = this.props;

    navigation.navigate('BecomeReseller', {
      onBack: async () => {
        const profile = await apiGetProfile();

        if (profile && profile.data) {
          this.setState({ profile: profile.data });
        }
      },
    });
  }
}

export { DrawerContent };
