const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const cors = require('cors')({ origin: true });
admin.initializeApp();

const apiKey = functions.config().openai.apikey;

exports.generateTextFromAI = functions.https.onRequest((req, res) => {
	cors(req, res, async () => {
		try {
			const { userQuestion, fortuneResult } = req.body;

			if (apiKey === undefined) {
				throw new functions.https.HttpsError('invalid-arg', 'API Error');
			}
			const url = 'https://api.openai.com/v1/chat/completions';
			const headers = {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${apiKey}`,
			};

			const { guaCi, bianYao } = fortuneResult;
			const body = {
				model: 'gpt-3.5-turbo',
				messages: [
					{
						role: 'system',
						content: 'You are a helpful assistant.',
					},
					{
						role: 'user',
						content: userQuestion,
					},
					{
						role: 'assistant',
						content: `Based on the fortune result: ${guaCi} and ${bianYao}, here is my suggestion:`,
					},
				],
				temperature: 0.6,
				max_tokens: 256,
			};
			const response = await axios.post(url, body, {
				headers,
				maxRedirects: 0,
			});
			if (response.status === 200) {
				res.send({ response: response.data.choices[0]?.message.content || '' });
			} else {
				throw new functions.https.HttpsError('internal', 'Request failed.');
			}
		} catch (error) {
			throw new functions.https.HttpsError('internal', error.message);
		}
	});
});
