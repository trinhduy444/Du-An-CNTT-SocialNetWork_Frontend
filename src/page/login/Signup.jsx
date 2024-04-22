import React from 'react';
import {authService}  from '../../service/authService';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import "../../assets/css/login.module.css"
import Swal from 'sweetalert2';
import logo from '../../public/images/logo_RaT.png'
import loginImg from '../home/images/signUpimg.jpg'
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

export const Signup = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const handleSignup = async (e) => {
        e.preventDefault();
        try{
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const phone_number = document.getElementById('phone_number').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                Swal.fire({
                    icon: 'error',
                    title: "Mật khẩu không khớp nhau!",
                    showConfirmButton: false,
                    timer: 1500
                });
                return;
            }
            const response = await authService.signup(username, email, phone_number, password );
            if(response.statusCode === 200){
                Swal.fire({
                    icon: 'success',
                    title: response.message,
                    showConfirmButton: false,
                    timer: 3000
                });
                navigate('/login');
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: error.message,
                showConfirmButton: false,
                timer: 1500
            });
        }

    }
    
    return (
        <MDBContainer className="my-5 gradient-form"style={{border: '1px solid #ccc'}}>

        <MDBRow>
  
          
  
          <MDBCol col='6' className="mb-5" style={{border: ''}}>
          <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">
    <img src={loginImg} alt="" className="img-fluid" style={{ objectFit: 'cover', objectPosition: 'center', height:'683.2px', width:'667.2px' }} />
</div>

  
          </MDBCol>
  
          <MDBCol col='6' className="mb-5" >
            <form  onSubmit={handleSignup}>
            <div className="d-flex flex-column ms-5" >
  
              <div className="text-center">
              <Link to="/">
                  <img src={logo} style={{width: '185px'}} alt="logo" />
                </Link>
                <h4 className="mt-1 mb-5 pb-1">RaT Social Signup</h4>
              </div>
  
              <p>Please fill all fields to sign up</p>

              {/* <MDBInput wrapperClass='mb-4' label='Email address'onChange={(e) => setEmail(e.target.value)} id='form1' type='email'/>
              <MDBInput wrapperClass='mb-4' label='Password' onChange={(e) => setPassword(e.target.value)} id='form2' type='password'/> */}
              <MDBInput wrapperClass='mb-4' type="text" id="username" placeholder="Tên tài khoản" />
            <MDBInput wrapperClass='mb-4'  type="email" id="email" placeholder="Email" />
            <MDBInput wrapperClass='mb-4'  type="text" id="phone_number" placeholder="Số điện thoại" />
            <MDBInput wrapperClass='mb-4' type="password" id="password" placeholder="Mật khẩu" />
            <MDBInput wrapperClass='mb-4' type="password" id="confirmPassword" placeholder="Nhập lại mật khẩu" />
  
              <div className="text-center pt-1 mb-5 pb-1">
                <MDBBtn className="mb-4 w-100 gradient-custom-2" type='submit'>Sign up </MDBBtn>
              </div>
  
              <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                <p className="mb-0">You have an account? </p>
                
                    <a href="/login" style={{color: 'black' , marginLeft: '5px'}}> Login </a>
                  
                
              </div>
  
            </div>
            </form>
          </MDBCol>
        </MDBRow>
  
      </MDBContainer>

        
 
        
    );
};


