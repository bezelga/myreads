import React, {Component} from 'react'
import Book from './Book'

class BookShelf extends Component {
  state = {
    books: [
      { title: "To kill a Mocking Bird",
        coverURL: 'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api',
        authors: 'Harper Lee' }
    ]
  }

  render() {
    return (
      <ol>
        {this.state.books.map((book) => (
          <li key={book.title}><Book {...book}/></li>
        ))}
      </ol>
    )
  }
}

export default BookShelf
