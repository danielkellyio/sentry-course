import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/main.pcss";
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

const app = createApp(App);

Sentry.init({
  app,
  dsn: "https://7e17d75ec8774930a1ca95b9087ef82e@o1065263.ingest.sentry.io/6132933",
  logErrors: true,
  release: __SENTRY_RELEASE__,
  environment: import.meta.env.MODE,
  integrations: [
    new Integrations.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ["localhost", "my-site-url.com", /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 0.2,
});

app.use(router).mount("#app");
const user = {
  email: "daniel@vueschool.io",
};
Sentry.setUser(user);
Sentry.configureScope((scope) => scope.setUser(null));
