import { createContext, useContext } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import getLogger from "../_modules/logger";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const ALPHAfirebaseConfig = {
  apiKey: process.env.REACT_APP_FA_API_KEY,
  authDomain: "ourapt-alpha.firebaseapp.com",
  projectId: "ourapt-alpha",
  storageBucket: "ourapt-alpha.appspot.com",
  messagingSenderId: process.env.REACT_APP_FA_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FA_APP_ID,
  measurementId: process.env.REACT_APP_FA_MEASUREMENT_ID,
};

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FA_API_KEY,
  authDomain: "ourapt-production.firebaseapp.com",
  projectId: "ourapt-production",
  storageBucket: "ourapt-production.appspot.com",
  messagingSenderId: process.env.REACT_APP_FA_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FA_APP_ID,
  measurementId: process.env.REACT_APP_FA_MEASUREMENT_ID,
};

// Initialize Firebase
const app =
  process.env.REACT_APP_ENV === "production"
    ? initializeApp(firebaseConfig)
    : initializeApp(ALPHAfirebaseConfig);
const analytics = getAnalytics(app);

// 로그 이벤트

type FirebaseAnalyticsEventParams = { [key: string]: any };

const FirebaseAnalyticsEvent = (
  eventName: string,
  params?: FirebaseAnalyticsEventParams
) => {
  logEvent(analytics, eventName, params);
  getLogger().log(`${eventName}, ${params}`);
};

const FirebaseAnalyticsContext = createContext(FirebaseAnalyticsEvent);

export const FirebaseAnalyticsProvider: React.FC = (props) => {
  return (
    <FirebaseAnalyticsContext.Provider value={FirebaseAnalyticsEvent}>
      {props.children}
    </FirebaseAnalyticsContext.Provider>
  );
};

export function useAnalytics() {
  return useContext(FirebaseAnalyticsContext);
}
