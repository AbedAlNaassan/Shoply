/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

export const notifyNewProduct = functions.https.onRequest(async (req, res) => {
  try {
    const snapshot = await admin.firestore().collection('fcmTokens').get();

    const tokens: string[] = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.token) {
        tokens.push(data.token);
      }
    });

    if (tokens.length === 0) {
      res.status(200).send('No tokens to send notifications to.');
      return;
    }

    // Send to only the first token
    const token = tokens[0];

    const message = {
      notification: {
        title: 'New Product Added!',
        body: 'Check out the latest item now!',
      },
      android: {
        notification: {
          sound: 'default',
        },
      },
      apns: {
        payload: {
          aps: {
            sound: 'default',
          },
        },
      },
      token: token,
    };

    console.log('Sending to token:', token);
    await admin.messaging().send(message);

    console.log(`Notification sent successfully to token: ${token}`);
    res.status(200).send('Notification sent!');
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).send('Error sending notification');
  }
});
