export type Note = {
  id: string; //uuid
  title: string; // Note title
  content: string; // Markdown text content
  updatedAt: string; // ISO timestamp of last update
  synced: boolean; // Whether note is synced with backend
};
