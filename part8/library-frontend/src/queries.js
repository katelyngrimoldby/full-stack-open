import { gql } from '@apollo/client';

const AUTHOR = gql`
  fragment AuthorDetails on Author {
    name
    born
    id
  }
`

const BOOK = gql`
  fragment BookDetails on Book {
    id
    title
    author {
      ...AuthorDetails
    }
    published
    genres
  }
  ${AUTHOR}
`

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR}
`;

const ALL_BOOKS = gql`
  query($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK}
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
      ...BookDetails
    }
  }
  ${BOOK}
`
const EDIT_AUTHOR = gql`
  mutation($name: String! $year: Int!) {
    editAuthor(
      name: $name
      setBorn: $year
    ) {
      ...AuthorDetails
    }
    ${AUTHOR}
  }
`

const LOGIN = gql`
mutation($username: String! $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK}
`


export default {ALL_AUTHORS, ALL_BOOKS, ME, ADD_BOOK, EDIT_AUTHOR, LOGIN, BOOK_ADDED}