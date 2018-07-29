import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'
import { Link } from 'react-router-dom'
import debounce from 'lodash.debounce'

class Search extends Component {
  state = {
    query: '',
    books: null
  }


  cleanResults = () => {
    this.setState({ books: [] })
  }

  booksAPISearch = debounce((query) => {
    console.log('Debounced Event:', query);
    BooksAPI.search(query.trim()).then(this.afterSearchResponse)
  }, 500)

  updateQuery = (query) => {
    this.setState({ query: query, books: 'loading' })
    query ? this.booksAPISearch(query) : this.cleanResults()
  }

  afterSearchResponse = (books) => {
    if (Array.isArray(books)) {
      this.setState({ books })
    } else {
      this.setState({ books: [] })
    }
  }

  renderBook = (book) => {
    const shelf = this.props.booksMap[book.id] || "none"
    return (
      <li key={book.id}>
        <Book
          title={book.title}
          id={book.id}
          authors={book.authors}
          shelf={shelf}
          coverURL={book.imageLinks && book.imageLinks.thumbnail}
          changeBookStateFunction={this.props.changeBookStateFunction(shelf)}
        />
      </li>
    )
  }

  render() {
    const { query, books } = this.state

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
            {books === null ? (
              <div>Books will appear here</div>
            ) : (books === 'loading') ? (
              <div>Loading...</div>
            ) : (books.length === 0) ? (
              <div>No books found</div>
            ) : (books.map(book => (this.renderBook(book) )))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
