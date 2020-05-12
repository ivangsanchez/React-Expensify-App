import React from 'react';
import {shallow} from 'enzyme';
import {Header} from '../../components/Header';

test('render header correctly', () => {
    const wrapper = shallow(<Header startLogout={() => {}}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should call startlogout on button click',() => {
    const startLogout = jest.fn(); //simule a function
    const wrapper = shallow(<Header startLogout={startLogout}/>);
    wrapper.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled();
});