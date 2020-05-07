import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test ('Should setup remove expense action object', () => {
    const action = removeExpense({id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

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

test('Should setup add expense action object with PROVIDED values', () => {
    const expenseData = {
        descriptions: 'Rent',
        amount: 12323,
        createdAt:1000,
        note: 'This was last months'
    };

    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    })
});

test('Should setup add expense action object with DEFAULT values', () => {
    const expenseData = {
        descriptions: '',
        amount:0,
        createdAt:0,
        note: ''
    };
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    })
});