import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './components/BookShelf'
import Search from './components/Search'
import { Route, Link } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
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

  changeBookState = (currentShelf) => (bookID) => (newShelf) => {
    if (currentShelf === newShelf) { return }

    const book = this.state[currentShelf].find((book) => (
      book.id === bookID
    ))

    BooksAPI.update(book, newShelf)

    this.setState({
       [currentShelf]: this.state[currentShelf].filter((book) => (
         book.id !== bookID
       )),
       [newShelf]: [...this.state[newShelf], book]
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
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
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
        <Route exact path="/search" render={() => (
          <Search changeBookStateFunction={this.changeBookState("currentlyReading")}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
