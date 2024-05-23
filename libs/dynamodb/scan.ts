import { transformItem } from "./utils/transform-item";
import { dynamodb } from "./client";

export const maxDuration = 60;

export async function scan(
  { TableName }: { TableName: string },
  { transform }: { transform?: boolean }
) {
  const resp = await dynamodb.scan({ TableName: TableName }).promise();

  if (transform) {
    resp.Items = resp.Items?.map(transformItem);

    return resp;
  }

  return resp;
}
