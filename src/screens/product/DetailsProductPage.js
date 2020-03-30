import { Icon } from 'react-native-elements';
import { inject, observer } from 'mobx-react/native';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  // FlatList,
  NavigationScreenProps,
  NavigationStackScreenOptions,
} from 'react-navigation';
import { AwareScroll } from '../../components/AwareScroll';
import { ButtonCircle } from '../../components/buttons/ButtonCircle';
import { ButtonNavBack } from '../../components/buttons/ButtonNavBack';
import { ButtonNavCart } from '../../components/buttons/ButtonNavCart';
import { SeparatorHorizontal } from '../../components/SeparatorHorizontal';
import { SlideShow } from '../../components/SlideShow';
import { MediumText } from '../../components/texts/MediumText';
import { ViewCenter } from '../../components/ViewCenter';
import { reviewsProduct } from '../../mocks/reviews';
import { colors } from '../../utils/Colors';
import { formatThousand } from '../../utils/FormatThousand';
import { DetailProductFooter } from './DetailProductFooter';
// import ListReviews from './ListReviews';

// interface IProps extends NavigationScreenProps {
//   productStore;
//   cartStore;
// }

// interface IState {
//   product;
//   reviews;
// }

@inject('productStore', 'cartStore')
@observer
class DetailsProductPage extends Component {
  constructor(props) {
    super(props);

    this.addProductCart = this.addProductCart.bind(this);
    this.buyProduct = this.buyProduct.bind(this);

    this.state = {
      product: null,
      reviews: '',
    };
  }

  static navigationOptions = ({ navigation }) => {
    const navCartOnPress = () => {
      navigation.navigate('Cart');
    };
    return {
      headerLeft: <ButtonNavBack navigation={navigation} />,
      headerRight: <ButtonNavCart onPress={navCartOnPress} />,
      headerStyle: {
        borderBottomWidth: 0,
        elevation: 0,
        // height: 50,
        // position: 'absolute',
      },
    };
  };

  async componentDidMount() {
    const { params } = this.props.navigation.state;
    // const { productStore } = this.props;

    if (params && params.product) {
      // const product = await productStore.fetchProductsById(params.product.id);
      // console.log(params.product);
      this.setState({ product: params.product, reviews: reviewsProduct });
    }
  }

  render() {
    const { product } = this.state;

    if (!product) {
      return (
        <ViewCenter style={{ flex: 1 }}>
          <ActivityIndicator />
        </ViewCenter>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <AwareScroll>
          <View>
            {this.renderBannerProduct()}
            {/* <View style={styles.buttonCircle}>
              <ButtonCircle
                icon={'md-heart-empty'}
                style={{ backgroundColor: colors.WHITE_COLOR }}
              />
            </View> */}
            <View style={styles.headerContent}>
              <Text style={styles.title}>{product.name}</Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.startContainer}>
                  <Text style={{ fontSize: 12, color: 'white' }}>
                    {product.rate}
                  </Text>
                  <Icon
                    type={'ionicon'}
                    name="md-star"
                    size={13}
                    color={'white'}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 6,
                    marginLeft: 5,
                    color: colors.GREY_COLOR,
                  }}
                >
                  {`${product.review} Ulasan`}
                </Text>
              </View>
              <View>{this.renderPrice(product)}</View>
            </View>

