import { removeNull } from "@/lib/utils";

export const constructParams = ({ tableName, attributes }: any) => {
  const { id, ...rest } = attributes;
  const filteredStep = removeNull(rest);

  const initParam = {
    TableName: tableName,
    Key: {
      id,
    },
    ExpressionAttributeNames: {},
    UpdateExpression: "",
    ExpressionAttributeValues: {},
    ConditionExpression: "attribute_exists(id)",
  };

  const updatedStepParams = Object.entries(filteredStep).reduce(
    (acc, [key, val]) => {
      return {
        ...acc,
        ExpressionAttributeNames: {
          ...acc.ExpressionAttributeNames,
          [`#${key}`]: key,
        },
        UpdateExpression: acc.UpdateExpression.includes("set")
          ? `${acc.UpdateExpression}, #${key} = :${key}`
          : `set #${key} = :${key}`,
        ExpressionAttributeValues: {
          ...acc.ExpressionAttributeValues,
          [`:${key}`]: val,
        },
      };
    },
    initParam
  );

  return updatedStepParams;
};
