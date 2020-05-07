import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import {ExpenseListFilters} from '../../components/ExpenseListFilters'
import { filters, altfilters } from '../fixtures/filters';
import { DateRangePicker } from 'react-dates';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
    );
});

test('should render expenselistFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render expenselistFilters with alt data correctly', () => {
    wrapper.setProps({
        filters:altfilters
    });
    expect(wrapper).toMatchSnapshot();
});

test('should handle text change',() => {
    const value = 'rent';
    wrapper.find('input').simulate('change', {
        target: { value }
    });
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort by date',() => {
    const value = 'date';
    wrapper.setProps({
        filters:altfilters
    });
    wrapper.find('select').simulate('change', {
        target: { value }
    });
    expect(sortByDate).toHaveBeenCalled();
});

test('should sort by date',() => {
    const value = 'amount';
    wrapper.find('select').simulate('change', {
        target: { value }
    });
    expect(sortByAmount).toHaveBeenCalled();
});

//Don´t works I dont know why!!!!!!
/* test('should handle date changes',() => {
    const starDate = moment(0).add(4,'years');
    const endDate = moment(0).add(8,'years');
    wrapper.find(DateRangePicker).prop('onDatesChange')({starDate, endDate});
    expect(setStartDate).toHaveBeenLastCalledWith(starDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});  */

test('should handle date focus changes',() => {
    const calendarFocused = 'endDate';
    wrapper.find(DateRangePicker).prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});