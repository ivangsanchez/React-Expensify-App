import {createStore} from 'redux';

//////////////////////////////////////////////////////
////////////////// Actions Generations ////////////////

const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy
});

const decrementCount = ({ decrementBy = 1} = {}) => ({
    type:'DECREMENT',
    decrementBy
});

const setCount = ({count}) => ({
    type:'SET',
    count
})

const resetCount = () => ({
    type:'RESET'
})

//////////////////////////////////////////////////////////////////
///////////////// Reducers //////////////////////////////////////
//1. Reducers are Pure Functions
//2. Never change state or action

let a= 10;
const add = (b) => {
    return a+b;
}

const countReducer = (state = {count: 0}, action) => {
    switch(action.type){    
        case'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case'DECREMENT':
            return {
                count: state.count - action.decrementBy 
            }
        case 'SET':
            return {
                count: action.count
            }
        case 'RESET':
            return {
                count: 0
            }
        default:
            return state;
    }
};

const store = createStore(countReducer);



const unsubscribe = store.subscribe(()=> {
    console.log(store.getState());
})

//Action- than an object that gets sent to the store (Example: increment, decrement, reset)

//Increment the count by 5
store.dispatch(incrementCount({ incrementBy: 5 }));

//Increment the count 
store.dispatch(incrementCount());

//Reset the count to zero
store.dispatch(resetCount());

//Decrement the count
store.dispatch(decrementCount());

//Decrement the count by 10
store.dispatch(decrementCount({decrementBy: 10}));

store.dispatch(setCount({count: 100}));


