// cmd/ai.js
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: process.env.OPENAI_KEY
});
const openai = new OpenAIApi(config);

module.exports = {
  name: "ai",
  description: "Jibu kwa akili ya bandia (OpenAI)",
  async execute(sock, msg, args) {
    const sender = msg.key.remoteJid;
    const prompt = args.join(" ");

    if (!prompt) {
      await sock.sendMessage(sender, { text: "❗ Tafadhali andika swali au maombi baada ya !ai" });
      return;
    }

    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      });

      const reply = response.data.choices[0].message.content;
      await sock.sendMessage(sender, { text: reply });
    } catch (err) {
      console.error("OpenAI Error:", err);
      await sock.sendMessage(sender, { text: "⚠️ Samahani, AI haikuweza kujibu kwa sasa." });
    }
  }
};
