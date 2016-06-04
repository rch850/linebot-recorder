'use strict';
console.log('Loading function');

let doc = require('dynamodb-doc');
let dynamo = new doc.DynamoDB();

/**
 * Record LINE BOT API Callback Request to DynamoDB.
 *
 * About Callback:
 * https://developers.line.me/bot-api/getting-started-with-bot-api-trial
 */
exports.handler = (event, context, callback) => {
    try {
        console.log('Received event:', JSON.stringify(event, null, 2));
        event.result.forEach((result) => {
            let params = {
                TableName: 'LineBotEvents',
                Item: result,
            };
            dynamo.putItem(params, (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(data);
            });
        });
        callback(null, "OK");
    } catch (err) {
        console.error(err);
        callback(null, "Internal Server Error");
    }
};
