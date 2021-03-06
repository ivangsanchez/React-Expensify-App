import { v1 as uuid4} from 'uuid';
import database from '../firebase/firebase';
import expenses from '../tests/fixtures/expenses';

/////////////////////AD_ EXPENSE /////////////
export const addExpense = (expense) => ({
    type:'ADD_EXPENSE',
    expense
});

////////////////// START_ADD_EXPENSES ////////////////
///////FROM FIREBASE
export const startAddExpense = (expenseData = {}) => {
    return (dispatch,getState) => {
        const uid = getState().auth.uid;
        const {
            descriptions='',
            note='',
            amount=0,
            createdAt=0
        } = expenseData;
        const expense = {descriptions, note, amount,createdAt};

       return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
            dispatch(addExpense({
                id:ref.key,
                ...expense
            }));
        });
    };
};

/////////////////////REMOVE_EXPENSE //////////////////////////////
 export const removeExpense =({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

////////////////// START_REMOVE_EXPENSES ////////////////
///////FROM FIREBASE
export const startRemoveExpense = ({ id } = {}) => {
    return (dispatch,getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
            dispatch(removeExpense({id}));
        });
    };
};

//////////////////EDIT_EXPENSE //////////////////
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

////////////////// START_EDIT_EXPENSES ////////////////
///////FROM FIREBASE
export const startEditExpense = (id, updates) => {
    return (dispatch,getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
            dispatch(editExpense(id, updates));
        });
    };
};

////////////////// SET_EXPENSES ////////////////
export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

////////////////// START_SET_EXPENSES ////////////////
///////FROM FIREBASE
export const startSetExpenses = () => {
    return (dispatch,getState) =>{
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
            const expenses = [];

            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

            dispatch(setExpenses(expenses));
        });
    };
};
