type FineTuningState = {
  eleven_multilingual_v2: string;
  eleven_turbo_v2_5: string;
  eleven_turbo_v2: string;
};

type FineTuning = {
  is_allowed_to_fine_tune: boolean;
  state: FineTuningState;
  verification_failures: any[]; // Replace `any` with a more specific type if known
  verification_attempts_count: number;
  manual_verification_requested: boolean;
  language: string;
  progress: Record<string, unknown>; // Adjust as necessary based on expected structure
  message: Record<string, string>;
  dataset_duration_seconds: number | null;
  verification_attempts: any[] | null; // Replace `any` with a more specific type if known
  slice_ids: any[] | null; // Replace `any` with a more specific type if known
  manual_verification: any | null; // Replace `any` with a more specific type if known
  max_verification_attempts: number;
  next_max_verification_attempts_reset_unix_ms: number;
};

type Labels = {
  accent: string;
  description: string;
  age: string;
  gender: string;
  use_case: string;
};

type VoiceVerification = {
  requires_verification: boolean;
  is_verified: boolean;
  verification_failures: any[]; // Replace `any` with a more specific type if known
  verification_attempts_count: number;
  language: string | null;
  verification_attempts: any[] | null; // Replace `any` with a more specific type if known
};

export type ElevenlabsVoice = {
  voice_id: string;
  name: string;
  samples: any | null; // Replace `any` with a more specific type if known
  category: string;
  fine_tuning: FineTuning;
  labels: Labels;
  description: string | null;
  preview_url: string;
  available_for_tiers: any[]; // Replace `any` with a more specific type if known
  settings: any | null; // Replace `any` with a more specific type if known
  sharing: any | null; // Replace `any` with a more specific type if known
  high_quality_base_model_ids: string[];
  safety_control: any | null; // Replace `any` with a more specific type if known
  voice_verification: VoiceVerification;
  permission_on_resource: any | null; // Replace `any` with a more specific type if known
  is_owner: boolean;
  is_legacy: boolean;
  is_mixed: boolean;
  created_at_unix: number | null;
};
