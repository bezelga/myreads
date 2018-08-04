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
    BooksAPI.getAll().then((books) => {
      this.setState({
        currentlyReading: this.booksByShelf(books, "currentlyReading"),
        wantToRead: this.booksByShelf(books, "wantToRead"),
        read: this.booksByShelf(books, "read")
      })
    })
  }

  booksMap = () => {
    const result = {}

    Object.entries(this.state).forEach(([shelf, books]) => {
      books.forEach(book => (result[book.id] = shelf))
    })

    return result
  }

  booksByShelf = (books, shelf) => (
    books.filter(book => (book.shelf === shelf))
  )

  updateBookShelf = (currentShelf, newShelf) => (book) => {
    BooksAPI.update(book, newShelf)

    this.setState({
      [currentShelf]: this.state[currentShelf].filter((currentShelfBook) => (
        currentShelfBook.id !== book.id
      )),
      [newShelf]: [...this.state[newShelf], book]
    })
  }

  findBook = (shelf, bookID) => {
    const book = this.state[shelf].find(book => ( book.id === bookID ))
    return (book ? Promise.resolve(book) : BooksAPI.get(bookID))
  }

  changeBookState = (currentShelf) => (bookID) => (newShelf) => {
    if (currentShelf !== newShelf) {
      this.findBook(currentShelf, bookID).then(this.updateBookShelf(currentShelf, newShelf))
    }
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
          <Search booksMap={this.booksMap()} changeBookStateFunction={this.changeBookState}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
