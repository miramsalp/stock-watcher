const client = require('../config/lineClient'); 

exports.sendPushMessage = async (userId, message) => {
    try {
        await client.pushMessage(userId, message); 
        console.log(`Sent message to ${userId}`);
    } catch (error) {
        console.error('Line Error:', error.originalError?.response?.data || error.message);
    }
};