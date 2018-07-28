import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'
import { Link } from 'react-router-dom'

class Search extends Component {
  state = {
    query: '',
    books: null
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })

    BooksAPI.search(query).then((books) => {
      if (Array.isArray(books)) {
        this.setState({ books })
      } else {
        this.setState({ books: [] })
      }
    })
  }

  render() {
    const { query } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books === null && (
              <div>Type your book name</div>
            )}
            {this.state.books && this.state.books.length === 0 && (
              <div>no books found</div>
            )}
            {this.state.books && this.state.books.map((book) => {
              const shelf = this.props.booksMap[book.id] || "none"
              // if (shelf !== "none") { return null }
              return (
              <li key={book.id}>
                <Book
                  title={book.title}
                  id={book.id}
                  authors={book.authors}
                  shelf={shelf}
                  coverURL={book.imageLinks.thumbnail}
                  changeBookStateFunction={this.props.changeBookStateFunction(shelf)}
                />
              </li>)
            })}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
