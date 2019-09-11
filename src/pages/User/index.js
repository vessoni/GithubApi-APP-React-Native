import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Loading,
  GitButton,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    page: 1,
    perPage: 7,
    loading: false,
    loadingStared: false,
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const { page, perPage } = this.state;
    const user = navigation.getParam('user');
    this.setState({ loading: true });

    const response = await api.get(
      `/users/${user.login}/starred?page=${page}&per_page=${perPage}`
    );

    this.setState({
      stars: response.data,
      page: page + 1,
      loading: false,
    });
  }

  renderFooter = () => {
    const { loadingStared } = this.state;
    if (!loadingStared) return null;
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  };

  loadRepositoryStars = async () => {
    const { navigation } = this.props;
    const { loadingStared, stars, page, perPage } = this.state;

    if (loadingStared) return;

    const user = navigation.getParam('user');

    this.setState({ loadingStared: true });

    const response = await api.get(
      `/users/${user.login}/starred?page=${page}&per_page=${perPage}`
    );

    this.setState({
      stars: [...stars, ...response.data],
      page: page + 1,
      loadingStared: false,
    });
  };

  handleNavigate = webgit => {
    const { navigation } = this.props;

    navigation.navigate('WebGit', { webgit });
  };

  render() {
    const { navigation } = this.props;
    const { stars, loading } = this.state;
    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading ? (
          <Loading>
            <ActivityIndicator size={200} color="#23b283" />
          </Loading>
        ) : (
          <Stars
            data={stars}
            onEndReached={this.loadRepositoryStars}
            onEndReachedThreshold={0.1}
            ListFooterComponent={this.renderFooter}
            keyExtractor={star => String(star.id)}
            renderItem={({ item }) => (
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title> {item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
                <GitButton onPress={() => this.handleNavigate(item)}>
                  <Icon name="remove-red-eye" size={15} color="#fff" />
                </GitButton>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}
