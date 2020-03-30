import React, { Component } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export class AwareScroll extends Component {
  render() {
    return (
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        enableResetScrollToCoords={true}
        extraScrollHeight={100}
      >
        {this.props.children}
      </KeyboardAwareScrollView>
    );
  }
}
