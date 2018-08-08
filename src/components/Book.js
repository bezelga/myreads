import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Changer from './Changer'

class Book extends Component {
  constructor(props) {
    super(props)
    this.state = {isFavorite: localStorage.getItem(this.props.id)}
    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  formatAuthors = () => {
    const {authors} = this.props
    if (!authors) { return "" }
    return Array.isArray(authors) ? authors.join(", ") : authors
  }

  toggleFavorite(event) {
    event.preventDefault();

    const {id}= this.props
    if (localStorage.getItem(id)) {
      localStorage.removeItem(id)
    } else {
      localStorage.setItem(id, 'true');
    }

    this.setState(prevState => ({ isFavorite: !prevState.isFavorite }));
  }

  render() {
    return(
    <div className="book">
      {this.state.isFavorite ?
        <div>
          <span role="img" aria-label="love">💙</span>
          <a onClick={this.toggleFavorite} href="/fav" className="book-favorite">unfavorite</a>
        </div>:
      <a onClick={this.toggleFavorite} href="unfav" className="book-favorite">make favorite</a>}
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
  shelf: PropTypes.string.isRequired,
  changeBookStateFunction: PropTypes.func.isRequired
}

export default Book
