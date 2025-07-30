import { awsConfig } from "@/libs/aws/aws.config";
import { dynamodbClient } from "@/libs/dynamodb/dynamodb-client";
import { polarApi } from "@/libs/polar/polar-api";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

export const addUserPlanApi = async ({
  userEmail,
  orderId,
}: {
  userEmail: string;
  orderId: string;
}) => {
  const order = await polarApi.orders.get({ id: orderId });

  if (!order) {
    throw new Error(`Order with ID: ${orderId} not found`);
  }

  const newPlan = {
    userId: userEmail,
    id: orderId,
    createdAt: Date.now(),
    productName: order.product.name,
  };

  const command = new PutCommand({
    TableName: awsConfig.tables.plansTable,
    Item: newPlan,
  });

  await dynamodbClient.send(command);

  return newPlan;
};
