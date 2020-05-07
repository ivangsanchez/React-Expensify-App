import { v1 as uuid4} from 'uuid';

/////////////////////AD_ EXPENSE /////////////
export const addExpense = ({ descriptions='',note='',amount=0, createdAt=0 } = {}) => ({
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
 export const removeExpense =({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})

//////////////////EDIT_EXPENSE //////////////////
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});