// 웹에서 파이어베이스를 쓰기위해서 SDK 초기화했다.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGEx252fdAS7IwavSgy4hB7skJtFmOD2c",
  authDomain: "sns-flatform-7b2ff.firebaseapp.com",
  projectId: "sns-flatform-7b2ff",
  storageBucket: "sns-flatform-7b2ff.appspot.com",
  messagingSenderId: "476443588574",
  appId: "1:476443588574:web:7195cd12404c8cc9a30f4f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
