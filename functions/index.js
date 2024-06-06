const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");
const cors = require("cors")({ origin: true });
admin.initializeApp();

const apiKey = functions.config().openai.apikey;

exports.generateTextFromAI = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { userQuestion, fortuneResult, userLang } = req.body;

      if (apiKey === undefined) {
        throw new functions.https.HttpsError("invalid-arg", "API Error");
      }

      let systemMessage = "You are a helpful assistant.";
      let guaMessage = `Based on the divination result ${fortuneResult.guaCi} and ${fortuneResult.bianYao}:`;

      if (userLang === "zh") {
        // 中文
        systemMessage = "你是一個樂於助人的助手。";
        guaMessage = `根據占卜結果 ${fortuneResult.guaCi} 和 ${fortuneResult.bianYao}：`;
      }

      const url = "https://api.openai.com/v1/chat/completions";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      };

      const body = {
        model: "gpt-4-turbo",
        messages: [
          {
            role: "system",
            content: systemMessage,
          },
          {
            role: "user",
            content: userQuestion,
          },
          {
            role: "assistant",
            content: guaMessage,
          },
        ],
        temperature: 0.9,
        max_tokens: 256,
        top_p: 0.9, // 調整top_p
        frequency_penalty: 0, // 調整frequency_penalty
        presence_penalty: 0, // 調整presence_penalty
      };
      const response = await axios.post(url, body, {
        headers,
        maxRedirects: 0,
      });
      if (response.status === 200) {
        res.send({ response: response.data.choices[0]?.message.content || "" });
      } else {
        throw new functions.https.HttpsError("internal", "Request failed.");
      }
    } catch (error) {
      throw new functions.https.HttpsError("internal", error.message);
    }
  });
});
