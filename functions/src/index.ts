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
    console.log('Notification function called');

    const snapshot = await admin.firestore().collection('fcmTokens').get();

    const tokens: string[] = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      if (data.token) {
        tokens.push(data.token);
      }
    });

    console.log('Number of tokens:', tokens.length);

    if (tokens.length === 0) {
      res.status(200).send('No tokens to send notifications to.');
      return;
    }

    const messagePayload = {
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
    };

    let successCount = 0;
    for (const token of tokens) {
      try {
        await admin.messaging().send({...messagePayload, token});
        console.log(`Notification sent to: ${token}`);
        successCount++;
      } catch (error) {
        console.error(`Failed to send to ${token}`, error);
      }
    }

    res.status(200).send(`Notifications sent to ${successCount} devices.`);
  } catch (error) {
    console.error('Error sending notifications:', error);
    res.status(500).send('Error sending notifications');
  }
});
