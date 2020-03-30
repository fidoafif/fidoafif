import { Icon } from 'react-native-elements';
import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Card } from '../../components/Card';
import { ImageCircle } from '../../components/ImageCircle';
import { colors } from '../../utils/Colors';

// export interface IListReviewsProps {
//   item;
// }

// export interface IListReviewsState {
// }

class ListReviews extends Component {
  render() {
    const { item } = this.props.item;
    return (
      <View style={{ padding: 15, width: '100%' }}>
        <Card height={90}>
          <View
            style={{
              display: 'flex',
              alignSelf: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <ImageCircle source={item.img} />
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontSize: 16, color: colors.GREY_COLOR }}>
                {item.name}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Icon
                  type={'ionicon'}
                  name="md-star"
                  size={14}
                  color={colors.GOLD_COLOR}
                />
                <Icon
                  type={'ionicon'}
                  name="md-star"
                  size={14}
                  color={colors.GOLD_COLOR}
                />
                <Icon
                  type={'ionicon'}
                  name="md-star"
                  size={14}
                  color={colors.GOLD_COLOR}
                />
                <Icon
                  type={'ionicon'}
                  name="md-star"
                  size={14}
                  color={colors.GOLD_COLOR}
                />
                <Icon
                  type={'ionicon'}
                  name="md-star"
                  size={14}
                  color={colors.GREY_COLOR}
                />
                <Text style={{ fontSize: 10, margin: 1 }}>{item.star}</Text>
              </View>
              <Text style={{ color: colors.GREY_COLOR }}>{item.comment}</Text>
            </View>
          </View>
        </Card>
      </View>
    );
  }
}
export default ListReviews;
