import React from 'react';
import {
  View,
  ListView,
  Text,
  ActivityIndicator,
  RefreshControl
} from 'react-native';

import SearchBar from './SearchBar';
import MovieCell from './MovieCell';
import MovieScreen from '../MovieScreen';

const API_INFO = {
  url: 'http://api.rottentomatoes.com/api/public/v1.0',
  key: '7waqfqbprs7pajbz28mqf6vz'
};

const SEARCH_STATE = {
  INIT: 0,
  REFRESH: 1,
  NEXT: 2
};

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);

    this.movieData = {
      total: 0,
      pageNo: 1,
      data: [],
      query: ''
    };

    this.state = {
      isLoading: false,
      isLoadingHead: false,
      isLoadingTail: false,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  componentDidMount() {
    this.searchMovies(SEARCH_STATE.INIT, this.movieData.query);
  }

  _urlForQueryAndPage(query, limit, pageNo) {
    query = encodeURIComponent(query);

    let url = (
      `${API_INFO.url}/lists/movies/in_theaters.json` +
      `?apiKey=${API_INFO.key}&q=${query}&page_limit=${limit}&page=${pageNo}`
    );

    return url;
  }

  searchMovies(state, query) {
    const limit = 10;

    switch (state) {
      case SEARCH_STATE.INIT, SEARCH_STATE.REFRESH:
        this.movieData.data = [];
        this.movieData.pageNo = 1;
        break;

      case SEARCH_STATE.NEXT:
        if (limit * this.movieData.pageNo > this.movieData.total)
          return;

        this.movieData.pageNo++;
        break;
    }

    this.setState({
      isLoading: state === SEARCH_STATE.INIT,
      isLoadingHead: state === SEARCH_STATE.REFRESH,
      isLoadingTail: state === SEARCH_STATE.NEXT
    });

    const url = this._urlForQueryAndPage(query, limit, this.movieData.pageNo);

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.movieData.data.push(...data.movies);
        this.movieData.total = data.total;

        this.setState({
          isLoading: false,
          isLoadingHead: false,
          isLoadingTail: false,
          dataSource: this.state.dataSource.cloneWithRows(this.movieData.data)
        });
      })
      .done();
  }

  onEndReached() {
    this.searchMovies(SEARCH_STATE.NEXT, this.movieData.query);
  }

  selectMovie(movie) {
    this.props.navigator.push({
      name: 'MovieScreen',
      title: '영화',
      movie
    });
  }

  render() {
    return (
      <View style={{flex:1}}>
        <SearchBar
          onSearchChange={this.onSearchChange.bind(this)}
        />
        {this.renderContent()}
      </View>
    );
  }

  renderContent() {
    if (this.state.isLoading) {
      //
      // 로딩 화면
      //
      return (
        <ActivityIndicator
          style={{flex:1}}
          animating={true}
          size='large'
        />
      );
    }
    else {
      //
      // 영화 목록 (리스트뷰)
      //
      return (
        <ListView
          refreshControl={this.refreshControl()}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          onEndReached={this.onEndReached.bind(this)}
          onEndReachedThreshold={10}
          renderSeparator={this.renderSeparator.bind(this)}
          renderFooter={this.renderFooter.bind(this)}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode='on-drag'
        />
      );
    }
  }

  onSearchChange(e) {
    this.movieData.query = e.nativeEvent.text.toLowerCase();

    clearTimeout(this.timeoutID);

    this.timeoutID = setTimeout(() => {
      this.searchMovies(SEARCH_STATE.INIT, this.movieData.query);
    }, 300);
  }

  refreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.isLoadingHead}
        onRefresh={() => {
          this.searchMovies(SEARCH_STATE.REFRESH, this.movieData.query);
        }}
      />
    );
  }

  renderRow(movie) {
    return (
      <MovieCell
        key={movie.id}
        movie={movie}
        onSelect={() => this.selectMovie(movie)}
      />
    );
  }

  renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={'SEP-' + sectionID + '-' + rowID}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          height: 1,
          marginLeft: 4
        }}
      />
    );
  }

  renderFooter() {
    if (!this.state.isLoadingTail) {
      return;
    }

    return (
      <ActivityIndicator style={{marginVertical: 20}}/>
    );
  }
}
