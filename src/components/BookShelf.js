import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Book from './Book'
import { shelvesDictionary } from '../utils'

class BookShelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelvesDictionary[this.props.status]}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books && this.props.books.map((book) => (
              <li key={book.title}>
                <Book
                  title={book.title}
                  authors={book.authors.join(', ')}
                  shelf={this.props.status}
                  coverURL={book.imageLinks && book.imageLinks.thumbnail}
                  changeBookStateFunction={this.props.changeBookStateFunction}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

BookShelf.propTypes = {
  books: PropTypes.array.isRequired
}

export default BookShelf
