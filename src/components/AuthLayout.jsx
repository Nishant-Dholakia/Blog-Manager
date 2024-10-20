import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
function Protected({authentication = true,children}) {

    const [loader,setLoader] = useState();
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.status);
    useEffect(()=>{
      
        if(authentication && authStatus !== authentication)
          navigate('/login');
        else if(!authentication && authStatus !== authentication)
          navigate('/');
      


    },[loader,navigate,authentication]);

  return (
    loader ? <div>Loading...</div> : {children}
  )
}

export default Protected