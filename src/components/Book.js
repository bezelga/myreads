import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Changer from './Changer'

class Book extends Component {
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
        <Changer currentBookshelf={this.props.shelf} changeBookStateFunction={this.props.changeBookStateFunction(this.props.title)}/>
      </div>
      <div className="book-title">{this.props.title}</div>
      <div className="book-authors">{this.props.authors}</div>
    </div>
  )}
}

Book.propTypes = {
  coverURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.string.isRequired,
  shelf: PropTypes.string.isRequired
}

export default Book
