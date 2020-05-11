import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    startAddExpense, 
    addExpense, 
    editExpense, 
    startEditExpense,
    removeExpense, 
    setExpenses, 
    startSetExpenses, 
    startRemoveExpense,
 } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

//Create a fake store to test
const createMockStore = configureMockStore([thunk])

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({id,descriptions, note,amount,createdAt}) => {
        expensesData[id] = { descriptions, note, amount, createdAt };
    })
    database.ref('expenses').set(expensesData).then(() => done()); 
});


////REDUX TEST REMOVE_EXPENSES
test ('Should setup remove expense action object', () => {
    const action = removeExpense({id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

////////////////// START_REMOVE_EXPENSES ////////////////
///////FROM FIREBASE
test ('should remove expense from firebase', (done) => {
    const store = createMockStore({});
    const id = expenses[2].id;
    store.dispatch(startRemoveExpense({id})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        return database.ref(`expenses/${id}`).once('value');
    }).then((snapshot)=>{
        expect(snapshot.val()).toBeFalsy();
        done();
    });
});

//////REDUX TEST EDIT_EXPENSES
test ('Should edit expense action object', () => {
    const action = editExpense('123', {note: 'new note value'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123',
        updates: {
            note: 'new note value'
        }
    });
});

////////////////// START_EDIT_EXPENSES ////////////////
///////FROM FIREBASE
test('should edit expense from firebase', (done) =>{
    const store = createMockStore({});
    const id = expenses[0].id;
    const updates = {amount: 21045};
    store.dispatch(startEditExpense(id,updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
        return database.ref(`expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val().amount).toBe(updates.amount);
        done();
    });
});

/////REDUX TEST ADD_EXPENSES
test('Should setup add expense action object with PROVIDED values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

////////////////// START_ADD_EXPENSES_VALUES ////////////////
///////FROM FIREBASE
test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        descriptions: 'DOG',
        amount: 3000,
        note: 'This is my dog',
        createdAt: 1000
    }
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions= store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(expenseData);
        done(); //wait to jass to asyncronous function
    });
});

////////////////// START_ADD_EXPENSES_DEFAULT ////////////////
///////FROM FIREBASE
test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});
    const expenseDefaults = {
        descriptions: '',
        amount: 0,
        note: '',
        createdAt: 0
    }
    store.dispatch(startAddExpense({})).then(() => {
        const actions= store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefaults
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot)=>{
        expect(snapshot.val()).toEqual(expenseDefaults);
        done(); //wait to jass to asyncronous function
    });
});

/////REDUX TEST SET_EXPENSES
test ('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

////////////////// START_SET_EXPENSES ////////////////
///////FROM FIREBASE
test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore({});
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});