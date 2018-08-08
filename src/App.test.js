import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Book from './components/Book'
import BookShelf from './components/BookShelf'
import Changer from './components/Changer'
import Search from './components/Search'
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

/**
 This course is not designed to teach Test Driven Development.
 Feel free to use this file to test your application, but it
 is not required.
**/

jest.mock('./BooksAPI')

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<MemoryRouter><App /></MemoryRouter>, div)
})

it('matches the contract with final snapshot', () => {
  const component = renderer.create(
    <MemoryRouter><App /></MemoryRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})

const changeBookStateFunction = () => () => {}

it('matches the book contract with final snapshot', () => {
  const component = renderer.create(
    <Book changeBookStateFunction={changeBookStateFunction} title="MyBook" id="123" shelf="read"></Book>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})

it('matches the bookshelf contract with final snapshot', () => {
  const component = renderer.create(
    <BookShelf changeBookStateFunction={changeBookStateFunction} books={[]}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})

it('matches the changer contract with final snapshot', () => {
  const component = renderer.create(
    <Changer currentBookshelf="read" changeBookStateFunction={changeBookStateFunction}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})

it('matches the search contract with final snapshot', () => {
  const component = renderer.create(
    <MemoryRouter><Search booksMap={{}} changeBookStateFunction={changeBookStateFunction}/></MemoryRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})
