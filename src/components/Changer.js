import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { shelvesDictionary } from '../utils'

class Changer extends Component {
  render () {
    return (
      <div className="book-shelf-changer">
        <select
         defaultValue={this.props.currentBookshelf}
         onChange={(event) => this.props.changeBookStateFunction(event.target.value)}
       >
          <option value="move" disabled>Move to...</option>
          {Object.entries(shelvesDictionary).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
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
