export interface ChapterRequest {
  id: string;
  title: string;
  chapterNumber: string;
}
export interface AddBookRequestParams {
  title: string;
  author: string;
  chapters: ChapterRequest[];
}

export interface Chapter {
  id: string;
  title: string;
  chapterNumber: string;
  createdAt: number;
}
export interface AudioBook {
  title: string;
  author: string;
  userId: string;
  chapters: Chapter[];
}

export interface ListBooksResponse {
  items: AudioBook[];
}
