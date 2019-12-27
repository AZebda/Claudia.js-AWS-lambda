const ApiBuilder = require('claudia-api-builder'),
    AWS = require('aws-sdk');
var api = new ApiBuilder(),
    dynamoDb = new AWS.DynamoDB.DocumentClient();

api.post('/users', function (request) {
  var params = {  
    TableName: 'users',  
    Item: {
        UserId: request.body.userId,
        name: request.body.name
    } 
  }
  return dynamoDb.put(params).promise();
}, { success: 201 }); // returns HTTP status 201 - Created if successful

api.get('/users', function (request) { // GET all users
  return dynamoDb.scan({ TableName: 'users' }).promise()
      .then(response => response.Items)
});

module.exports = api;