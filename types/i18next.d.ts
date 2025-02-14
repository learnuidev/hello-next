import { i18nOptions } from "@/libs/i18n-next/i18n-config";

import frontend from "@/locales/en/frontend.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof i18nOptions.defaultNS;
    resources: {
      frontend: typeof frontend;
    };
  }
}

