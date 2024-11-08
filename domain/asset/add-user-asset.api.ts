import { siteConfig } from "@/lib/config";

export type AddUserAssetParams = any;

export const addUserAsset = async (
  params: AddUserAssetParams,
  opts: {
    Authorization: string;
  }
) => {
  const res = await fetch(`${siteConfig.apiUrl}/v1/add-user-asset`, {
    method: "POST",
    headers: {
      Authorization: `${opts?.Authorization}`,
    },
    body: JSON.stringify(params),
  });
  const resp = await res.json();
  return resp;
};
