import React from 'react'
import Book from '../components/Book'
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme'

const changeBookStateFunction = () => () => {}
 const bookSample = <Book changeBookStateFunction={changeBookStateFunction} title="MyBook" id="123" shelf="read"></Book>

it('matches the book contract with final snapshot', () => {
  const component = renderer.create(
    bookSample
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})

test('Book changes favorite state after toggle', () => {
  const book = shallow(bookSample)

  book.find('.book-favorite').first().simulate('click', { preventDefault() {} })

  expect(book.find('.book-unfavorite').text()).toEqual('unfavorite');

  book.find('.book-unfavorite').first().simulate('click', { preventDefault() {} })

  expect(book.find('.book-favorite').text()).toEqual('make favorite');
});
