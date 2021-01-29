import firebase from 'firebase/app'
// 資料庫
import 'firebase/firestore'
// firebase 驗證，使用方式是 firebaseDB.auth
import 'firebase/auth'
import 'firebase/firebase-auth'
// import 'firebase/database'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: process.env.VUE_APP_APIKEY,
    authDomain: 'searchfun-firebase.firebaseapp.com',
    databaseURL: "https://searchfun-firebase.firebaseio.com",
    projectId: 'searchfun-firebase',
    storageBucket: 'searchfun-firebase.appspot.com',
    messagingSenderId: '757039206758',
    appId: process.env.VUE_APP_APPID,
    measurementId: 'G-2RS3V5JP60'
}
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
// console.log(firebaseApp);

const firebaseDB = firebaseApp

export default firebaseDB
