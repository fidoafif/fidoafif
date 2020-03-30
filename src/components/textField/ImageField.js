import { Icon } from "react-native-elements";
import React, { Component } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  ViewProperties,
  ViewStyle
} from "react-native";
import { colors } from "../../utils/Colors";
import { imagePickerCamera, imagePickerGallery } from "../../utils/imagePicker";
import { MediumText } from "../texts/MediumText";

// interface IProps extends ViewProperties {
//   placeholder;
//   setImages: (images) => void;
// }
// interface IStates {
//   borderColor;
//   images;
// }

export default class ImageField extends Component {
  constructor(props) {
    super(props);

    this.state = { images: [], borderColor: colors.BORDER_COLOR };
    this.pickImageGallery = this.pickImageGallery.bind(this);
    this.pickImageCamera = this.pickImageCamera.bind(this);
    this.renderImages = this.renderImages.bind(this);
    this.callback = this.callback.bind(this);
  }
  render() {
    // console.log(this.state.images);
    return (
      <View style={viewStyle}>
        <MediumText color={colors.BORDER_COLOR}>
          {this.props.placeholder}
        </MediumText>
        <View style={{ marginTop: 8, flexDirection: "row" }}>
          {this.renderImages()}
          <TouchableOpacity
            style={{
              height: 60,
              width: 60,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.GREY_COLOR_LIGHT,
              borderColor: colors.BORDER_COLOR,
              borderWidth: 1.1,
              borderRadius: 4,
              marginBottom: 16
            }}
            onPress={this.pickImageGallery}
          >
            <Icon
              type={"material"}
              name={"add"}
              size={28}
              color={colors.BORDER_COLOR}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderImages() {
    const { images } = this.state;

    if (images.length) {
      return images.map((image, index) => {
        // console.log(image);

        const remove = () => {
          const newImages = [...this.state.images];
          newImages.splice(index, 1);
          this.props.setImages(newImages);
          this.setState({ images: newImages });
        };

        return (
          <View
            key={index}
            style={{
              height: 60,
              width: 60,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.GREY_COLOR_LIGHT,
              borderColor: colors.BORDER_COLOR,
              borderWidth: 1.1,
              borderRadius: 4,
              marginBottom: 16,
              marginRight: 8,
              position: "relative"
            }}
          >
            <TouchableOpacity
              onPress={remove}
              style={{ position: "absolute", top: 0, right: 0, zIndex: 1111 }}
            >
              <Icon
                type="material"
                name={"close"}
                size={18}
                color={colors.NEGATIVE_COLOR}
              />
            </TouchableOpacity>

            <Image
              source={{ uri: image }}
              style={{ width: 60, height: 60 }}
              resizeMode={"cover"}
            />
          </View>
        );
      });
    }

    return null;
  }

  async pickImageGallery() {
    await imagePickerGallery(this.callback);
    // if (result && !result.cancelled) {
    //   const newImages = [...this.state.images];

    //   newImages.push(result.uri);
    //   this.props.setImages(newImages);
    //   this.setState({ images: newImages });
    //   // await this.upload(result.uri);
    // }
  }
  async pickImageCamera() {
    const result = await imagePickerCamera();
    if (result && !result.cancelled) {
      // await this.upload(result.uri);
    }
  }
  async callback(response) {
    if (response && !response.cancelled) {
      const newImages = [...this.state.images];

      newImages.push(response.uri);
      this.props.setImages(newImages);
      this.setState({ images: newImages });
      // await this.upload(result.uri);
    }
  }

  // async upload(uri) {
  //   if (this.props.onPress) {
  //     if (this.props.onUpload) {
  //       this.hideModal();
  //       this.setState({ uploading: true });

  //       const data = await this.props.onUpload(uri);
  //       if (data && data.id) {
  //         await this.props.onPress(data.id);
  //       } else {
  //         ShowToast(data.message);
  //       }
  //       this.setState({ uploading: false });
  //     } else {
  //       this.hideModal();
  //       await this.props.onPress(uri);
  //     }
  //   }
  // }
}

const viewStyle = {
  width: "100%",
  height: 120
};
