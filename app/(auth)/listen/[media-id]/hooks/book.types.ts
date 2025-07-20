export interface ChapterRequest {
  title: string;
  chapterNumber: string;
}
export interface AddBookRequestParams {
  title: string;
  author: string;
  chapters: ChapterRequest[];
  lang: string;
}

export interface Chapter {
  id: string;
  title: string;
  chapterNumber: string;
  createdAt: number;
}
export interface AudioBook {
  id: string;
  lang: string;
  title: string;
  author: string;
  userId: string;
  chapters: Chapter[];
}

export interface ListBooksResponse {
  items: AudioBook[];
}
