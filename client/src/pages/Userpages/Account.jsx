import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../utils/Jwt_helper';


const Account = () => {

    const navigate = useNavigate();
    const onLogout = useCallback(() => {

        logOut();
        navigate('/')

    }, [navigate]);





  return (
    <div>
        <button
            onClick={onLogout}
            style={{
                padding: '10px 24px',
                background: 'linear-gradient(90deg, #4f8cff 0%, #3358e6 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(79, 140, 255, 0.15)',
                transition: 'background 0.2s'
            }}
        >
           LOGOUT
        </button>

    </div>
  )
}

export default Account