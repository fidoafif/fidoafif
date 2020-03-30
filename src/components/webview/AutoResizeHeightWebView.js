import React, { Component } from "react";
import { Animated, Dimensions } from "react-native";
import { WebView } from "react-native-webview";
// interface IProps extends WebViewProperties {
//   needAnimate: boolean;
//   AnimationDuration;
//   defaultHeight;
//   needAutoResetHeight: boolean;
// }

// interface IState {
//   height;
//   source;
// }

const { width, height } = Dimensions.get("window");

const patchPostMessageJsCode = `
        (${String(function() {
          const originalPostMessage = window.postMessage;
          const patchedPostMessage = function(message, targetOrigin, transfer) {
            originalPostMessage(message, targetOrigin, transfer);
          };
          patchedPostMessage.toString = function() {
            return String(Object.hasOwnProperty).replace(
              "hasOwnProperty",
              "postMessage"
            );
          };
          window.postMessage = patchedPostMessage;
        })})();
`;

export class AutoResizeHeightWebView extends Component {
  _animatedValue;
  webview;
  heightMessage;

  constructor(props) {
    super(props);

    this.state = {
      height: props.defaultHeight,
      source: props.source
    };
    this._animatedValue = new Animated.Value(1);

    this.getMessageFromWebView = this.getMessageFromWebView.bind(this);
    this.gotoShow = this.gotoShow.bind(this);
    this.WebViewResetHeightFunctionJSInsert = this.WebViewResetHeightFunctionJSInsert.bind(
      this
    );
    this.resetHeight = this.resetHeight.bind(this);
    this.resetSmallHeight = this.resetSmallHeight.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { source } = nextProps;
    return source !== undefined
      ? {
          source: nextProps.source
        }
      : {
          source: undefined
        };
  }

  componentDidUpdate(nextProps) {
    if (nextProps.source !== undefined) {
      this.setState({
        source: nextProps.source
      });
      this.WebViewResetHeightFunctionJSInsert();
    }
  }

  render() {
    const {
      bounces,
      onLoadEnd,
      style,
      scrollEnabled,
      automaticallyAdjustContentInsets,
      scalesPageToFit,
      onMessage,
      ...otherprops
    } = this.props;

    const { height } = this.state;
    return (
      <Animated.View style={{ height, opacity: this._animatedValue }}>
        <WebView
          {...otherprops}
          ref={e => (this.webview = e)}
          source={this.state.source}
          bounces={bounces !== undefined ? bounces : true}
          javaScriptEnabled={true}
          useWebKit={false}
          scalesPageToFit={false}
          injectedJavaScript={patchPostMessageJsCode}
          // tslint:disable-next-line:jsx-no-lambda
          onLoadEnd={() => {
            this.WebViewResetHeightFunctionJSInsert();
            onLoadEnd !== undefined ? onLoadEnd() : null;
          }}
          style={[
            { width, height: this.state.height },
            style !== undefined ? style : {}
          ]}
          scrollEnabled={scrollEnabled !== undefined ? scrollEnabled : false}
          automaticallyAdjustContentInsets={
            automaticallyAdjustContentInsets !== undefined
              ? automaticallyAdjustContentInsets
              : true
          }
          onMessage={this.getMessageFromWebView}
        />
      </Animated.View>
    );
  }

  gotoShow() {
    if (this.props.needAnimate) {
      this._animatedValue.setValue(0);
    }
    Animated.timing(this._animatedValue, {
      toValue: 1,
      duration: this.props.AnimationDuration
    }).start();
  }

  // insert ResizeHeight JS
  WebViewResetHeightFunctionJSInsert() {
    const jsstr = `
    window.location.hash = 1;
    window.postMessage("height:"+document.body.scrollHeight.toString());`;

    setTimeout(() => {
      // tslint:disable-next-line:no-unused-expression
      this.webview && this.webview.injectJavaScript(jsstr);
    }, 500);
  }

  getMessageFromWebView(event) {
    // console.log("getMessageFromWebView");
    // console.log(event);
    const message = event.nativeEvent.data;
    if (message.indexOf("height") === 0) {
      if (
        this.heightMessage === undefined ||
        this.heightMessage === null ||
        this.heightMessage === ""
      ) {
        this.heightMessage = message;
        if (this.props.needAutoResetHeight) {
          this.resetHeight();
        }
      }
    } else if (this.props.onMessage !== undefined) {
      this.props.onMessage(event);
    }
  }

  resetHeight() {
    if (
      this.heightMessage === undefined ||
      this.heightMessage === null ||
      this.heightMessage === ""
    ) {
      return;
    }
    const message = this.heightMessage;
    const height = message.substr(7);
    this.setState({
      height: Number(height)
    });
    this.gotoShow();
  }

  resetSmallHeight() {
    this.setState({
      height: this.props.defaultHeight
    });
    this.gotoShow();
  }
}
