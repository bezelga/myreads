import React from 'react'
import Changer from '../components/Changer'
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme'

const changeBookStateFunction = () => () => {}

const changerSample = <Changer currentBookshelf="read" changeBookStateFunction={changeBookStateFunction}/>

it('matches the changer contract with final snapshot', () => {
  const component = renderer.create(changerSample);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})

test('Changer changes state', () => {
  // const changer = shallow(changerSample)

  // changer.find('select').simulate('change', {target: { value : 'read'}});
  // expect(changer.find('select [selected]').val()).to.equal('read');
  // expect(changer.find('select')).toBe("Read");

});
