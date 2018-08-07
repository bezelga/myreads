import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Changer from './Changer'

class Book extends Component {
  formatAuthors = () => {
    const {authors} = this.props
    if (!authors) { return "" }
    return Array.isArray(authors) ? authors.join(", ") : authors
  }

  render() {
    return(
    <div className="book">
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
