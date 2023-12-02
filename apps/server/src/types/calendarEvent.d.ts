export interface event {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  creator: Creator;
  organizer: Creator;
  start: End;
  end: End;
  iCalUID: string;
  sequence: number;
  reminders: Reminders;
  eventType: string;
}

export interface Creator {
  email: string;
  self: boolean;
}

export interface End {
  dateTime: string;
  timeZone: string;
}

export interface Reminders {
  useDefault: boolean;
}
