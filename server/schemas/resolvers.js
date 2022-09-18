const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        // Get the user from the User Model
        const foundUser = await User.findOne({
          _id: context.user._id,
        });

        // return the user
        return foundUser;
      }
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
    },
    saveBook: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args.bookContent } },
          { new: true, runValidators: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError('Please login first.');
    },
    removeBook: async (parent, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: args.bookId } } },
          { new: true }
        );

        return updatedUser;
      }

      throw new AuthenticationError('Please login first.');
    }
  }

};

module.exports = resolvers;