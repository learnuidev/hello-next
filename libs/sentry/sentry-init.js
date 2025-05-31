import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://e644ac85fab0a9b5058fa093e51b4778@o4509418559242240.ingest.us.sentry.io/4509418572021760",

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  integrations: [],
});
