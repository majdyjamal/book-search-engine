const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

// import the Appolo server
// https://www.apollographql.com/docs/apollo-server/integrations/middleware/#apollo-server-express
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
// Import the Authentication middleware.
const { authMiddleware } = require('./utils/auth');

server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  introspection: process.env.NODE_ENV !== 'production',
});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

// implement the Apollo Server and apply it to the Express server as middleware.
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app })

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🌍 Now listening on localhost:${PORT}`)
      console.log(`For testing use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
}

startApolloServer();