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
// const cors = require("cors")({origin: true});
// const cors = require("cors")({origin: "https://dual-n-back-ashen.vercel.app/"});
const admin = require("firebase-admin");
admin.initializeApp();

const cors = require("cors");
const corsOptions = {
  origin: ["https://dual-n-back-ashen.vercel.app", "http://localhost:3000", "https://us-central1-test1-7f2c4.cloudfunctions.net"],
  optionsSuccessStatus: 200,
};
const corsMiddleware = cors(corsOptions);

exports.helloWorld = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    response.send("Hello from Firebase!");
  });
});

exports.addData = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
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
  const countZeroesAndOnes=(str)=>{
    let zeroCount = 0;
    let oneCount = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "0") {
        zeroCount++;
      } else if (str[i] === "1") {
        oneCount++;
      }
    }
    return (oneCount/(zeroCount+oneCount));
  };
  corsMiddleware(req, res, async () => {
    // データベースへの参照を取得
    const db = admin.firestore();

    // クエリパラメータから値を取得
    const result = req.query.result;
    const gametype=req.query.gametype;
    const gameiteration=req.query.gameiteration;
    const gamenback=req.query.gamenback;
    const date=req.query.date;

    const correctRate=countZeroesAndOnes(result);

    // データを登録
    const docRef = db.collection("DNBResult").doc();
    await docRef.set({
      id: docRef.id,
      result: result,
      gametype: gametype,
      gameiteration: gameiteration,
      gamenback: gamenback,
      correctRate: correctRate,
      date: date,
    });

    res.send("Result added successfully");
  });
});
