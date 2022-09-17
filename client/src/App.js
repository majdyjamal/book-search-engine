import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import AuthService from './utils/auth'

// Setup Apollo Client, https://www.apollographql.com/docs/react/get-started
import { ApolloClient, ApolloProvider, HttpLink, ApolloLink, InMemoryCache, concat } from '@apollo/client';

// Customizing request logic, added a custom link to Apollo Client. This link adds an Authorization
// header to every HTTP request before the HttpLink sends it.
// https://www.apollographql.com/docs/react/networking/advanced-http-networking/

const httpLink = new HttpLink({
  uri: '/graphql'
});

const clientAuthMiddleware = new ApolloLink((operation, forward) => {
  // get the token from local storage 
  const token = AuthService.getToken();
  console.log('clientAuthMiddleware > token:', token);

  // add the authorization token to the headers.
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }));

  return forward(operation);
})

const client = new ApolloClient({
  link: concat(clientAuthMiddleware, httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchBooks} />
            <Route exact path='/saved' component={SavedBooks} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
