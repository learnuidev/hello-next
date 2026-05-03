import { awsConfig } from "@/libs/aws/aws.config";
import { dynamodbClient } from "@/libs/dynamodb/dynamodb-client";
import { polarApi } from "@/libs/polar/polar-api";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

export const addUserContentPurchaseApi = async ({
  userEmail,
  orderId,
  contentId,
}: {
  userEmail: string;
  orderId: string;
  contentId: string | number | boolean;
}) => {
  const order = await polarApi.orders.get({ id: orderId });

  if (!order) {
    throw new Error(`Order with ID: ${orderId} not found`);
  }

  const newPlan = {
    userId: userEmail,
    id: `${userEmail}_${contentId}`,
    createdAt: Date.now(),
  };

  const command = new PutCommand({
    TableName: awsConfig.tables.contentPurchasesTable,
    Item: newPlan,
  });

  await dynamodbClient.send(command);

  return newPlan;
};
