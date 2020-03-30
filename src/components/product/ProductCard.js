import { Icon } from 'react-native-elements';
import React, { Component } from 'react';
import { Image, TouchableOpacity, View, ViewStyle } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { colors } from '../../utils/Colors';
import { formatThousand } from '../../utils/FormatThousand';
import { MediumText } from '../texts/MediumText';
import { SmallText } from '../texts/SmallText';

// interface IProps extends NavigationScreenProps {
//   item;
// }
// interface IState {
//   isWishlist: boolean;
// }

export class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.state = { isWishlist: props.item.isWishlist };

    this.renderPrice = this.renderPrice.bind(this);
    // this.renderHolder = this.renderHolder.bind(this);
    this.navigateDetailProduct = this.navigateDetailProduct.bind(this);
  }

  render() {
    const { item } = this.props;

    const imageUri = item.image
      ? item.image
      : 'https://www.hygeiahmo.com/wp-content/themes/uplift/images/default-thumb.png';

    return (
      <View style={style}>
        <TouchableOpacity onPress={this.navigateDetailProduct}>
          <Image
            source={{ uri: imageUri }}
            style={{ width: '100%', height: 120 }}
            resizeMode={'cover'}
          />
          <View
            style={{ paddingHorizontal: 4, paddingVertical: 8, height: 40 }}
          >
            <MediumText numberOfLines={2} ellipsizeMode={'tail'}>
              {item.name}
            </MediumText>
          </View>
          <View style={{ paddingHorizontal: 4, flexDirection: 'row' }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 3,
                backgroundColor: colors.PRIMARY_COLOR,
                width: 46,
                height: 20,
                borderRadius: 3,
                marginVertical: 5,
              }}
            >
              <SmallText color={colors.WHITE_COLOR}>
                {`${item.rate} `}
              </SmallText>
              <Icon type={'ionicon'} name="md-star" size={13} color={'white'} />
            </View>

            <SmallText style={{ marginTop: 6, marginLeft: 5 }}>
              {`${item.review} Ulasan`}
            </SmallText>
          </View>
          {this.renderPrice()}
          {this.renderHolder()}
        </TouchableOpacity>
      </View>
    );
  }

  renderPrice() {
    const { item } = this.props;

    // if (Number(item.promo)) {
    //   // const discountPrice = item.price - (item.discount * item.price) / 100;
    //   const discountPrice = item.promo;
    //   return (
    //     <View style={{ flexDirection: 'column' }}>
    //       <SmallText
    //         // color={colors.GREY_COLOR}
    //         style={{ textDecorationLine: 'line-through' }}
    //       >
    //         {`Rp. ${formatThousand(item.normalPrice)}, `}
    //       </SmallText>
    //       <MediumText bold={true}>{`Rp. ${formatThousand(
    //         Number(discountPrice),
    //       )}, `}</MediumText>
    //     </View>
    //   );
    // }

    return (
      <MediumText style={{ paddingHorizontal: 4 }} bold={true}>
        {`Rp. ${formatThousand(Number(item.price))}, `}
      </MediumText>
    );
  }

  renderHolder() {
    const { item } = this.props;
    const { isWishlist } = this.state;

    const onWishlist = async () => {
      // if (isWishlist) {
      //   this.setState({ isWishlist: false });
      // } else {
      //   const response = await item.fetchWishlist();
      //   this.setState({ isWishlist: response });
      // }
      item.fetchWishlist();
      this.setState({ isWishlist: item.isWishlist });
    };

    if (item.discount) {
      return (
        <View
          style={{
            flex: 1,
            width: '100%',
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              backgroundColor: colors.PRIMARY_COLOR,
              borderBottomRightRadius: 20,
              paddingHorizontal: 8,
            }}
          >
            <MediumText bold={true} color={colors.WHITE_COLOR}>{`${
              item.discount
            }%`}</MediumText>
          </View>
          <TouchableOpacity style={{ marginRight: 16 }}>
            <Icon type={'ionicon'} name={'ios-heart-outline'} size={24} />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <TouchableOpacity
        onPress={item.fetchWishlist}
        style={{ position: 'absolute', right: 0, padding: 16 }}
      >
        <Icon
          type={'ionicon'}
          name={this.props.item.isWishlist ? 'ios-heart' : 'ios-heart-empty'}
          size={24}
          color={
            this.props.item.isWishlist
              ? colors.NEGATIVE_COLOR
              : colors.GREY_COLOR
          }
        />
      </TouchableOpacity>
    );
  }

  navigateDetailProduct() {
    const { navigation, item } = this.props;

    navigation.navigate('DetailsProductPage', { product: item });
  }
}

const style = {
  flex: 1,
  minWidth: 145,
  width: undefined,
  margin: 4,
  marginVertical: 8,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,

  elevation: 3,
};
