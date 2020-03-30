import { Icon } from 'react-native-elements';
import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// interface IProps {
//   urlPhoto;
//   price;
//   priceBeforeDiscount?;
//   countReview;
//   star;
//   productName;
// }
export class CardProduct extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          elevation: 1.5,
          shadowOffset: { width: 5, height: 2 },
          shadowColor: '#f7f7fc',
          shadowOpacity: 10,
          shadowRadius: 2,
          margin: 8,
          borderRadius: 1,
          height: 'auto',
          width: Dimensions.get('window').width / 2 - 15,
        }}
      >
        <View>
          <Image
            style={styles.imageProdut}
            source={{ uri: this.props.urlPhoto }}
          />
          <View style={styles.disconInfo}>
            <Text style={{ fontWeight: 'bold', color: 'white' }}>10 %</Text>
          </View>
          <TouchableOpacity style={styles.iconHeart}>
            <Icon
              type={'ionicon'}
              name="md-heart-outline"
              size={24}
              color={'white'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{this.props.productName}</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.startContainer}>
              <Text style={{ fontSize: 10, color: 'white' }}>
                {this.props.star}{' '}
                <Icon
                  type={'ionicon'}
                  name="md-star"
                  size={13}
                  color={'white'}
                />
              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 10, marginTop: 7, marginLeft: 5 }}>
              {this.props.countReview} Ulasan
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.priceText}>Rp. {this.props.price}</Text>
            <Text style={styles.strikeText}>
              {this.props.priceBeforeDiscount
                ? 'Rp.' + this.props.priceBeforeDiscount
                : ''}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageProdut: {
    width: Dimensions.get('window').width / 2 - 15,
    height: Dimensions.get('window').width / 2 - 15,
  },
  headerContent: {
    width: Dimensions.get('window').width,
    height: 100,
    padding: 15,
    color: '#5c5c5c',
  },

  title: {
    fontSize: 12,
    color: '#5c5c5c',
  },

  startContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    backgroundColor: '#c6a265',
    width: 46,
    height: 20,
    borderRadius: 3,
    marginVertical: 5,
  },

  strikeText: {
    color: '#5c5c5c',
    fontSize: 11,
    marginLeft: 10,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    marginVertical: 5,
  },

  priceText: {
    fontWeight: 'bold',
    fontSize: 11,
    marginVertical: 5,
    color: '#6b6b6b',
  },
  iconHeart: {
    position: 'absolute',
    marginTop: 5,
    left: Dimensions.get('window').width / 2 - 15 - 25,
  },
  disconInfo: {
    position: 'absolute',
    backgroundColor: '#c6a265',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderBottomRightRadius: 25,
  },
});
