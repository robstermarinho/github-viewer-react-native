import React from 'react';
import PropTypes from 'prop-types';

import {FlexWebView} from './styles';

export default function Web({navigation}) {
  const rep = navigation.getParam('rep');

  return <FlexWebView source={{uri: rep.html_url}} />;
}

Web.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};

Web.navigationOptions = ({navigation}) => ({
  title: navigation.getParam('rep').name,
});
