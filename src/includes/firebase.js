import firebase from "firebase/app"
import "firebase/auth"
// import 'firebase/database' 這個是realtime舊資料庫的用法
import "firebase/firestore"
//存file
import 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPfcvTP7i56WK5b4NhFx1X1llr5t0s_Ik",
  authDomain: "music-56d06.firebaseapp.com",
  projectId: "music-56d06",
  storageBucket: "music-56d06.appspot.com",
  appId: "1:841998862303:web:d7b363f79c3e1ff513a66a"
};

// Initialize firebase
firebase.initializeApp(firebaseConfig)

const auth=firebase.auth()
const db=firebase.firestore()
const storage=firebase.storage()

const usersCollection=db.collection('users')
const songsCollection=db.collection('songs')
const commentsCollection=db.collection('comments')

export{
  auth,
  db,
  usersCollection,
  songsCollection,
  commentsCollection,
  storage,
}