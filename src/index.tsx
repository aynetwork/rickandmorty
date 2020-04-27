import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import './index.css';
import App from './App';

const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
            <App />
        </ApolloHooksProvider>
    </ApolloProvider>,
    document.getElementById('root'),
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
