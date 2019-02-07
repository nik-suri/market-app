const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send("Hello from Firebase!");
});

exports.newUser = functions.auth.user().onCreate(user => {
  console.log(user);
  return db.collection('users').doc(user.uid).set(user.toJSON());
});

exports.addRegistrationToken = functions.https.onCall((data, context) => {
  const token = data.token;
  const uid = context.auth.uid;
  //db.collection('users').doc(uid).update({
  //});
});
