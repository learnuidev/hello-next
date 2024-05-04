import { awsConfig } from "@/libs/aws/aws.config";
import AWS from "aws-sdk";

export const maxDuration = 60;
// export const runtime = "edge";

AWS.config.update({
  region: "us-west-1",
  accessKeyId: awsConfig.accessKeyId,
  secretAccessKey: awsConfig.secretKey,
});

const dynamodb = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
  region: "us-east-1",
});

// import { DocumentClient } from "aws-sdk/clients/dynamodb";

const listComponents = async (res = [], key = null): Promise<any> => {
  let resp;

  if (key) {
    resp = await dynamodb
      .scan({
        TableName: awsConfig.tables.componentsTable,
        Limit: 1000,
        ExclusiveStartKey: key,
      })
      ?.promise();
  } else {
    resp = await dynamodb
      .scan({
        TableName: awsConfig.tables.componentsTable,
        Limit: 1000,
      })
      ?.promise();
  }

  if (resp?.LastEvaluatedKey) {
    return listComponents(
      res.concat(resp?.Items as any),
      resp?.LastEvaluatedKey as any
    );
  }

  return res?.concat(resp?.Items as any);
};

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { videoUrl, lang } = await req.json();

  // // 1. Download video
  const resp = await listComponents();

  // return subtitles;

  return Response.json(resp);
}
