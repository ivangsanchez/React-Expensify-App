import React from 'react';
import ExpenseList from './ExpenseList';
import ExponseListFilters from './ExpenseListFilters';

const ExpenseDashboardPage = () => (
    <div>
        <ExponseListFilters/>
        <ExpenseList/>
    </div>
);

export default ExpenseDashboardPage;