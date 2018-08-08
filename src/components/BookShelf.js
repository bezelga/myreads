import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Book from './Book'
import { shelvesDictionary } from '../utils'

const BookShelf = (props) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelvesDictionary[props.status]}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books && props.books.map((book) => (
            <li key={book.id}>
              <Book
                title={book.title}
                id={book.id}
                authors={book.authors}
                shelf={props.status}
                coverURL={book.imageLinks && book.imageLinks.thumbnail}
                changeBookStateFunction={props.changeBookStateFunction}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

BookShelf.propTypes = {
  books: PropTypes.array.isRequired
}

export default BookShelf
