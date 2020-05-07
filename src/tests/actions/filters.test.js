import moment from 'moment';
import { setStartDate, setEndDate, sortByAmount, sortByDate, setTextFilter } from '../../actions/filters';

test('START date action object',() =>{
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    });
});

test('END date action object',() =>{
    const action =setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE' ,
        endDate: moment(0)
    });
});

test(' sort by amount', () => {
    const action = sortByAmount();
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    })
});

test(' sort by Date', () => {
    const action = sortByDate();
    expect(action).toEqual({
        type: 'SORT_BY_DATE'
    })
});

test(' set text filter', () => {
    const action = setTextFilter('Hola');
    expect(action).toEqual({
        type:'SET_TEXT_FILTER',
        text:'Hola'
    })
});

test(' set text filter without Values', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type:'SET_TEXT_FILTER',
        text:''
    })
});

