import Rebase from 're-base'
import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDcVAV3SebzshEGrKg_nHePa1OjIS4sII0",
  authDomain: "catch-of-the-day-76979.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-76979.firebaseio.com",
}

const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())

export default base;
