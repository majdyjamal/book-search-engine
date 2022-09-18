// Define the necessary Query and Mutation types
// https://www.apollographql.com/docs/apollo-server/schema/schema#supported-types
// https://www.apollographql.com/docs/apollo-server/schema/schema#the-query-type
// https://www.apollographql.com/docs/apollo-server/schema/schema#the-mutation-type


const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Book {
    bookId: String!
    authors: [String]
    description: String!
    image: String
    link: String
    title: String!
}

input BookContent {
    authors: [String]
    description: String!
    image: String
    link: String
    title: String!
}

type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}

type Auth {
    token: String
    user: User
}

type Query {
    me: User
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email:String!, password:String!): Auth
}
`
module.exports = typeDefs;

/*
    saveBook(book: BookContent): User
    removeBook(bookId: ID!): User
*/