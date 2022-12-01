import { gql } from '@apollo/client';

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`;

const ADD_BOOK = gql`
  mutation($title: String!, $author: String!, $published: Int, $genres: [String]!) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      author
      published
    }
  }
`

export default {ALL_AUTHORS, ALL_BOOKS, ADD_BOOK}