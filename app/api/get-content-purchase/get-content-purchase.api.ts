import { awsConfig } from "@/libs/aws/aws.config";
import { dynamodbClient } from "@/libs/dynamodb/dynamodb-client";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

export const getContentPurchase = async (
  userEmail: string,
  contentId: string,
) => {
  const id = `${userEmail}_${contentId}`;
  const command = new GetCommand({
    TableName: awsConfig.tables.contentPurchasesTable,
    Key: {
      id,
    },
  });

  console.log("COMMAND", command);

  console.log("AWS CONFIG", awsConfig.tables);

  const response = await dynamodbClient.send(command);

  console.log("RESPONSE", response);

  return response?.Item;
};
