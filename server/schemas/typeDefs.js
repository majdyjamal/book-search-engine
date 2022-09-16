// Define the necessary Query and Mutation types
// https://www.apollographql.com/docs/apollo-server/schema/schema#supported-types
// https://www.apollographql.com/docs/apollo-server/schema/schema#the-query-type
// https://www.apollographql.com/docs/apollo-server/schema/schema#the-mutation-type


const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Auth {
    token: String
    user: User
}

type Book {
    bookId: string!
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

type Query {
    me: User
}

type Mutation {
    login(email:Stirng, password:String): Auth
    addUser(username: String, email: String, password: String): Auth
    saveBook(book: BookContent): User
    removeBook(bookId: ID): User
}
`
module.exports = typeDefs;