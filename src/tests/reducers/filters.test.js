import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('setup default filter values', () => {
    const state = filtersReducer(undefined, {type: '@@INIT'});

    expect(state).toEqual({
        text:'',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('set sortBy to AMOUNT', () => {
    const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'})
    expect (state.sortBy).toBe('amount');
});

test('set sortBy to DATE', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };

    const action = {type: 'SORT_BY_DATE'}
    const state = filtersReducer(currentState, action)
    expect(state.sortBy).toBe('date');

});

test('set TEXT FILTER', () => {
    const text = 'Hola Bebe'
    const action = {
        type: 'SET_TEXT_FILTER',
        text
    }
    const state = filtersReducer(undefined, action)
    expect(state.text).toBe(text);
});

test('set StarteDate Filter', () => {
    const startDate = moment();
    const action = {
        type: 'SET_START_DATE',
        startDate
    }
    const state = filtersReducer(undefined, action)
    expect(state.startDate).toEqual(startDate);
});

test('set ENDDate Filter', () => {
    const endDate = moment();
    const action = {
        type: 'SET_END_DATE',
        endDate
    }
    const state = filtersReducer(undefined, action)
    expect(state.endDate).toEqual(endDate);
});





