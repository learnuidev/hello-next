import { removeNull } from "@/lib/utils";
import { awsConfig } from "@/libs/aws/aws.config";
import { detectLanguage } from "@/libs/openai/detect-language";
import { listGrammarAnaysis } from "@/libs/openai/list-grammar-analysis";
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

// import { DocumentClient } from "aws-sdk/clients/dynamodb";

const chance = new Chance();

export const maxDuration = 120;

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const {
    sentenceId,
    content,
    userId,
    fetchCache = true,
    lang = null,
  } = await req.json();

  // top values

  // check language
  let language;

  if (lang) {
    language = lang;
  } else {
    language = await detectLanguage(sentenceId || content);
  }

  try {
    // 1. Check if the cache contains the analysis
    const params = {
      ExpressionAttributeValues: {
        ":sentenceId": sentenceId || content,
      },
      KeyConditionExpression: "sentenceId = :sentenceId",
      IndexName: "bySentenceId",
      TableName: awsConfig.tables.grammarTable,
    };

    const resp = await dynamodb.query(params).promise();
    const grammarAnalysis = resp?.Items?.[0];

    // 2. If found, then return the analysis
    if (grammarAnalysis && fetchCache) {
      //   const response = {
      //     statusCode: 200,
      //     body: JSON.stringify(grammarAnalysis),
      //   };
      // params
      return Response.json(grammarAnalysis);
    } else {
      // 3. Else perform grammar analysis
      const _grammarAnalysis = await listGrammarAnaysis({ content, language });

      if (_grammarAnalysis?.length === 0) {
        throw new Error("No Grammar found");
      }

      const id = chance.guid();
      const createdAt = Date.now();
      const params = removeNull({
        id,
        creator: userId || "unknown",
        sentenceId: sentenceId || content,
        createdAt,
        grammarAnalysis: _grammarAnalysis,
      });

      const inputParams = {
        Item: params,
        TableName: awsConfig.tables.grammarTable,
      };

      await dynamodb.put(inputParams).promise();

      return Response.json(params);

      //   return response;
    }
  } catch (err) {
    console.log("ERROR", err);
    // const response = {
    //   statusCode: 400,
    //   body: JSON.stringify({
    //     message: err.message,
    //   }),
    // };
    // return response;
  }

  // // 1. Download video

  // return subtitles;
}
