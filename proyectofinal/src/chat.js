import React, { useRef, useState } from 'react';
import './Chat.css';



import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


  if (!firebase.apps.length) {
  firebase.initializeApp({
  apiKey: "AIzaSyA910P2iYz0CA5H0QklSQm_WkaIYKTNvO4",
  authDomain: "proyectonba.firebaseapp.com",
  projectId: "proyectonba",
  storageBucket: "proyectonba.appspot.com",
  messagingSenderId: "138240121701",
  appId: "1:138240121701:web:f98fb2d127e62fb6e55f8c",
  measurementId: "G-89ZMCWHRJL"})
 }else {
    firebase.app(); // if already initialized, use that one
  }

    
 

  const auth = firebase.auth();
  const firestore = firebase.firestore();
  
  
  
  function ChatPage() {
  
    const [user] = useAuthState(auth);
  
    return (
      <div className="ChatPage">
        <header>
          <h1> <SignOut /></h1>
        </header>
  
        <section>
          {user ? <ChatRoom /> : <SignIn />}
          
        </section>
            

      </div>
    );
    
  }
 
  
  function SignIn() {
  
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
  
    return (
      <>
        <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      </>
    )
  
  }
  
  function SignOut() {
    return auth.currentUser && (
      <Link to="/Home">
      <button className="sign-out" class="mt-10" onClick={() => auth.signOut()} >Sign Out</button>
      </Link>
    )
  }
  
 

  function ChatRoom() {
    const bajar = useRef();
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
  
    const [messages] = useCollectionData(query, { idField: 'id' });
  
    const [formValue, setFormValue] = useState('');
  
  
    const sendMessage = async (e) => {
      e.preventDefault();
  
      const { uid, photoURL } = auth.currentUser;
  
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      })
  
      setFormValue('');
      bajar.current.scrollIntoView({ behavior: 'smooth' });
    }
  
    return (<>
      <main>
  
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
  
        <span ref={bajar}></span>
  
      </main>
  
      <form class="mb-5" onSubmit={sendMessage} id="introducirMensaje">
  
        <input id="inputMensaje" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Escribe aqui tu mensaje" />
  
        <button type="submit" id="botonEnviar" disabled={!formValue}>Enviar </button>
  
      </form>
    </>)
  }
  
  
  function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;
  
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
    return (<>
      <div className={`message ${messageClass}`}>
        <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
        <p>{text}</p>
      </div>
    </>)
  }
  
  export default ChatPage;
