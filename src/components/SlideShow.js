import React, { Component } from "react";
import { Dimensions, ViewStyle } from "react-native";
import Swiper, { SwiperProps } from "react-native-swiper";
import { colors } from "../utils/Colors";
import { ViewCenter } from "./ViewCenter";
// interface IProps extends SwiperProps {
//   dataSource?[];
// }

export class SlideShow extends Component {
  render() {
    const style = {
      width: Dimensions.get("window").width,
      height: 240,
      ...this.props.style
    };

    return (
      <ViewCenter>
        <Swiper
          loop={true}
          autoplay={true}
          autoplayTimeout={10}
          pagingEnabled={true}
          // loadMinimal={true}
          // loadMinimalSize={true}
          // loadMinimalLoader={true}
          scrollEnabled={true}
          dotColor={colors.WHITE_COLOR}
          activeDotColor={colors.PRIMARY_COLOR}
          {...this.props}
          style={style}
        >
          {this.props.children}
        </Swiper>
      </ViewCenter>
    );
  }
}
