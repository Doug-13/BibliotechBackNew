
const path = require('path');
const admin = require('firebase-admin');
const serviceAccount = require(path.join(__dirname, 'serviceAccountKey.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bibliotech-8b662.firebaseio.com"
});

const db = admin.firestore(); // Para Firestore

module.exports = { admin, db };