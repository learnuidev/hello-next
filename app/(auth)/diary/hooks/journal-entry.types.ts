export interface JournalEntry {
  userId: string; // User's email address
  updatedAt: number; // Timestamp of when the object was last updated
  status: "PROCESSED"; // Status of the journey (fixed value)
  latency: number; // Latency in milliseconds
  createdAt: number; // Timestamp of when the object was created
  emotions: string; // Comma-separated list of emotions
  text: string; // Detailed narrative about the recovery journey
  topics: string; // Comma-separated list of relevant topics
  id: string; // Unique identifier for the journey
  title: string; // Title of the recovery journey
}
