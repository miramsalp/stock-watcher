const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const client = new line.Client(config);

exports.sendPushMessage = async (userId, text) => {
    try {
        await client.pushMessage(userId, { type: 'text', text: text });
        console.log(`Sent message to ${userId}`);
    } catch (error) {
        console.error('Line Error:', error.originalError?.response?.data || error.message);
    }
};