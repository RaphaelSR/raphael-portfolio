import { isLocale, type Locale } from "./i18n";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import "@fontsource-variable/manrope";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-500.css";
import "./styles.css";
import App from "./App";
const initialLocale = isLocale(document.documentElement.dataset.locale ?? null)
  ? (document.documentElement.dataset.locale as Locale)
  : "en";
hydrateRoot(
  document.getElementById("root")!,
  <StrictMode>
    <App initialLocale={initialLocale} />
  </StrictMode>,
);
