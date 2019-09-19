import React, {Component} from 'react';
import api from '../../services/api';
import {View} from 'react-native';
import PropTypes from 'prop-types';
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
  EndListLoading,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };
  state = {
    stars: [],
    page: 1,
    loading: true,
    refreshing: false,
    loading_more: false,
  };

  async componentDidMount() {
    this.loadStars();
  }

  loadStars = async (page = 1) => {
    const {stars} = this.state;
    const {navigation} = this.props;
    const user = navigation.getParam('user');

    const response = await api.get(`/users/${user.login}/starred`, {
      params: {page},
    });

    this.setState({
      stars: page >= 2 ? [...stars, ...response.data] : response.data,
      page,
      loading: false,
      refreshing: false,
      loading_more: false,
    });
  };

  loadMore = () => {
    const {page, loading_more} = this.state;
    this.setState({loading_more: true});
    const nextPage = page + 1;

    this.loadStars(nextPage);
  };

  refreshTheList = () => {
    this.setState({refreshing: true, stars: []}, this.loadStars);
  };

  openWebView = rep => {
    const {navigation} = this.props;

    navigation.navigate('Web', {rep});
  };

  render() {
    const {navigation} = this.props;
    const user = navigation.getParam('user');
    const {stars, loading, refreshing, loading_more} = this.state;
    return (
      <Container>
        <Header>
          <Avatar source={{uri: user.avatar}}></Avatar>
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <Loading />
        ) : (
          <Stars
            data={stars}
            onRefresh={this.refreshTheList}
            refreshing={refreshing}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            keyExtractor={star => String(star.id)}
            renderItem={({item}) => (
              <Starred onPress={() => this.openWebView(item)}>
                <OwnerAvatar source={{uri: item.owner.avatar_url}} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
        {loading_more && <EndListLoading />}
      </Container>
    );
  }
}
