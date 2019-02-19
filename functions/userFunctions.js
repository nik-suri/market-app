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

  console.log(deviceID, deviceOS, uid, date);
  return db.collection('userNotificationIDs').doc(uid).set({
    [deviceID]: {
      OS: deviceOS,
      date: date
    }
  }, {merge: true})
    .then(() => console.log("Notification ID write succeeded"));
});

// remove device ID on logout
exports.userLogout = functions.https.onCall((data, context) => {
  const deviceID = data.deviceID;
  const uid = context.auth.uid;

  var userNotifIDs = db.collection('userNotificationIDs').doc(uid);
  return userNotifIDs.update({
    [deviceID]: admin.firestore.FieldValue.delete()
  }).then(() => console.log("Notification ID delete succeeded"));
});
