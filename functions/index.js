const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

const userFunctions = require('./userFunctions');

//User Functions
exports.newUser = userFunctions.newUser;
exports.addRegistrationToken = userFunctions.addRegistrationToken;
exports.userLogin = userFunctions.userLogin;
