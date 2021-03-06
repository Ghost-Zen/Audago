import React from 'react';
import ReactDOM from 'react-dom';
import './styling/index.css';
import App from './App.jsx';
import * as serviceWorker from './utils/serviceWorker';
import config from './config'
import { ApolloProvider } from '@apollo/react-hooks';

// const { loading, error, data } = useQuery(DATA);
// console.log(data)


ReactDOM.render(
  <ApolloProvider client={config}>
    <App />
  </ApolloProvider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
