import i18 from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18.use(Backend).use(initReactI18next).init({
  fallbackLng: "es",
});
