import { gql } from '@apollo/client';

export const GET_ME = gql`
query me($userId: string) {
    me(userId: $userId) {
        _id
        username
        email
        bookCount
        savedBooks {
          title 
          description
        }
    }
}
`;