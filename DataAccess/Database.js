const {
  DynamoDBClient,
  UpdateItemCommand,
} = require("@aws-sdk/client-dynamodb");
const {
  PutCommand,
  ScanCommand,
  DeleteCommand,
  DynamoDBDocumentClient,
} = require("@aws-sdk/lib-dynamodb");
require("dotenv").config();

// Create a new DynamoDB client
const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const client = DynamoDBDocumentClient.from(dynamoClient);

// CREATE
const addToDatabase = async (table, data) => {
  console.log("database.js -> addToDatabase() -> TableName: ", table);

  try {
    const params = {
      TableName: table,
      Item: data,
    };

    const result = await dynamoClient.send(new PutCommand(params));
    return result;
  } catch (error) {
    console.error("Database.js, ERROR ADDING DATA:", error);
    throw error;
  }
};
// READ
const getFromDatabase = async (table, attribute = null, value = null) => {
  try {
    const params = {
      TableName: table,
    };

    if (attribute && value) {
      params.FilterExpression = `${attribute} = :value`;
      // params.FilterExpression = attribute + " = :value";
      params.ExpressionAttributeValues = {
        ":value": value,
      };
    }

    const result = await dynamoClient.send(new ScanCommand(params));
    return result;
  } catch (error) {
    console.error("Database.js, ERROR GETTING DATA:", error);
    throw error;
  }
};
// UPDATE
const updateItemInDatabase = async (
  tableName,
  key,
  updateExpression,
  expressionAttributeValues
) => {
  try {
    const params = {
      TableName: tableName,
      Key: key,
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
    };
    console.log(params);
    const result = await client.send(new UpdateItemCommand(params));
    console.log("Database.js, SUCCESSFULLY UPDATED: ", result);
  } catch (error) {
    console.error("Database.js, ERROR UPDATING ITEM: ", error);
    throw error;
  }
};
// DELETE
const deleteFromDatabase = async (table, key) => {
  try {
    const params = {
      TableName: table,
      Key: key,
    };

    const result = await dynamoClient.send(new DeleteCommand(params));
    console.log("Database.js, ITEM DELETED.");
    return result;
  } catch (error) {
    console.error("Database.js, ERROR DELETING ITEM: ", error);
    throw error;
  }
};

// NEED TO REMAKE THIS FUNCTION
const TEMPgenerateID = async (minID, maxID) => {
  min = Math.ceil(minID); // Round up to the nearest integer
  max = Math.floor(maxID); // Round down to the nearest integer
  return Math.floor(Math.random() * (max - min + 1)) + min; // Generate the random ID
};

module.exports = {
  addToDatabase: addToDatabase,
  getFromDatabase: getFromDatabase,
  deleteFromDatabase: deleteFromDatabase,
  updateItemInDatabase: updateItemInDatabase,
  // getNewestID: getNewestID,
  // generateID: generateID,
  TEMPgenerateID: TEMPgenerateID,
};
