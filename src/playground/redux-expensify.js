import {createStore, combineReducers} from 'redux';
import { v1 as uuid4} from 'uuid';


/////////////////////AD_ EXPENSE /////////////
const addExpense = ({ descriptions='',note='',amount=0, createdAt=0 } = {}) => ({
    type:'ADD_EXPENSE',
    expense: {
        id: uuid4(),
        descriptions,
        note,
        amount,
        createdAt
    }
})

/////////////////////REMOVE_EXPENSE //////////////////////////////
const removeExpense =({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})

//////////////////EDIT_EXPENSE //////////////////
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

////////////////SETTEXTFILTER/////////////////////////////
const setTextFilter = (text = '') =>({
    type:'SET_TEXT_FILTER',
    text
});

//////////////SORT BY AMOUNT//////////////////

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})
//////////////SORT BY DATE//////////////////
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})

//////////////////// SET_START DATE ////////////
const setStartDate = (startDate = undefined) => ({
    type: 'SET_START_DATE',
    startDate
})

//////////////////// SET_END DATE ////////////
const setEndDate = (endDate = undefined) => ({
    type: 'SET_END_DATE',
    endDate
})

////////////////// Expenses Reducer ///////////////////
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => {
                return id !== action.id;
            });
        case 'EDIT_EXPENSE':
            return  state.map((expense) => {
                if(expense.id === action.id){
                    return {
                        ...expense,
                        ...action.updates
                    }
                }else{
                    return expense
                }
            });
        default:
            return state;
    }
};

///////////////////////Filters Reducer //////////////////
const filtersReducerDefaultState = {
    text:'',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined

}
const filtersReducer = (state = filtersReducerDefaultState, action) =>{
    switch(action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate:action.startDate
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate:action.endDate
            };
        default:
            return state;
    }
}

/////////////////////Filtering Expenses ///////////////////
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.descriptions.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch
    }).sort((a, b)=>{
        if(sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1;
        }else if(sortBy === 'amount'){
           return a.amount < b.amount ? 1: -1; 
        }
    });
};


//////////////////////Create Store ///////////////////////
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
    
);


////////////Monitoring the changes in the states of store ///////////////
store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)

    console.log(visibleExpenses);
});


/////////////////// Modify values on the store ////////////
const expenseOne = store.dispatch(addExpense({descriptions: 'Rent', amount: 400, createdAt:1000}));
const expenseTwo = store.dispatch(addExpense({descriptions: 'Coffe', amount: 300, createdAt:-1000}));

//store.dispatch(setTextFilter('coffe'));
//store.dispatch(setTextFilter('rent'));
/* 
store.dispatch(removeExpense({ id: expenseOne.expense.id}));
store.dispatch(editExpense(expenseTwo.expense.id,{ amount:677 }));

store.dispatch(setTextFilter());
store.dispatch(sortByAmount());
store.dispatch(sortByDate());
store.dispatch(setStartDate(125));
store.dispatch(setStartDate(125));
store.dispatch(setEndDate(234));

 */


//////////////////// Data ////////////////////
const demoState = {
    expenses: [{
        id: 'pollito',
        descriptions: 'Muy bonito',
        note: 'Esta recein nacido! Oferta!',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
};
