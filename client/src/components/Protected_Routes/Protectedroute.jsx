import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom';
import { isTokenValid } from '../../utils/Jwt_helper';

const Protectedroute = ({children}) => {

    const navigate = useNavigate();
    useEffect(() => {
        if(!isTokenValid()) {
            navigate('/login');
        }

    },[navigate]);
  return (
    <div>{children}</div>
  )
}

export default Protectedroute