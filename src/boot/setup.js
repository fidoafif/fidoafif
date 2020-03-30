// import { AppLoading } from "expo";
import { Provider } from 'mobx-react/native';
import React, { Component } from 'react';
import { I18nextProvider, translate } from 'react-i18next';
import i18n from '../i18n';
import { RouteApp } from '../routes';
import firebase from 'react-native-firebase';
import { Alert } from 'react-native';
import {
  getFCMToken,
  getUserData,
  saveFCMToken,
} from '../utils/authentication';

const setup = stores => {
  return class Setup extends Component {
    constructor(props) {
      super(props);

      this.state = {
        isReady: false,
        statusBarHeight: 48,
      };

      this.toggleReady = this.toggleReady.bind(this);
    }

    async componentDidMount() {
      this.checkPermission();
      this.createNotificationListeners(); //add this line
    }

    componentWillUnmount() {
      this.notificationListener;
      this.notificationOpenedListener;
    }

    render() {
      const { statusBarHeight, isReady } = this.state;

      const WrappedStack = () => {
        return (
          <RouteApp
            screenProps={{ t: i18n.getFixedT('id'), statusBarHeight }}
          />
        );
      };

      const ReloadAppOnLanguageChange = translate('translation', {
        bindI18n: 'languageChanged',
        bindStore: 'false',
      })(WrappedStack);

      // if (!isReady) {
      //   return (
      //     // <AppLoading
      //     //   startAsync={cacheResourcesAsync}
      //     //   onFinish={this.toggleReady}
      //     //   onError={console.warn}
      //     // />
      //     <ViewCenter style={{ flex: 1 }}>
      //       <MediumText>{"Loading..."}</MediumText>
      //     </ViewCenter>
      //   );
      // }

      return (
        <Provider {...stores}>
          <I18nextProvider i18n={i18n}>
            <ReloadAppOnLanguageChange />
          </I18nextProvider>
        </Provider>
      );
    }

    toggleReady() {
      this.setState({ isReady: true });
    }

    //1
    async checkPermission() {
      const enabled = await firebase.messaging().hasPermission();
      if (enabled) {
        this.getToken();
      } else {
        this.requestPermission();
      }
    }

    //3
    async getToken() {
      const user = await getUserData();
      try {
        if (!user) {
          const fcmToken = await firebase.messaging().getToken();
          console.log(' fcm token', fcmToken);
          if (fcmToken) {
            await saveFCMToken(fcmToken);
          }
        }
      } catch (error) {
        console.log('Error getting fcm token', error);
      }
    }

    //2
    async requestPermission() {
      try {
        await firebase.messaging().requestPermission();
        // User has authorised
        this.getToken();
      } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
      }
    }

    async createNotificationListeners() {
      const channel = new firebase.notifications.Android.Channel(
        'fcm_FirebaseNotifiction_default_channel',
        'Sekawan Cosmeticts',
        firebase.notifications.Android.Importance.High,
      ).setDescription('Demo app description');
      firebase.notifications().android.createChannel(channel);

      /*
       * Triggered when a particular notification has been received in foreground
       * */
      this.notificationListener = firebase
        .notifications()
        .onNotification(notification => {
          const { title, body } = notification;
          console.log('onNotification:', notification);
          if (title && body) {
            Alert.alert(title, body);
          }

          const localNotification = new firebase.notifications.Notification({
            show_in_foreground: true,
          })
            .setNotificationId(notification.notificationId)
            .setTitle(notification.title)
            .setBody(notification.body)
            .android.setChannelId('fcm_FirebaseNotifiction_default_channel') // e.g. the id you chose above
            // .android.setSmallIcon("@drawable/ic_launcher") // create this icon in Android Studio
            // .android.setColor('#000000') // you can set a color here
            .android.setPriority(firebase.notifications.Android.Priority.High);

          firebase
            .notifications()
            .displayNotification(localNotification)
            .catch(err => console.error(err));
        });

      /*
       * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
       * */
      this.notificationOpenedListener = firebase
        .notifications()
        .onNotificationOpened(notificationOpen => {
          const { title, body } = notificationOpen.notification;
          console.log('onNotificationOpened:', notificationOpen);
          // Alert.alert(title, body);
        });

      /*
       * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
       * */
      const notificationOpen = await firebase
        .notifications()
        .getInitialNotification();
      if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        console.log('getInitialNotification:', notificationOpen);
        // Alert.alert(title, body);
      }
      /*
       * Triggered for data only payload in foreground
       * */
      this.messageListener = firebase.messaging().onMessage(message => {
        //process data message
        console.log('JSON.stringify:', JSON.stringify(message));
      });
    }
  };
};

export default setup;
