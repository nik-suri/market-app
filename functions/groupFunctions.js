const functions = require('firebase-functions');
const admin = require('firebase-admin');

const db = admin.firestore();

// create group with a creator, participants, title, etc
exports.createGroup = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;
  const title = data.title;
  const participants = data.participants;
  const ref = db.collection('groups').doc().set({
    creator: uid,
    title: title,
    participants: participants
  });

  const groupId = ref.id;
  const usersRef = db.collection('users');
  const allParticipants = participants.push(uid);
  for (let uid in allParticipants) {
    usersRef.doc(uid).update({
      groups: admin.firestore.FieldValue.arrayUnion(groupId)
    });
  }
});

// get group info
//exports.getGroupInfo = functions.https.onCall((data, context) => {

//});
