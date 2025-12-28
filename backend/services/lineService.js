const client = require('../config/lineClient');

exports.sendPushMessage = async (userId, message) => {
    try {
        await client.pushMessage(userId, message);
        console.log(`LINE Sent to: ${userId}`);
    } catch (error) {
        console.error('LINE API Error:', error.originalError?.response?.data || error.message);
    }
};