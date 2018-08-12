import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import BookShelf from './components/BookShelf'
import Changer from './components/Changer'
import Search from './components/Search'
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme'

/**
 This course is not designed to teach Test Driven Development.
 Feel free to use this file to test your application, but it
 is not required.
**/

jest.mock('./BooksAPI')

const appSample = <MemoryRouter><App /></MemoryRouter>

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

const bookSample = {id: '123',
  shelf: 'currentlyReading',
  title: 'React Trainning',
  authors: ['Fabiano Beselga']}

it('updates the bookshelf', () => {
  const wrapper = renderer.create(appSample);
  const app = wrapper.root.findByType(App)
  const inst = app.instance
  inst.updateBookShelf("currentlyReading","read")(bookSample)
  // TODO: create expectation
})

const changeBookStateFunction = () => () => {}

it('matches the bookshelf contract with final snapshot', () => {
  const component = renderer.create(
    <BookShelf changeBookStateFunction={changeBookStateFunction} books={[]}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})


