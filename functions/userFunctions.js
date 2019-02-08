const functions = require('firebase-functions');
const admin = require('firebase-admin');

const db = admin.firestore();

// Add new user to database
exports.newUser = functions.auth.user().onCreate(user => {
  const userData = JSON.parse(JSON.stringify(user));
  console.log(userData);
  return db.collection('users').doc(user.uid).set(userData);
});

// Add User Notification Token
exports.addRegistrationToken = functions.https.onCall((data, context) => {
  const token = data.token;
  const uid = context.auth.uid;
  //db.collection('users').doc(uid).update({
  //});
});

// Save Device ID
exports.userLogin = functions.https.onCall((data, context) => {
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
