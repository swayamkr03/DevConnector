import React,{Fragment,useEffect} from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/layout/auth/Login';
import Alert from './components/layout/alert';
import Register from './components/layout/auth/Register';
import {Provider} from 'react-redux'; 
import store from './store';
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App=()=> {
  useEffect(()=>{
    store.dispatch(loadUser());
  }, []);

  return(
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Routes>
          <Route path='/' element={<Landing />} />
        </Routes>
        <section className="container">
          <Alert/>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </section>
      </Fragment>
    </Router>
  </Provider>
)};


export default App;
