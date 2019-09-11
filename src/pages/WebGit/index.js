import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

export default class WebGit extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('webgit').name,
  });

  render() {
    const { navigation } = this.props;
    const repository = navigation.getParam('webgit');
    return (
      <WebView
        source={{ uri: repository.html_url }}
        style={{ marginTop: 20 }}
      />
    );
  }
}
