import React, { Component } from 'react'
import PropTypes from 'prop-types';
import BooksApp from '../App';

const states = [
  { value: "currentlyReading", humanized: "Currently Reading" },
  { value: "wantToRead", humanized: "Want to Read" },
  { value: "read", humanized: "Read" },
  { value: "none", humanized: "None" }
]

class Changer extends Component {
  render () {
    return (
      <div className="book-shelf-changer">
        <select
         defaultValue={this.props.currentBookshelf}
         onChange={(event) => this.props.changeBookStateFunction(event.target.value)}
       >
          <option value="move" disabled>Move to...</option>
          {states.map((state) => (
            <option key={state.value} value={state.value}> {state.humanized} </option>
          ))}
        </select>
      </div>
    )
  }
}

Changer.propTypes = {
  currentBookshelf: PropTypes.string.isRequired,
  changeBookStateFunction: PropTypes.func.isRequired
}

export default Changer
