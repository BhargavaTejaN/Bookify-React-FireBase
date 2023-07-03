import { createContext,useState,useEffect } from "react";
import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "firebase/auth";

import {getFirestore,collection,addDoc,getDocs,doc, getDoc,query,where} from 'firebase/firestore'
import {getStorage,ref,uploadBytes,getDownloadURL} from 'firebase/storage'

export const FireBaseContext = createContext();

const firebaseConfig = {
  apiKey: "AIzaSyCFAvMoaIZ-lWbiv9UORVjwaEop2F5d6Io",
  authDomain: "bookify-48c27.firebaseapp.com",
  projectId: "bookify-48c27",
  storageBucket: "bookify-48c27.appspot.com",
  messagingSenderId: "104971499793",
  appId: "1:104971499793:web:25a5b300caa0181206b4b0",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
let isLoggedIn;

export const FireBaseProvider = ({ children }) => {

    const [user,setUser] = useState('');

    useEffect(() => {
        onAuthStateChanged(firebaseAuth,(user) => {
            if(user) {
                setUser(user);
            } else {
                setUser(null);
            }
        })
    },[])

    if(user === null || user === ''){
        isLoggedIn = false
    } else {
        isLoggedIn = true
    }

  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const loginUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signupUserWithGoogle = async () => {
    return await signInWithPopup(firebaseAuth, googleProvider);
  };

  const handleCreateNewListing = async(name,isbnNumber,price,coverPic) => {
    const imgRef = ref(storage,`uploads/images/${Date.now()}-${coverPic.name}`)
    const uploadResult = await uploadBytes(imgRef,coverPic)
    const result =await addDoc(collection(firestore,'books'),{
      name,
      isbnNumber,
      price,
      imageURL : uploadResult.ref.fullPath,
      userId : user.uid,
      userEmail : user.email,
      displayName : user.displayName,
      photoURL : user.photoURL
    })
    return result
  }

  const listAllBooks = async() => {
    return await getDocs(collection(firestore,'books'))
  }

  const getImageURL = async(path) => {
    return await getDownloadURL(ref(storage,path))
  }

  const getBookById = async(id) => {
    const docRef = doc(firestore,'books',id);
    const result = await getDoc(docRef)
    return result
  }

  const placeOrder = async(id,quantity) => {
    const collectionRef = collection(firestore,'books',id,'orders');
    const result = await addDoc(collectionRef,{
      userId : user.uid,
      userEmail : user.email,
      displayName : user.displayName,
      photoURL : user.photoURL,
      quantity : Number(quantity)
    })
    return result
  }

  const fetchMyBooks = async (userId) => {
    const collectionRef = collection(firestore, "books");
    const newQuery = query(collectionRef, where("userId", "==", userId));
    const result = await getDocs(newQuery);
    return result;
  };

  const getOrders = async (id) => {
    const collectionRef = collection(firestore, "books", id, "orders");
    const result = await getDocs(collectionRef);
    return result;
  };

  const value = {
    signupUserWithEmailAndPassword,
    loginUserWithEmailAndPassword,
    signupUserWithGoogle,
    isLoggedIn,
    handleCreateNewListing,
    listAllBooks,
    getImageURL,
    getBookById,
    placeOrder,
    fetchMyBooks,
    user,
    getOrders
  };

  return (
    <FireBaseContext.Provider value={value}>
      {children}
    </FireBaseContext.Provider>
  );
};
