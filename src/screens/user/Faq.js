// @@flow

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { AwareScroll } from '../../components/AwareScroll';
import { Loading } from '../../components/modal/Loading';
import { HeaderText } from '../../components/texts/HeaderText';
import { MediumText } from '../../components/texts/MediumText';
import { ViewCenter } from '../../components/ViewCenter';
import { ButtonNavBack } from '../../components/buttons/ButtonNavBack';
import { colors } from '../../utils/Colors';
import { NormalText } from '../../components/texts/NormalText';
import { apiGetFaq } from '../../utils/api';

class FaqPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: <ButtonNavBack navigation={navigation} />,
      headerTitle: <HeaderText>{'FAQ and Contact Us'}</HeaderText>,
      headerRight: <View />,
      headerStyle: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
      },
    };
  };

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const response = await apiGetFaq();
      if (response && response.data) {
        this.setState({ data: response.data });
      }
    } catch (error) {
    } finally {
      this.setState({ loading: false });
    }
  }
  render() {
    return (
      <AwareScroll>
        <ViewCenter>{this.renderFaq()}</ViewCenter>
        <Loading visible={this.state.loading} />
      </AwareScroll>
    );
  }

  renderFaq() {
    const { data } = this.state;

    if (data && data.length) {
      return data.map(item => {
        return (
          <View
            key={item.id_faq}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: colors.BORDER_COLOR,
              marginVertical: 8,
              paddingHorizontal: 8,
            }}
          >
            <MediumText bold={true}>Q: {item.question}</MediumText>
            <MediumText>A: {item.answer}</MediumText>
          </View>
        );
      });
    }
    return null;
  }
}

export default FaqPage;
