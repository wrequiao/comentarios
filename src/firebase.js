
import firebase from 'firebase/app'
import 'firebase/database'

const config = {
    apiKey: "AIzaSyABveoamKaAFZTcN45rbGs0uZkSo51sX8Q",
    authDomain: "reactjs-746ec.firebaseapp.com",
    databaseURL: "https://reactjs-746ec.firebaseio.com",
    projectId: "reactjs-746ec",
    storageBucket: "reactjs-746ec.appspot.com",
    messagingSenderId: "993517826810"
  }

  firebase.initializeApp(config)

  export const database = firebase.database()
//teste