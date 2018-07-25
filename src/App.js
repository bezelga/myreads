import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './components/BookShelf'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    currentlyReading: [],
    wantToRead: [],
    read: [],
    none: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => (
      this.setState({
        currentlyReading: this.booksByShelf(books, "currentlyReading"),
        wantToRead: this.booksByShelf(books, "wantToRead"),
        read: this.booksByShelf(books, "read")
      })
    ))
  }

  booksByShelf = (books, shelf) => (
    books.filter(book => (book.shelf === shelf))
  )

  changeBookState = (currentShelf) => (bookTitle) => (newShelf) => {
    if (currentShelf === newShelf) { return }
    const book = this.state[currentShelf].find((book) => (
      book.title === bookTitle
    ))

    this.setState({
       [currentShelf]: this.state[currentShelf].filter((book) => (
         book.title !== bookTitle
       )),
       [newShelf]: [...this.state[newShelf], book],
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  status="currentlyReading"
                  books={this.state.currentlyReading}
                  changeBookStateFunction={this.changeBookState("currentlyReading")}
                />
                <BookShelf
                  status="wantToRead"
                  books={this.state.wantToRead}
                  changeBookStateFunction={this.changeBookState("wantToRead")}
                />
                <BookShelf
                  status="read"
                  books={this.state.read}
                  changeBookStateFunction={this.changeBookState("read")}
                />
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
