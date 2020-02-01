import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, hashHistory } from 'react-router';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';


import App from './components/App';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';

import './style/style.css';


// Assumes the graphql server is avaliable at /graphql
const client = new ApolloClient({}); 

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={SongList} />
          <Route path='/song/new' component={SongCreate} />
        </Route>
      </Router> 
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
