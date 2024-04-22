import React, {useState } from 'react';
import {authService}  from '../../service/authService';
import { useNavigate } from 'react-router-dom';
import {  useDispatch } from 'react-redux';
import { setIsAdminLoggedIn } from '../../actions/authAction';
import Swal from 'sweetalert2'; // Import sweetalert2
import Cookies from 'js-cookie';
import logo from '../../public/images/logo_RaT.png'
import loginImg from '../home/images/adminLogin.jpg'
import { Link } from 'react-router-dom';

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';
//rafc


export const LoginAdmin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ type: '', content: '' });
    const dispatch = useDispatch();

    const [isAdmin, setIsAdmin] = useState(false);

    const handleLoginAdmin = async (e) => {
      e.preventDefault();
      try {
        const response = await authService.login(email, password);
        console.log(response.metadata.user);
        console.log(response.metadata.user.permission)
        if(response.metadata.user.permission !== 'admin'){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You are not an admin!',
          })
          return;
        }
        setIsAdmin(true);
        // dispatch(saveProfileData(response.metadata.user));
        dispatch(setIsAdminLoggedIn(response.metadata.user));
        Cookies.set('adminUsername', response.metadata.user.username, { expires: 7 });  
        Cookies.set('adminId', response.metadata.user._id, { expires: 7 });              
        navigate('/userManagement/page=1');
      } catch (error) {
          setMessage({ type: 'danger', content: error.message });
      }
    }


    return (
      <MDBContainer className="my-5 gradient-form"style={{border: '1px solid #ccc'}}>

      <MDBRow>

        <MDBCol col='6' className="mb-5" >
          <form id="formLogin" onSubmit={handleLoginAdmin}>
          <div className="d-flex flex-column ms-5" >

            <div className="text-center">
            <Link to="/">
                  <img src={logo} style={{width: '185px'}} alt="logo" />
                </Link>
              <h4 className="mt-1 mb-5 pb-1">RaT Social Admin Login</h4>
            </div>

            <p>Please login to access</p>

            <MDBInput wrapperClass='mb-4' label='Email address'onChange={(e) => setEmail(e.target.value)} id='form1' type='email'/>
            <MDBInput wrapperClass='mb-4' label='Password' onChange={(e) => setPassword(e.target.value)} id='form2' type='password'/>


            <div className="text-center pt-1 mb-5 pb-1">
              <MDBBtn className="mb-4 w-100 gradient-custom-2" type='submit'>Login </MDBBtn>
              <a className="text-muted" href="/forgotPassword">Forgot password?</a>

            </div>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                <a className="text-muted" href="/login">Login with User</a>
            </div>

          </div>
          </form>
        </MDBCol>

        <MDBCol col='6' className="mb-5" style={{border: ''}}>
        <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">
  <img src={loginImg} alt="" className="img-fluid" style={{ objectFit: 'cover', objectPosition: 'center', height:'683.2px', width:'667.2px' }} />
</div>


        </MDBCol>

      </MDBRow>

    </MDBContainer>
    );
};


