import React from 'react'
import Search from '../components/Search'
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme'
import { MemoryRouter } from 'react-router-dom'

const changeBookStateFunction = () => () => {}

it('matches the search contract with final snapshot', () => {
  const component = renderer.create(<MemoryRouter><Search booksMap={{}} changeBookStateFunction={changeBookStateFunction}/></MemoryRouter>)
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})

test('Changer changes state', () => {
  // const component = renderer.create(<MemoryRouter><Search booksMap={{}} changeBookStateFunction={changeBookStateFunction}/></MemoryRouter>)

  // changer.find('select').simulate('change', {target: { value : 'read'}});
  // expect(changer.find('select [selected]').val()).to.equal('read');
  // expect(changer.find('select')).toBe("Read");
});
