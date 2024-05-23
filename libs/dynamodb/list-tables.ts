import { dynamodb } from "./client";

export const maxDuration = 60;

export async function listTables() {
  const tables = await dynamodb.listTables().promise();
  return tables;
}
