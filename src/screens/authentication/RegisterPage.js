// @@flow
import { inject, observer } from "mobx-react/native";
import React, { Component } from "react";
import { Alert, StyleSheet, View } from "react-native";
import {
  NavigationScreenProps,
  NavigationStackScreenOptions
} from "react-navigation";
import { AppLogo } from "../../components/AppLogo";
import { AwareScroll } from "../../components/AwareScroll";
import { Button } from "../../components/buttons/Button";
import { ButtonNavBack } from "../../components/buttons/ButtonNavBack";
import { Loading } from "../../components/modal/Loading";
import { EmailField } from "../../components/textField/EmailField";
import { PasswordField } from "../../components/textField/PasswordField";
import TextFieldDefault from "../../components/textField/TextFieldDefault";
import { HeaderText } from "../../components/texts/HeaderText";
import { ViewCenter } from "../../components/ViewCenter";

// interface IProps extends NavigationScreenProps {
//   registerStore;
// }

// interface IState {
//   loading: boolean;
// }

@inject("registerStore")
@observer
class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.register = this.register.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <ButtonNavBack navigation={navigation} />,
      headerTitle: <HeaderText>{"Register"}</HeaderText>,
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

  render() {
    const { registerStore } = this.props;
    return (
      <AwareScroll>
        <ViewCenter>
          <AppLogo />
        </ViewCenter>
        <ViewCenter style={styles.content}>
          <TextFieldDefault
            placeholder={"Name"}
            inputOnChange={registerStore.setName}
          />
          <TextFieldDefault
            placeholder={"Phone Number"}
            inputOnChange={registerStore.setPhonenumber}
          />
          <EmailField
            inputOnChange={registerStore.setEmail}
            textValue={registerStore.email}
          />
          <PasswordField inputOnChange={registerStore.setPassword} />
          <PasswordField
            label={"Re-type password"}
            inputOnChange={registerStore.setConfirmPassword}
          />
          <Button label={"Register"} onPress={this.register} />
        </ViewCenter>
        <Loading visible={registerStore.loading} />
      </AwareScroll>
    );
  }

  async register() {
    const { navigation, registerStore } = this.props;

    const status = registerStore.validateField();
    if (status) {
      const response = await registerStore.fetchRegister();

      if (response && Number(response.status) === 201) {
        Alert.alert("Success", response.message);
        navigation.pop();
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

export default RegisterPage;
