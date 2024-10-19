import { useEffect, useState } from 'react'
import {authService} from './appwrite/auth'
import './App.css'
import {useDispatch} from 'react-redux'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import {login,logout} from './store/authSlice'

function App() {

const [loading,setLoading] = useState(true);
const dispatch = useDispatch();
useEffect(()=>{
  authService.getUser()
  .then((userData)=>{
    if(userData)
    {
      dispatch(login({userData}));
    }
    else{
      dispatch(logout());
    }
  })
  .finally(()=> setLoading(false));
},[])



 return !loading ? (
  <div>
    <Header />
        TODO : 
        {/* <Outlet /> */}
    <Footer />
  </div>
 ) : null
}

export default App;
