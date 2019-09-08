import React, {Component} from 'react';

import {View} from 'react-native';

// import { Container } from './styles';

export default class User extends Component {
  render() {
    const {navigation} = this.props;
    console.tron.log(navigation.getParam('user'));
    return <View />;
  }
}

User.navigationOptions = {
  title: 'User',
};
