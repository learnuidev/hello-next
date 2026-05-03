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

  const response = await dynamodbClient.send(command);

  const contentPurchase = response?.Item;

  return contentPurchase;
};
