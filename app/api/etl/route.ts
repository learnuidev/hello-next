import { awsConfig } from "@/libs/aws/aws.config";

import AWS from "aws-sdk";
import Chance from "chance";

AWS.config.update({
  region: "us-west-1",
  accessKeyId: awsConfig.accessKeyId,
  secretAccessKey: awsConfig.secretKey,
});

const dynamodb = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
  region: "us-east-1",
});

export const maxDuration = 60;

export async function POST(req: Request) {
  const {
    sentenceId,
    content,
    userId,
    fetchCache = true,
    lang = null,
  } = await req.json();

  const dataSchema = {
    meaning: {
      source: {
        tableName: "meanings-table",
        key: "meanings",
      },
    },

    input: {
      index: true,
      join: ["table-a", "hanzi"],
      source: {
        tableName: "table-a",
        keys: ["hanzi", "input"],
      },
    },
    roman: {
      source: {
        tableName: "table-a",
        keys: ["pinyin", "roman"],
      },
    },
    en: {
      source: {
        tableName: "table-a",
        key: "en",
      },
    },
  };

  const reqParams = {
    schema: dataSchema,
  };

  return Response.json({
    message: "TODO",
  });
}
