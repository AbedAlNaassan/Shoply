const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.notifyNewProduct = functions.firestore
  .document('product_notifications/{docId}')
  .onCreate(async (snap, context) => {
    const product = snap.data();

    const message = {
      notification: {
        title: 'New Product Added!',
        body: `${product.title} is now available for $${product.price}`,
      },
      topic: 'products',
    };

    try {
      await admin.messaging().send(message);
      console.log('Notification sent successfully!');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  });
