const functions = require('firebase-functions');
const admin = require('firebase-admin');

const db = admin.firestore();

// Add new user to database
exports.newUser = functions.auth.user().onCreate(user => {
  const userData = JSON.parse(JSON.stringify(user));
  userData.groups = [];
  console.log(userData);
  return db.collection('users').doc(user.uid).set(userData);
});

// Save Device ID
exports.userLogin = functions.https.onCall((data, context) => {
  const deviceID = data.deviceID;
  const deviceOS = data.deviceOS;
  const uid = context.auth.uid;
  const date = (new Date()).toISOString();

  db.collection('userNotifcationIDs').doc(uid).update({
    deviceID: {
      "OS": deviceOS,
      "date": date
    }
  })
});
