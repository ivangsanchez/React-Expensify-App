import moment from 'moment';

export default [{
    id: '1',
    descriptions: 'Gum',
    note:'',
    amount:1233,
    createdAt:0
},{
    id: '2',
    descriptions: 'Rent',
    note:'',
    amount:76478,
    createdAt:moment(0).subtract(4,'days').valueOf()
},{
    id: '3',
    descriptions: 'Credit card',
    note:'',
    amount:1500,
    createdAt:moment(0).add(4,'days').valueOf()
}];
