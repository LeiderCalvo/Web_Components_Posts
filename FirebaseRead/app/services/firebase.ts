import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";
import { FireCollectionResponse, FirePostResponse, Post } from "../types/types";
import { firebaseConfig } from "./firebaseConfig.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const addPost = async (post: Post) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), post);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    alert("Error adding document");
  }
};

const listenPosts = (notifyComponent: (posts: Post[]) => void) => {
  const handleDbChange = (
    documents: FireCollectionResponse<FirePostResponse>
  ) => {
    const potst = documents.docs.map((doc) => doc.data());
    notifyComponent(potst);
  };

  onSnapshot(collection(db, "posts"), handleDbChange);
};

export default { addPost, listenPosts };
