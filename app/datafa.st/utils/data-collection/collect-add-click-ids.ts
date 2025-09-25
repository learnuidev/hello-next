import { AdClickIds } from "../../datafast.types";

export const collectAdClickIds = (url: URL): AdClickIds => {
  const clickIdParams = {
    fbclid: url.searchParams.get("fbclid"),
    gclid: url.searchParams.get("gclid"),
    gclsrc: url.searchParams.get("gclsrc"),
    wbraid: url.searchParams.get("wbraid"),
    gbraid: url.searchParams.get("gbraid"),
    li_fat_id: url.searchParams.get("li_fat_id"),
    msclkid: url.searchParams.get("msclkid"),
    ttclid: url.searchParams.get("ttclid"),
    twclid: url.searchParams.get("twclid"),
  };

  return Object.entries(clickIdParams)
    .filter(([_, value]) => value)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
};
