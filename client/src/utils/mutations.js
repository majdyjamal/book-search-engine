import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}`

export const LOG_IN = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
      email
    }
  }
}`

export const SAVE_BOOK = gql`
mutation SaveBook($bookContent: BookInput) {
  saveBook(bookContent: $bookContent) {
    _id
    username
    email
    bookCount
    savedBooks {
      bookId
      authors
      description
      image
      link
      title
    }
  }
}`;