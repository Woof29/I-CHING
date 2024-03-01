/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });

  response.send("Hello from Firebase!");
});

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
admin.initializeApp();

// 設置 OpenAI API key 為環境變數
const apiKey = functions.config().openai.apikey;

// 定義 Cloud Function
exports.generateTextFromAI = functions.https.onCall(async (data) => {
  try {
    const { userQuestion, fortuneResult } = data;

    if (!conversation || !apiKey) {
      throw new functions.https.HttpsError("invalid-arg", "API Error");
    }

    const url = "https://api.openai.com/v1/chat/completions";

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };

    const body = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `User Question: ${userQuestion}\nFortune Result: ${fortuneResult}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 60,
    };

    const response = await axios.post(url, body, { headers });

    if (response.status === 200) {
      return { response: response.data.choices[0].message.content };
    } else {
      throw new functions.https.HttpsError("internal", "Request failed.");
    }
  } catch (error) {
    throw new functions.https.HttpsError("internal", error.message);
  }
});

// 導出 Cloud Function
// exports.generateText = functions.https.onCall(async (data, context) => {
//   const { userQuestion, fortuneResult } = data;
//   const result = await generateTextFromAI(userQuestion, fortuneResult);
//   return { result };
// });
