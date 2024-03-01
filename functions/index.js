const { onCall } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
// 設置 OpenAI API key 為環境變數
const apiKey = defineSecret(process.env.OPEN_AI_API_KEY);

exports.generateTextFromAI = onCall(async (request, response) => {
  const { userQuestion, fortuneResult } = request;

  if (!apiKey) {
    console.log("invalid-arg", "API Error");
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

  response = await axios.post(url, body, { headers });

  if (response.status === 200) {
    response.send({ response: response.data.choices[0].message.content });
  } else {
    console.log("internal", "Request failed.");
  }
});
// 定義 Cloud Function
// exports.generateTextFromAI = functions.https.onCall(async (data) => {
//   try {
//     const { userQuestion, fortuneResult } = data;

//     if (!conversation || !apiKey) {
//       throw new functions.https.HttpsError("invalid-arg", "API Error");
//     }

//     const url = "https://api.openai.com/v1/chat/completions";

//     const headers = {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${apiKey}`,
//     };

//     const body = {
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           role: "system",
//           content: `User Question: ${userQuestion}\nFortune Result: ${fortuneResult}`,
//         },
//       ],
//       temperature: 0.7,
//       max_tokens: 60,
//     };

//     const response = await axios.post(url, body, { headers });

//     if (response.status === 200) {
//       return { response: response.data.choices[0].message.content };
//     } else {
//       throw new functions.https.HttpsError("internal", "Request failed.");
//     }
//   } catch (error) {
//     throw new functions.https.HttpsError("internal", error.message);
//   }
// });
