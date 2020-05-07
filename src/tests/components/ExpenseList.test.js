import React from 'react';
import {shallow} from 'enzyme';
import {ExpenseList} from '../../components/ExpenseList';
import expenses from '../fixtures/expenses';

test('render expensesList with expenses', () =>{
    const wrapper =shallow(<ExpenseList expenses={expenses} />);
    expect(wrapper).toMatchSnapshot();
});

test('render expensesList with empty message', () =>{
    const wrapper = shallow(<ExpenseList expenses={[]} />);
    expect(wrapper).toMatchSnapshot();
});
