import React from 'react';
import ExpenseList from './ExpenseList';
import ExponseListFilters from './ExpenseListFilters';
import ExpensesSummary from './ExpensesSummary';

const ExpenseDashboardPage = () => (
    <div>
        <ExpensesSummary />
        <ExponseListFilters/>
        <ExpenseList/>
    </div>
);

export default ExpenseDashboardPage;