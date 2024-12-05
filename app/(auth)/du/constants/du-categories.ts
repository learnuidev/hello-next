export const duCategories = {
  short_stories: {
    id: "short_stories",
    title: "Short Stories",
  },
  everyday_life: {
    id: "everyday_life",
    title: "Everyday Life",
  },

  language: {
    id: "language",
    title: "Language",
  },

  funny_story: {
    id: "funny_story",
    title: "Funny Story",
  },
  courses: {
    id: "courses",
    title: "Courses",
  },

  business_in_china: {
    id: "business_in_china",
    title: "Business In China",
  },
  buzzwords: {
    id: "buzzwords",
    title: "Buzzwords",
  },
  culture: {
    id: "culture",
    title: "Culture",
  },
  current_events: {
    id: "current_events",
    title: "Current Events",
  },
  dialogue: {
    id: "dialogue",
    title: "Dialogue",
  },
  food: {
    id: "food",
    title: "Food",
  },
  history: {
    id: "history",
    title: "History",
  },
  life_in_china: {
    id: "life_in_china",
    title: "Life In China",
  },
  work: {
    id: "work",
    title: "Work",
  },
} as any;

export function getDuCategory(id: string) {
  return duCategories?.[id];
}
