import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { awsConfig } from "../aws/aws.config";

export const dynamodbClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: awsConfig.accessKeyId,
      secretAccessKey: awsConfig.secretKey,
    },
  })
);
