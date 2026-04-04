export interface HistoryItem {
  createdAt: number;
  eventType: "SEARCH" | "CONTENT_VIEWED";
  id: string;
  input: string;
  lang: string;
  lastSeen: number;
  searchContextText?: string; // this keeps reference
  sk: string; // this helps us get that single search item
  timesSeen: { lastSeen: number }[];
  userId: string;
}

const historyItem: HistoryItem = {
  createdAt: 1775306208775,
  eventType: "SEARCH",
  id: "01KNC7XXG7Y717T9FQPN5BHKZK",
  input: "余年",
  lang: "zh",
  lastSeen: 1775306208775,
  searchContextText: "余年间",
  sk: "余年#zh#learnuidev@gmail.com",
  timesSeen: [{ lastSeen: 1775306208775 }],
  userId: "learnuidev@gmail.com",
};
