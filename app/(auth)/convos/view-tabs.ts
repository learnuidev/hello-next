export type ViewType = "history" | "me" | "public" | "collections";

export const viewTabs: { label: string; value: ViewType }[] = [
  {
    label: "历史",
    value: "history",
  },
  {
    label: "我",
    value: "me",
  },
  {
    label: "公开",
    value: "public",
  },
  {
    label: "收藏",
    value: "collections",
  },
];

/**
 * Query param that keeps the active tab in the URL, so tabs are linkable:
 * `/convos?active=collections`, `/convos?active=history`, ...
 */
export const activeTabQueryParam = "active";

export const defaultViewType: ViewType = "collections";

export const isViewType = (
  value: string | null | undefined,
): value is ViewType =>
  !!value && viewTabs.some((tab) => tab.value === value);
