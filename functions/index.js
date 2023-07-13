/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const cors = require("cors")({origin: true});

exports.helloWorld = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    response.send("Hello from Firebase!");
  });
});


const admin = require("firebase-admin");
admin.initializeApp();

exports.addData = functions.https.onRequest(async (req, res) => {
  cors(req, res, async() => {
    // データベースへの参照を取得
    const db = admin.firestore();

    // クエリパラメータから値を取得
    const itemName = req.query.item_name;
    const description = req.query.description;

    // データを登録
    const docRef = db.collection("items").doc();

    await docRef.set({
      id: docRef.id,
      item_name: itemName,
      description: description,
    });

    res.send("Data added successfully");
  });
});

exports.addDNBResult=functions.https.onRequest((req, res) => {
  try {
    cors(req, res, async() => {
      // データベースへの参照を取得
      const db = admin.firestore();

      // クエリパラメータから値を取得
      const result = req.query.result;
      const gametype=req.query.gametype;
      const gameiteration=req.query.gameiteration;
      const gamenback=req.query.gamenback;

      // データを登録
      const docRef = db.collection("DNBResult").doc();
      await docRef.set({
        id: docRef.id,
        result: result,
        gametype: gametype,
        gameiteration: gameiteration,
        gamenback: gamenback,
      });

      res.send("Result added successfully");
    });
  } catch (error) {
    console.error("Error adding document: ", error);
    res.status(500).send(error);
  }
});
