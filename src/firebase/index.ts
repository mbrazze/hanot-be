import * as admin from 'firebase-admin';
// var admin = require('firebase-admin');

var serviceAccount = require('../../admin-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
