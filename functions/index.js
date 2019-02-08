const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);

const userFunctions = require('./userFunctions');

//User Functions
exports.newUser = userFunctions.newUser;
exports.addRegistrationToken = userFunctions.addRegistrationToken;
exports.userLogin = userFunctions.userLogin;
