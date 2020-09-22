"use strict";

var firebaseConfig = {
  apiKey: "AIzaSyDkR62_IP6TL4OH6OQEoSLkZGSZWiwukbM",
  authDomain: "kladi-urban-wear-fb186.firebaseapp.com",
  databaseURL: "https://kladi-urban-wear-fb186.firebaseio.com",
  projectId: "kladi-urban-wear-fb186",
  storageBucket: "kladi-urban-wear-fb186.appspot.com",
  messagingSenderId: "18127243245",
  appId: "1:18127243245:web:f8b3ae9cf2e99cc6dd09e4",
};
firebase.initializeApp(firebaseConfig);

import { handleContent } from "./modules/handleContent.js";
import { formHandler } from "./modules/formHandler.js";
import { tableHandler } from "./modules/tableHandler.js";
import { authHandler } from "./modules/authHandler.js";

authHandler();
handleContent();
formHandler();
tableHandler();

