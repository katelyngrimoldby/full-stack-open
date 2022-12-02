import { gql } from '@apollo/client';

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      id
    }
  }
`;

const ALL_BOOKS = gql`
  query($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      id
      genres
    }
  }
`;

const ME = gql`
query {
  me {
    favouriteGenre
  }
}
`

const ADD_BOOK = gql`
  mutation($title: String!, $author: String!, $published: Int, $genres: [String]!) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
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
      id
    }
  }
`

const LOGIN = gql`
mutation($username: String! $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`


export default {ALL_AUTHORS, ALL_BOOKS, ME, ADD_BOOK, EDIT_AUTHOR, LOGIN}