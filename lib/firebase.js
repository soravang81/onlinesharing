import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDUZpKOZhzIOVPXGTb113LpjnmbZoYyw_I",
  authDomain: "onlinesharingio.firebaseapp.com",
  projectId: "onlinesharingio",
  storageBucket: "onlinesharingio.appspot.com",
  messagingSenderId: "592256942330",
  appId: "1:592256942330:web:3cd5026d744b97c583c943",
  measurementId: "G-N6X98ETXPC"
};

const app = initializeApp(firebaseConfig);
export const bucket = getStorage(app);