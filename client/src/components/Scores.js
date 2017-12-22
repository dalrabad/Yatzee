import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Button, Header, List, Container, Loader } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroller';

class Scores extends React.Component {
  state = { scores: [], show: 'All', totalPages: 0, page: 1 };

  componentDidMount() {
    axios.get(`/api/scores?page=${this.state.page}`)
      .then( ({ data, headers }) => {
        this.setState({ scores: data.scores, totalPages: data.total_pages });
        this.props.dispatch({ type: 'HEADERS', headers });
      })
  }

  toggleShow = () => this.setState({show: this.state.show === 'All' ? 'My' : 'All' });

  loadMore = () => {
    const page = this.state.page + 1;
    axios.get(`/api/scores?page=${page}`)
      .then( ({ data, headers }) => {
        this.setState( state => {
          return { scores: [...state.scores, ...data.scores], page }
        })
        this.props.dispatch({ type: 'HEADERS', headers })
      })
  }

  render() {
    const { show, scores, page, totalPages } = this.state;

    return(
      <Container>
        <Header as='h2'>{`Show ${show} Scores`}</Header>
        <Button onClick={this.toggleShow}>{ show === 'All' ? 'My Scores' : 'All Scores' }</Button>
        <List divided style={{ height: '60vh', overflow: 'auto' }}>
          <InfiniteScroll
            pageStart={page}
            loadMore={this.loadMore}
            hasMore={page < totalPages}
            loader={<Loader />}
            useWindow={false}
          >
            {
              scores.map( (s, i) => (
                <List.Item key={i}>
                  <List.Content>
                    <List.Header>{s.value}</List.Header>
                    <List.Description>{s.email}</List.Description>
                  </List.Content>
                </List.Item>
              ))
            }
          </InfiniteScroll>
        </List>
      </Container>
    )
  }
}

export default connect()(Scores);
