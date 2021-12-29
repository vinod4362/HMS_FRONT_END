
import './App.css';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
 
} from "react-router-dom";
import Navibar from "./components/Navbar/Navbar";
import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import ShowRooms from './components/Room/ShowRooms';
import BookRoom from './components/Room/BookRoom';
import DeleteReservation from './components/Reservation/DeleteReservation';

function App() {
  const [currentUser, setCurrentUser] = useState({
    isAuthenticated: false,
    guestId: undefined,
  });

  useEffect(()=>{
    if(sessionStorage.getItem("guestId")!=null){
      setCurrentUser({isAuthenticated:true, guestId:sessionStorage.guestId})
    }
  },[])
  const loginUser = (data) =>{
    sessionStorage.setItem("guestId", Number(data.guestId))
    setCurrentUser({isAuthenticated:true, guestId:sessionStorage.guestId});
  }
  const logoutUser = ()=>{
    sessionStorage.removeItem('guestId');
    setCurrentUser({
      isAuthenticated: false,
      guestId: undefined,
    });
  }
  return (
    <div className="App">
      <Router>
        <Navibar currentUser={currentUser} logoutUser={logoutUser}></Navibar>
        <Switch>

          <Route exact path="/" component={Home}>
          </Route>
          <Route exact path="/home" component={Home}>
          </Route>
          <Route exact path="/reservation" >
            <ShowRooms currentUser={currentUser}/>
          </Route>
          <Route exact path="/reservation/:roomId" >
            <BookRoom currentUser={currentUser}/>
          </Route>
          <Route exact path="/reservation/DeleteReservation/:guestId" >
            <DeleteReservation currentUser={currentUser}/>
          </Route>
          <Route exact path="/auth" >
            <Login currentUser={currentUser} loginUser={loginUser}/>
          </Route>
        </Switch>
      
        {/* <Footer></Footer> */}
      </Router>

      
    </div>
  );
}

export default App;
