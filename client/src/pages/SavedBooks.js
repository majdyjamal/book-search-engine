import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
// import useMutation from Apollo 
import { useQuery, useMutation } from '@apollo/client';
// import the GET_ME query. 
import { GET_ME } from '../utils/queries';
// import the REMOVE_BOOK mutation. 
import { REMOVE_BOOK } from '../utils/mutations';

const SavedBooks = () => {
  // set mutation react hook for the DELETE_BOOK mutation.
  const [deleteBook, { error }] = useMutation(REMOVE_BOOK);
  // set query react hook for the GET_ME query, https://www.apollographql.com/docs/react/data/queries/#executing-a-query
  const { loading, getmeerror, data } = useQuery(GET_ME);

  // if not logged in do not even try.
  if (!Auth.loggedIn()) {
    return false;
  }

  // {
  //   "data": {
  //     "me": {
  //       "_id": "63255f45e60f0781d54645aa",
  //       "username": "User5",
  //       "email": "User5@email.com",
  //       "bookCount": 0,
  //       "savedBooks": []
  //     }
  //   }
  // }
  const userData = data ? data.me : {};

  if (getmeerror) {
    console.log(getmeerror);
  }
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {

    if (!Auth.loggedIn()) {
      return false;
    }

    try {
      // Return
      //{
      //   "data": {
      //     "removeBook": {
      //       "_id": "63255f45e60f0781d54645aa",
      //       "username": "User5",
      //       "email": "User5@email.com",
      //       "bookCount": 0,
      //       "savedBooks": []
      //     }
      //   }
      // }
      await deleteBook({
        variables: {
          bookId: bookId
        },
      });

      if (error) {
        console.log(error);
      }

      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
