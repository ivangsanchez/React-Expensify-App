

//////////////////////////////////////////////////////////
//////// Object Destructurig ////////////////////

/* const person = {
    name: 'Andres',
    age: 27,
    location: {
        city: 'Mexico',
        temp: 99
    }
};

const {name = 'Anonymous', age} = person;
console.log(`${name} is ${age}`);


const {city, temp: temperature} = person.location;
if(temperature && city ){
console.log(`Its ${temperature} in ${city}`)
} */

/* const book = {
    title: 'Ego is the enemy',
    author: 'Ryan Holiday',
    publisher:{
        name: 'Penguin'
    }
};

const {name: publisherName = 'Self-Published'} = book.publisher;

console.log(publisherName) */


///////////////////////////////////////////////////////////////////
////////////// Array Destructuring /////////

const address = ['1299 jupiner street', 'Philadelphia', 'Pennsulandia', '19146'];

const [street, city, state, zip] = address;
console.log(`You are in ${city} ${zip}`);

const item = ['Coffe (hot)','$2.00','$2.50','$2.75']

const [Coffe, ,price] = item;
console.log(`A medium ${Coffe} cost ${price}`);