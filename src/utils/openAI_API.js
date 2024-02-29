import axios from "axios";

// const API_KEY = process.env.OPEN_AI_API_KEY;

const generateTextFromAI = async (userQuestion, fortuneResult) => {
  const APIBody = {
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

  try {
    const res = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      APIBody,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.OPEN_AI_API_KEY,
        },
      }
    );
    const generatedText = res.data.choices[0].message.content;
    console.log(generatedText);
    return generatedText;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return "Failed to generate text.";
  }
};

export default generateTextFromAI;
