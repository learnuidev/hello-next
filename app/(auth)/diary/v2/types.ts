export interface ListCorrectionsRequest {
  content: string;
  sourceLang?: string;
  targetLang?: string;
}

export type CorrectionDetail = {
  original: string;
  correction: string;
};

export type ListCorrectionsResponse = {
  correction: string;
  details: CorrectionDetail[];
};

export type CorrectionStatus = "pending" | "applied" | "denied";

export type TrackedCorrection = CorrectionDetail & {
  id: string;
  status: CorrectionStatus;
  timestamp: Date;
};
