import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'


var firebaseConfig = {
    apiKey: "AIzaSyAbw0MVhcSAGYfdY6htJ_c4850k3XGf0Kw",
    authDomain: "news-blog-da8e9.firebaseapp.com",
    databaseURL: "https://news-blog-da8e9.firebaseio.com",
    projectId: "news-blog-da8e9",
    storageBucket: "news-blog-da8e9.appspot.com",
    messagingSenderId: "1043211491930",
    appId: "1:1043211491930:web:0a05c4c94b9c6422eed663"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  export default firebase