            <View style={styles.descContainer}>
              <Text style={styles.title}>Deskripsi Produk</Text>
              <Text style={styles.descText}>{product.description}</Text>
            </View>
          </View>
        </AwareScroll>
        <DetailProductFooter
          onAddProduct={this.addProductCart}
          onBuyProduct={this.buyProduct}
        />
      </View>
    );
  }

  renderBannerProduct() {
    const { product } = this.state;
    if (product && product.images.length) {
      // const product = { ...params.product };

      return (
        <SlideShow
          style={{ borderRadius: 8 }}
          paginationStyle={{
            backgroundColor: colors.BORDER_COLOR,
            opacity: 0.5,
            bottom: 0,
            paddingVertical: 8,
            marginTop: 10,
          }}
        >
          {product.images.map((image, index) => {
            return this.slideItem(image.uri, index);
          })}
          {/* {this.slideItem(product.images.substring(1), 1)} */}
        </SlideShow>
      );
      // return (
      //   <ScrollView
      //     horizontal={true}
      //     pagingEnabled={true}
      //     snapToInterval={200}
      //     showsHorizontalScrollIndicator={false}
      //   >
      //     {product.images.map((image, index) => (
      //       <View key={index}>
      //         <Image style={styles.image} source={{ uri: image.uri }} />
      //       </View>
      //     ))}
      //   </ScrollView>
      // );
    }

    return <View />;
  }

  renderPrice(item) {
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

  slideItem(uri, index) {
    return (
      <View key={index} style={styles.containerSlide}>
        <Image style={styles.image} source={{ uri }} resizeMode={'cover'} />
      </View>
    );
  }

  // renderReview() {
  //   const { reviews } = this.state;
  //   const _keyExtractor = (item, index) => {
  //     return `${index}`;
  //   };
  //   return (
  //     <View style={{ marginBottom: 15 }}>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           width: '100%',
  //           marginVertical: 10,
  //           display: 'flex',
  //           flex: 1,
  //           paddingHorizontal: 15,
  //         }}
  //       >
  //         <Text style={{ flex: 1 }}>Review Product</Text>
  //         <TouchableOpacity style={{ justifyContent: 'flex-end' }}>
  //           <Text style={{ color: colors.GOLD_COLOR, fontWeight: 'bold' }}>
  //             Lihat Semua
  //           </Text>
  //         </TouchableOpacity>
  //       </View>
  //       <FlatList
  //         keyExtractor={_keyExtractor}
  //         data={reviews}
  //         renderItem={this.renderRow}
  //         numColumns={1}
  //       />
  //     </View>
  //   );
  // }

  // renderRow(item) {
  //   return <ListReviews item={item} />;
  // }

  buyProduct() {
    const { product } = this.state;
    const { cartStore, navigation } = this.props;
    if (product) {
      cartStore.addProduct(product);
    }

    navigation.navigate('Cart');
  }
  addProductCart() {
    const { product } = this.state;
    const { cartStore } = this.props;

    if (product) {
      cartStore.addProduct(product);
    }
    //
  }
}

const styles = StyleSheet.create({
  headerContent: {
    borderBottomColor: colors.BORDER_COLOR,
    borderBottomWidth: 1,
    padding: 15,
    color: colors.GREY_COLOR,
  },

  title: {
    fontSize: 18,
    color: colors.GREY_COLOR,
  },

  startContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    backgroundColor: colors.GOLD_COLOR,
    width: 46,
    height: 20,
    borderRadius: 3,
    marginVertical: 5,
  },

  strikeText: {
    color: colors.GREY_COLOR,
    fontSize: 15,
    marginLeft: 10,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    marginVertical: 5,
  },

  priceText: {
    fontWeight: 'bold',
    fontSize: 15,
    marginVertical: 5,
    color: colors.GREY_COLOR,
  },

  descContainer: {
    borderBottomColor: colors.BORDER_COLOR,
    borderBottomWidth: 1,
    padding: 15,
    color: colors.GREY_COLOR,
  },

  descText: {
    marginTop: 5,
    color: colors.GREY_COLOR,
  },

  image: {
    width: Dimensions.get('window').width,
    height: 240,
  },

  containerSlide: {
    borderRadius: 8,
    backgroundColor: colors.BORDER_COLOR,
  },

  imageProdut: {
    width: 200,
    height: 200,
  },
  buttonCircle: {
    position: 'absolute',
    left: Dimensions.get('screen').width - 60,
    top: 220,
    alignItems: 'flex-end',
  },

  buttonRight: {
    width: Dimensions.get('screen').width / 2 - 8,
    backgroundColor: colors.GOLD_COLOR,
    height: 50,
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginRight: 5,
  },
  buttonLeft: {
    width: Dimensions.get('screen').width / 2 - 8,
    backgroundColor: colors.WHITE_COLOR,
    height: 50,
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    borderColor: colors.GOLD_COLOR,
    borderWidth: 1,
    marginHorizontal: 5,
  },
});

export default DetailsProductPage;
