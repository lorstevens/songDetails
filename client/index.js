import './style/style.css'
import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client'; //this is storing data locally on the client. library agnostic!
import {ApolloProvider} from 'react-apollo'; //react apollo library. Provides intergration between react and server
import {Router, Route, hashHistory, IndexRoute} from 'react-router';

import App from './Components/App'

import SongList from './Components/SongList'

import SongCreate from './Components/SongCreate'
import SongDetail from './Components/SongDetail'

const client = new ApolloClient({});

const Root = () => {
  return(
    <ApolloProvider client = {client}>
     <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component= {SongList} />
        </Route>

        <Route path="/songs/new" component={SongCreate} />

        <Route path="songs/:id" component={SongDetail} />
        
     </Router>
    </ApolloProvider>
  );
};



ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
