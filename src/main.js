import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'


import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAWffTGumCT5Q3PCWJyZEydD6RhqaUylP4",
  authDomain: "poke-api-4b9a3.firebaseapp.com",
  projectId: "poke-api-4b9a3",
  storageBucket: "poke-api-4b9a3.appspot.com",
  messagingSenderId: "572884873494",
  appId: "1:572884873494:web:5c731394cdb8a01bffa037"
};

initializeApp(firebaseConfig);


Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')


export const bus = new Vue()