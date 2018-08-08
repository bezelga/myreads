import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Changer from './Changer'

class Book extends Component {
  state = {
    favorite: false
  }

  formatAuthors = () => {
    const {authors} = this.props
    if (!authors) { return "" }
    return Array.isArray(authors) ? authors.join(", ") : authors
  }

  makeFavorite = (bookID) => {
    console.log("making fav", bookID)
    this.setState({ favorite: true })
  }

  render() {
    return(
    <div className="book">
      {this.state.favorite && <a href="#" className="book-favorite">unfavorite</a>}
      {!this.state.favorite && <a onClick={this.makeFavorite(this.props.id)} href="#" className="book-favorite">make favorite</a>}
      <div className="book-top">
        <div className="book-cover" style={{
           width: 128,
           height: 193,
           backgroundImage: `url(${this.props.coverURL})`
          }}>
        </div>
        <Changer
          currentBookshelf={this.props.shelf}
          changeBookStateFunction={this.props.changeBookStateFunction(this.props.id)}
        />
      </div>
      <div className="book-title">{this.props.title}</div>
      <div className="book-authors">{this.formatAuthors()}</div>
    </div>
  )}
}


Book.propTypes = {
  coverURL: PropTypes.string,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  shelf: PropTypes.string.isRequired
}

export default Book
