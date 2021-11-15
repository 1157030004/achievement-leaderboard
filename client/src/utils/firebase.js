import firebase from "firebase";

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: "leaderboard-174c5.firebaseapp.com",
	projectId: "leaderboard-174c5",
	storageBucket: "leaderboard-174c5.appspot.com",
	messagingSenderId: "167772780128",
	appId: "1:167772780128:web:79d236426985601a5b7505",
	measurementId: "G-D39YZ4JY3N",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
