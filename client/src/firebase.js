import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
	apiKey: "AIzaSyD8-n2DA2pT3pEOpSHp9KG-5Fja3mVDKcg",
	authDomain: "mernchat-635e2.firebaseapp.com",
	databaseURL: "https://mernchat-635e2.firebaseio.com",
	projectId: "mernchat-635e2",
	storageBucket: "mernchat-635e2.appspot.com",
	messagingSenderId: "740488433846",
	appId: "1:740488433846:web:3bd85fa9ccc6236b8c1617",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();

export default firebase;
