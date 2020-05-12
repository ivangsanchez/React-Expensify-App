import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database= firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };

/* //child_removed
database.ref('expenses').on('child_removed',(snapshot)=>{
    console.log(snapshot.key, snapshot.val());
});

//child_changed
database.ref('expenses').on('child_changed',(snapshot)=>{
    console.log(snapshot.key, snapshot.val());
});

//child_added
database.ref('expenses').on('child_added',(snapshot)=>{
    console.log(snapshot.key, snapshot.val());
}); */

//Optain array only one time
/* database.ref('expenses')
  .once('value')
  .then((snapshot)=>{
      const expenses = [];

      snapshot.forEach((childSnapshot)=> {
          expenses.push({
              id: childSnapshot.key,
              ...childSnapshot.val()
          });
      });

      console.log(expenses);
  }); */
/* 
//Refresh tha array on every change on Database
  database.ref('expenses').on('value',(snapshot) => {
    const expenses = [];

    snapshot.forEach((childSnapshot)=> {
        expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
        });
    });

    console.log(expenses);
  });
 */
/* database.ref('expenses').push({
    description: 'Coffe',
    note:'cosa 1, cosa 2, cosa 3',
    amount: 233,
    createdAt: 1000
}); */



//Save ARRAYS in firebase
/* 
database.ref('notes').push({
    title: 'curses',
    body:'cosa 1, cosa 2, cosa 3'
}); */


//Get values from database in realtime reload
/* database.ref().on('value', (snapshot)=>{
    const val = snapshot.val();
    console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`);
})
 */
//Get values from database in realtime reload
/* const onValueChange = database.ref().on('value', (snapshot) => {
    console.log(snapshot.val());
}, (e) => {
    console.log('Error with data fetching',e);
});
 */

//Get values from database ONES
/* database.ref('location')
    .once('value')
    .then((snapshot)=>{
        const val= snapshot.val();
        console.log(val);
    }).catch((e) => {
        console.log('This failed.',e);
    });
 */

 //Write information on database
/* database.ref().set({
    name: 'Ivan Sanchez',
    age:23,
    stressLevel: 6,
    job: {
        title:'Barrendero',
        company: 'Google'
    },
    location: {
        city: 'GDL',
        country: 'Mexico'
    }
}).then(() => {
    console.log('Data is saved!');
}).catch((e) => {
    console.log('This failed.',e);
});
 
//Update Values
database.ref().update({
    stressLevel:9,
    'job/company': 'Amazon',
    'location/city': 'Seattle'
}); */


/*  
    //Other way tu remove is set null on SET value
     database.ref('isSingle').set(null);

    //Remove from data base
    database.ref('isSingle')
    .remove()
    .then(() =>{
        console.log('Data is REMOVE!');
    }).catch((e) =>{
        console.log('REMOVE FAIL.',e);
    }); 
    
*/