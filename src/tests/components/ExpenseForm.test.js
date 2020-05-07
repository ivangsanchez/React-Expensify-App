import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';
import {SingleDatePicker } from 'react-dates';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('render expenseForm correctly',() => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('render expenseForm correctly with expense data',() => {
    const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>);
    expect(wrapper).toMatchSnapshot();
});

test('render error for invalid form submition', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit',{
        preventDefault: () => { }
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('set description on input change', () => {
    const value = 'New Description';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change', {
        target: {value}
    });
    expect(wrapper.state('descriptions')).toBe(value);
});

test('set note on textArea change', () => {
    const value = 'New Note';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').simulate('change', {
        target: {value}
    });
    expect(wrapper.state('note')).toBe(value);
});

test('set amount on setamount change', () => {
    const value = '23.66';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: {value}
    });
    expect(wrapper.state('amount')).toBe(value);
});

test('not set amount if invalid input', () => {
    const value = '23.664';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: {value}
    });
    expect(wrapper.state('amount')).toBe('');
});

test('call onSubsmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
    wrapper.find('form').simulate('submit',{
        preventDefault: () => { }
    });

    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        descriptions: expenses[0].descriptions,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    });
});

 test('set new date on date change', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm/>);
    wrapper.find(SingleDatePicker).prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
}); 

test('set calendar focus on change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm/>);
    wrapper.find(SingleDatePicker).prop('onFocusChange')({ focused });
    expect(wrapper.state('calendarFocused')).toBe(focused);
});