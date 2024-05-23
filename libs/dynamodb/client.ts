import { awsConfig } from "@/libs/aws/aws.config";
import AWS from "aws-sdk";

export const maxDuration = 60;

AWS.config.update({
  region: "us-west-1",
  accessKeyId: awsConfig.accessKeyId,
  secretAccessKey: awsConfig.secretKey,
});

export const dynamodb = new AWS.DynamoDB({
  apiVersion: "2012-08-10",
  region: "us-east-1",
});
