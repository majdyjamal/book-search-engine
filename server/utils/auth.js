const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'UpdatedNewSecretsshhhhh__:)';
const expiration = '2h';

// Updated the auth middleware function to work with the GraphQL API.
// https://www.apollographql.com/docs/apollo-server/security/authentication/
//
// Middleware-specific context fields ( Express )
//	{ req: express.Request, res: express.Response }
// https://www.apollographql.com/docs/apollo-server/api/apollo-server/#middleware-specific-context-fields

module.exports = {
  // Authentication function/middleware that returns Apollo Server context.  
  authMiddleware: function (msg) {
    let req = msg.req;
    // allows token to be sent via req.query or headers
    let token = req.body?.token || req.query?.token || req.headers?.authorization;
    // ["Bearer", "<tokenvalue>"]
    if (req.headers?.authorization) {
      token = token.split(' ').pop().trim();
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('No token.');
    }

    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
