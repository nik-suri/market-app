const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

// Add new user to database
exports.newUser = functions.auth.user().onCreate(user => {
  console.log(user);
  return db.collection('users').doc(user.uid).set(user.toJSON());
});

// Add User Notification Token
exports.addRegistrationToken = functions.https.onCall((data, context) => {
  const token = data.token;
  const uid = context.auth.uid;
  //db.collection('users').doc(uid).update({
  //});
});

// Save Device ID
exports.userLogIn = functions.https.onCall((data, context) => {
    const deviceID = data.deviceID;
    const deviceOS = data.deviceOS;
    const date = Date.now()
    const uid = context.auth.uid;
    
    db.collection('userNotifcationIDs').doc(uid).update({
        deviceID: {
            "OS": deviceOS,
            "date": date
        }
    })

});
