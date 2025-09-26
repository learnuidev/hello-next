export interface Config {
  currentScript: HTMLScriptElement | null;
  dataPrefix: string;
  getScriptAttribute: (name: string) => string | null;
}

export interface TrackingConfig {
  allowFileProtocol: boolean;
  allowLocalhost: boolean;
  debugMode: boolean;
  websiteId: string | null;
  trackingDomain: string | null;
  apiEndpoint: string;
}

export interface TrackingStatus {
  enabled: boolean;
  reason: string;
}

export interface AdClickIds {
  fbclid?: string;
  gclid?: string;
  gclsrc?: string;
  wbraid?: string;
  gbraid?: string;
  li_fat_id?: string;
  msclkid?: string;
  ttclid?: string;
  twclid?: string;
}

export interface BaseData {
  websiteId: string;
  domain: string;
  href: string;
  referrer: string | null;
  viewport: { width: number; height: number };
  visitorId: string;
  sessionId: string;
  adClickIds?: AdClickIds;
  type?: string;
  extraData?: Record<string, any>;
}

export interface PageviewState {
  lastTime: number;
  lastUrl: string;
}

export interface PaymentProviderData {
  stripe: { stripe_session_id: string };
  lemonsqueezy: { lemonsqueezy_order_id: string };
  polar: { polar_checkout_id: string };
}

export type PaymentProvider = keyof PaymentProviderData;

export interface EventCallback {
  (response: { status: number }): void;
}

export interface DatafastIdentity {
  email: string;
}

export interface IDatafastInput {
  domain: string;
  apiKey: string;
  apiUrl: string;
  identity: DatafastIdentity;
}
