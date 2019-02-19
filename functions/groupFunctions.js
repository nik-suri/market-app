const functions = require('firebase-functions');
const admin = require('firebase-admin');

const db = admin.firestore();

// create group with a creator, participants, title, etc
exports.createGroup = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;
  const title = data.title;
  const participants = data.participants;

  // create group document
  const groupRef = db.collection('groups').doc().set({
    creator: uid,
    title: title,
    participants: participants
  });

  // add group ID to groups array for every participant
  // batch write to db
  const groupId = groupRef.id;
  const allParticipants = participants.push(uid);
  const batch = db.batch();
  const usersRef = db.collection('users');
  for (let uid in allParticipants) {
    userRef = usersRef.doc(uid);
    batch.update(userRef, {
      groups: admin.firestore.FieldValue.arrayUnion(groupId)
    });
  }
  batch.commit()
    .then(() => console.log("Batch write succeeded"))
    .catch(err => console.log("Error batch writing documents", err));

  return groupRef;
});

// get all groups for a specific user
exports.getGroups = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;
  const groupsRef = db.collection('groups');
  return db.collection('groups')
    .where('creator', '==', uid)
    .where('participants', 'array-contains', uid)
    .then(snapshot => snapshot);
});
