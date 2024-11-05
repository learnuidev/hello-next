import { useGetNmmParams } from "./use-get-nmm-params";

export const getNmmSearchParamsUrl = ({ tab, level, viewMode }: any) => {
  const urlSearchParams = new URLSearchParams();

  if (tab) {
    urlSearchParams.set("tab", tab);
  }
  if (level) {
    urlSearchParams.set("level", level);
  }
  if (viewMode) {
    urlSearchParams.set("view-mode", viewMode);
  }

  return urlSearchParams.toString();
};

export const useGetNmmUrl = () => {
  const { tab, level } = useGetNmmParams();

  return `/nmm?${getNmmSearchParamsUrl({ tab, level })}`;
};
