import { Icon } from 'react-native-elements';
import { inject, observer } from 'mobx-react/native';
import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import { ButtonCircle } from '../../components/buttons/ButtonCircle';
import { Card } from '../../components/Card';
import { MediumText } from '../../components/texts/MediumText';
import { NormalText } from '../../components/texts/NormalText';
import { colors } from '../../utils/Colors';
import { formatThousand } from '../../utils/FormatThousand';
import TextFieldDefault from '../../components/textField/TextFieldDefault';
import { SmallText } from '../../components/texts/SmallText';
import { UNIT_TYPE } from '../../stores/models/ProductModel';

// interface IProps {
//   onRemove: () => void;
//   item;
//   cartStore?;
// }

@inject('cartStore')
@observer
class CardCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDozen: false,
    };

    this.addQty = this.addQty.bind(this);
    this.removeQty = this.removeQty.bind(this);
  }

  render() {
    const { item } = this.props;

    return (
      <View style={{ padding: 8, width: '100%', height: 160 }}>
        <Card>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Image style={styles.image} source={{ uri: item.image }} />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <MediumText style={{ color: '#5c5c5c', marginRight: 8 }}>
                    {item.name}
                  </MediumText>
                </View>

                <TouchableOpacity onPress={this.props.onRemove}>
                  <Icon
                    type={'ionicon'}
                    name="ios-trash"
                    size={25}
                    color={colors.GREY_COLOR}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <MediumText
                  style={{
                    color: '#5c5c5c',
                    fontWeight: 'bold',
                    flexGrow: 1,
                  }}
                >
                  Rp. {formatThousand(item.price)}
                </MediumText>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <NormalText>
                  Stock:{' '}
                  {formatThousand(
                    item.unit === UNIT_TYPE.dozen
                      ? Number(item.stock / 12).toFixed()
                      : item.stock,
                  )}
                </NormalText>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  {Number(item.discount) > 0 ? (
                    <NormalText>
                      Discount: Rp.
                      {formatThousand(item.discount)}
                    </NormalText>
                  ) : (
                    <View></View>
                  )}
                </View>
                {this.renderChangeQty()}
              </View>
            </View>
          </View>
        </Card>
      </View>
    );
  }

  renderChangeQty() {
    const { item } = this.props;
    // const toggleUnit = () => {
    //   this.setState({ isDozen: !this.state.isDozen });
    // };
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignSelf: 'flex-end',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={item.toggleUnit}
          style={{
            backgroundColor: colors.GOLD_COLOR,
            justifyContent: 'center',
            alignItems: 'center',
            height: 20,
            paddingHorizontal: 8,
            borderRadius: 4,
            marginRight: 8,
          }}
        >
          <SmallText
            style={{
              color: colors.WHITE_COLOR,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          >
            {item.unit}
          </SmallText>
        </TouchableOpacity>
        <ButtonCircle
          onPress={this.removeQty}
          style={{ backgroundColor: colors.GOLD_COLOR }}
          icon={'ios-trash'}
          size={25}
          disableIcon={true}
        >
          <NormalText style={{ color: colors.WHITE_COLOR }}>-</NormalText>
        </ButtonCircle>
        <View
          style={{
            width: 40,
            height: 30,
            marginRight: 6,
          }}
        >
          <TextInput
            style={{
              width: 40,
              height: 30,
              borderBottomColor: colors.GOLD_COLOR,
              borderBottomWidth: 1,
              margin: 0,

              marginHorizontal: 4,

              padding: 0,
              textAlign: 'center',
            }}
            keyboardType={'numeric'}
            autoCorrect={false}
            placeholder={'1'}
            onBlur={item.onBlur}
            onChangeText={item.setQty}
            value={item.unitQty + ''}
          />
        </View>

        <ButtonCircle
          onPress={this.addQty}
          style={{ backgroundColor: colors.GOLD_COLOR }}
          size={25}
          icon={'ios-trash'}
          disableIcon={true}
        >
          <NormalText style={{ color: colors.WHITE_COLOR }}>+</NormalText>
        </ButtonCircle>
      </View>
    );
  }

  addQty() {
    const { item, cartStore } = this.props;
    item.addition();
    cartStore.saveItems();
    cartStore.setTotalItems();
  }

  removeQty() {
    const { item, cartStore } = this.props;
    item.subtraction();
    cartStore.saveItems();
    cartStore.setTotalItems();
  }
}

const styles = StyleSheet.create({
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
});

export default CardCart;
