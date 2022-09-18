const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context, info) => {
      // Get the user from the User Model
      const foundUser = await User.findOne({
        _id: 1, //args.userId,
      });

      console.log('resolvers> me > foundUser', foundUser);
      // return the user
      return foundUser;
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, args) => {
      //  args: email, password
      const errorMessage = 'login failed.';
      const user = await User.findOne({ email: args.email });

      if (!user) {
        throw new AuthenticationError(errorMessage);
      }

      const correctPw = await user.isCorrectPassword(args.password);

      if (!correctPw) {
        throw new AuthenticationError(errorMessage);
      }

      const token = signToken(user);
      return { token, user };
    }
  }
};

module.exports = resolvers;

