import { awsConfig } from "@/libs/aws/aws.config";
import { dynamodbClient } from "@/libs/dynamodb/dynamodb-client";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

export const listUserPlansApi = async (userId: string) => {
  const command = new QueryCommand({
    TableName: awsConfig.tables.plansTable,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": userId,
    },
    IndexName: "byUserId",
  });

  const response = await dynamodbClient.send(command);

  return response?.Items;
};
