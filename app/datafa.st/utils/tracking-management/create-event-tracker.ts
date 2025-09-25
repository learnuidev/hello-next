import { dataTypes } from "../../constants/data-types";
import {
  BaseData,
  EventCallback,
  PageviewState,
  PaymentProvider,
  PaymentProviderData,
} from "../../datafast.types";

export const createEventTracker = (
  trackingEnabled: boolean,
  collectBaseData: () => BaseData | null,
  sendEvent: (
    eventData: BaseData,
    callback: EventCallback | undefined,
    apiEndpoint: string,
    trackingDomain: string | null
  ) => void,
  apiEndpoint: string,
  trackingDomain: string | null
) => ({
  trackPageview: (
    callback?: EventCallback,
    pageviewState: PageviewState = { lastTime: 0, lastUrl: "" }
  ): PageviewState => {
    if (!trackingEnabled) {
      callback?.({ status: 200 });
      return pageviewState;
    }

    const currentTime = Date.now();
    const currentUrl = window.location.href;

    // Throttle pageviews to once per minute per URL
    if (
      currentUrl === pageviewState.lastUrl &&
      currentTime - pageviewState.lastTime < 60000
    ) {
      console.log("DataFast: Pageview throttled - too recent");
      callback?.({ status: 200 });
      return pageviewState;
    }

    const baseData = collectBaseData();
    if (!baseData) {
      callback?.({ status: 200 });
      return pageviewState;
    }

    baseData.type = dataTypes.pageView;
    sendEvent(baseData, callback, apiEndpoint, trackingDomain);

    // Store pageview state
    try {
      sessionStorage.setItem(
        "datafast_pageview_state",
        JSON.stringify({ time: currentTime, url: currentUrl })
      );
    } catch (error) {
      // Ignore errors
    }

    return { lastTime: currentTime, lastUrl: currentUrl };
  },

  trackPayment: (
    paymentProvider: PaymentProvider,
    sessionId: string,
    callback?: EventCallback
  ): void => {
    if (!trackingEnabled) {
      callback?.({ status: 200 });
      return;
    }

    const baseData = collectBaseData();
    if (!baseData) {
      callback?.({ status: 200 });
      return;
    }

    baseData.type = dataTypes.payment;

    const providerData: PaymentProviderData = {
      stripe: { stripe_session_id: sessionId },
      lemonsqueezy: { lemonsqueezy_order_id: sessionId },
      polar: { polar_checkout_id: sessionId },
    };

    baseData.extraData = providerData[paymentProvider] || {};
    sendEvent(baseData, callback, apiEndpoint, trackingDomain);
  },

  trackEvent: (
    eventType: string,
    extraData?: Record<string, any>,
    callback?: EventCallback
  ): void => {
    if (!trackingEnabled) {
      callback?.({ status: 200 });
      return;
    }

    const baseData = collectBaseData();
    if (!baseData) {
      callback?.({ status: 200 });
      return;
    }

    baseData.type = eventType;
    baseData.extraData = extraData;
    sendEvent(baseData, callback, apiEndpoint, trackingDomain);
  },
});
