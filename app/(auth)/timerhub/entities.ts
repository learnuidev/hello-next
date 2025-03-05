export interface Room {
  id: string; // unique identifier for the room
  name: string; // name of the room
  timezone: string; // the timezone in which the room is located
}

export interface Timer {
  id: string; // unique identifier for the timer
  roomId: string; // reference to the room this timer belongs to
  duration: number; // duration of the timer, in seconds
  isRunning: boolean; // whether the timer is currently running or not
  startTime?: number; // when the timer was started (optional because it may not have been started yet)
  endTime?: number; // when the timer will stop (optional because timers can run forever if duration is left unspecified)
  serverTime: number; // timestamp from the server at which this data was fetched or updated
  createdAt: number; // timestamp of when this timer was created
  updatedAt: number; // timestamp of last time this timer was updated
}

interface TextSettings {
  color: string; // Color of text
  isBold: boolean; // Whether the text is bold or not
  isCapitalized: boolean; // Whether the first letter should be capitalized or not
}

export interface TimerMessage {
  id: string; // Unique identifier for the timer message
  timerId: string; // Identifier of the associated timer
  text: string; // The actual content of the message
  settings: TextSettings; // Settings related to the text, color, boldness and capitalization
}
