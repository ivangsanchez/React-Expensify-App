import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import {addExpense} from './actions/expenses';
import {setTextFilter} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';

const store = configureStore();

store.dispatch(addExpense({descriptions: 'Water bill',amount:4500}));
store.dispatch(addExpense({descriptions: 'Gas bill',createdAt:1000,amount:45}));
store.dispatch(addExpense({descriptions: 'rent',amount:67600}));


const state = store.getState();
const VisibleExpenses = getVisibleExpenses(state.expenses, state.filters);
//console.log(VisibleExpenses);

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

ReactDOM.render(jsx,document.getElementById('app'))
