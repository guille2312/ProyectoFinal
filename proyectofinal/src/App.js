import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route,Redirect  } from "react-router-dom";
import Home from "./Home";
import ChatPage from "./chat"
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
  <Router>

    
    <Route path="/Home" component={Home}/>
    <Route path="/chat" component={ChatPage}/>
    <Route exact path="/">
    <Redirect to="/Home" />
</Route>
  </Router>
  );

  
};

export default App;