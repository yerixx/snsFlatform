// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCu3S22I2xDiJOif6i_nay8ndpJh2YyAK8",
  authDomain: "sns-flatform-b0963.firebaseapp.com",
  projectId: "sns-flatform-b0963",
  storageBucket: "sns-flatform-b0963.appspot.com",
  messagingSenderId: "781265093290",
  appId: "1:781265093290:web:d913ed8681008decfc46d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)