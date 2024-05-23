import { transformItem } from "./utils/transform-item";
import { dynamodb } from "./client";

export const maxDuration = 60;

export async function describeTable({ TableName }: { TableName: string }) {
  const resp = await dynamodb.describeTable({ TableName: TableName }).promise();

  return resp;
}
