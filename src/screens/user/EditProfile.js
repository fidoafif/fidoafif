// @@flow
import { inject, observer } from "mobx-react/native";
import React, { Component } from "react";
import { Alert, StyleSheet, View } from "react-native";
import {
  NavigationScreenProps,
  NavigationStackScreenOptions
} from "react-navigation";
import { AwareScroll } from "../../components/AwareScroll";
import { Button } from "../../components/buttons/Button";
import { ButtonNavBack } from "../../components/buttons/ButtonNavBack";
import { Loading } from "../../components/modal/Loading";
import { EmailField } from "../../components/textField/EmailField";
import { PasswordField } from "../../components/textField/PasswordField";
import TextFieldDefault from "../../components/textField/TextFieldDefault";
import { HeaderText } from "../../components/texts/HeaderText";
import { ViewCenter } from "../../components/ViewCenter";

// interface IProfile {
//   area;
//   email;
//   id_user;
//   name;
//   phone;
//   status;
//   type;
// }
// interface IProps extends NavigationScreenProps {
//   userStore;
// }

// interface IState {
//   loading: boolean;
//   profile: IProfile | null;
// }

@inject("userStore")
@observer
class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: null,
      loading: false
    };

    this.updateUser = this.updateUser.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <ButtonNavBack navigation={navigation} />,
      headerTitle: <HeaderText>{"Edit Profile"}</HeaderText>,
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

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const { userStore } = this.props;
    if (params && params.data) {
      userStore.initStore(params.data);
      this.setState({ profile: params.data });
    }
  }

  render() {
    const { userStore } = this.props;
    return (
      <AwareScroll>
        <ViewCenter style={styles.content}>
          <TextFieldDefault
            placeholder={"Name"}
            inputOnChange={userStore.setName}
            value={userStore.name}
          />
          <TextFieldDefault
            placeholder={"Phone Number"}
            inputOnChange={userStore.setPhonenumber}
            value={userStore.phonenumber}
          />
          <EmailField
            inputOnChange={userStore.setEmail}
            textValue={userStore.email}
          />
          <PasswordField inputOnChange={userStore.setPassword} />
          <PasswordField
            label={"Re-type password"}
            inputOnChange={userStore.setConfirmPassword}
          />
          <Button label={"Edit Profile"} onPress={this.updateUser} />
        </ViewCenter>
        <Loading visible={userStore.loading} />
      </AwareScroll>
    );
  }

  async updateUser() {
    const { navigation, userStore } = this.props;
    const { params } = this.props.navigation.state;

    const status = userStore.validateField();
    if (status) {
      const response = await userStore.fetchEditUser();
      if (response && Number(response.status) === 201) {
        Alert.alert("Success", response.message);

        if (params && params.onBack) {
          params.onBack();
          navigation.pop();
        }
      }
    }
  }
}

const styles = StyleSheet.create({
  content: {
    // marginHorizontal: 50,
    // marginVertical: 70,
    marginVertical: 20,
    marginBottom: 70,
    paddingHorizontal: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default EditProfile;
