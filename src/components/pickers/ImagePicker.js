import { Icon } from 'react-native-elements';
import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  ViewProperties,
  ViewStyle,
  Image,
} from 'react-native';
import { colors } from '../../utils/Colors';
import { imagePickerCamera, imagePickerGallery } from '../../utils/imagePicker';
import { MediumText } from '../texts/MediumText';

// interface IProps extends ViewProperties {
//   placeholder;
//   // imageValue;
//   // setImage: (value) => void;
// }
// interface IStates {
//   borderColor;
// }

export default class ImagePicker extends Component {
  constructor(props) {
    super(props);

    this.state = { borderColor: colors.BORDER_COLOR };
    this.pickImageGallery = this.pickImageGallery.bind(this);
    this.pickImageCamera = this.pickImageCamera.bind(this);
    this.callback = this.callback.bind(this);
    // this.renderImages = this.renderImages.bind(this);
  }
  render() {
    return (
      <View style={viewStyle}>
        <View style={{ marginTop: 8, flexDirection: 'row' }}>
          {/* {this.renderImages()} */}
          <TouchableOpacity
            style={{
              height: 260,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.GREY_COLOR_LIGHT,
              borderColor: colors.BORDER_COLOR,
              borderWidth: 1.1,
              borderRadius: 4,
              marginBottom: 16,
            }}
            onPress={this.pickImageGallery}
          >
            {this.props.imageUri ? (
              <Image
                source={{ uri: this.props.imageUri }}
                style={{ width: '100%', height: 260 }}
                resizeMode={'cover'}
              />
            ) : (
              <Icon
                type={'material'}
                name={'add'}
                size={28}
                color={colors.BORDER_COLOR}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  async pickImageGallery() {
    await imagePickerGallery(this.callback);
  }

  async callback(response) {
    if (response && !response.cancelled) {
      if (this.props.setImageUri) {
        this.props.setImageUri(response.uri);
      }
    }
  }

  async pickImageCamera() {
    const result = await imagePickerCamera();
    if (result && !result.cancelled) {
      this.props.setImageUri(result);
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
  width: '100%',
  height: 120,
};
