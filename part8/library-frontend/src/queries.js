import { gql } from '@apollo/client';

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`;

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
      id
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
      id
    }
  }
`
const EDIT_AUTHOR = gql`
  mutation($name: String! $year: Int!) {
    editAuthor(
      name: $name
      setBorn: $year
    ) {
      name
      born
      bookCount
      id
    }
  }
`


export default {ALL_AUTHORS, ALL_BOOKS, ADD_BOOK, EDIT_AUTHOR}