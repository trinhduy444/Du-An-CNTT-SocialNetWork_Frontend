import React, { useEffect, useState } from 'react';
import {authService}  from '../../service/authService';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import "../../assets/css/login.module.css"
import Swal from 'sweetalert2';
import logo from '../../public/images/logo_RaT.png'
import loginImg from '../home/images/happy-loving-couple-bakers-drinking-coffee-looking-notebook.jpg'
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
  }
  from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

//rafc

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
      
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await authService.login(email, password);
          Swal.fire({
            icon: 'success',
            title: response.message,
            showConfirmButton: false,
            timer: 1500
        });
          navigate('/');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: error.message,
                showConfirmButton: false,
                timer: 1500
            });
        }
    };   
  
    
    return (
        <MDBContainer className="my-5 gradient-form"style={{border: '1px solid #ccc'}}>

        <MDBRow>
  
          <MDBCol col='6' className="mb-5" >
            <form id="formLogin" onSubmit={handleLogin}>
            <div className="d-flex flex-column ms-5" >
  
              <div className="text-center">
              <Link to="/">
                  <img src={logo} style={{width: '185px'}} alt="logo" />
                </Link>
                <h4 className="mt-1 mb-5 pb-1">RaT Social Login</h4>
              </div>
  
              <p>Please login to access</p>

              <MDBInput wrapperClass='mb-4' label='Email address'onChange={(e) => setEmail(e.target.value)} id='form1' type='email'/>
              <MDBInput wrapperClass='mb-4' label='Password' onChange={(e) => setPassword(e.target.value)} id='form2' type='password'/>
  
  
              <div className="text-center pt-1 mb-5 pb-1">
                <MDBBtn className="mb-4 w-100 gradient-custom-2" type='submit'>Login </MDBBtn>
                <a className="text-muted" href="/forgotPassword">Forgot password?</a>

              </div>
  
              <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                <p className="mb-0">Don't have an account?</p>
         
                    <a href="/signup" style={{color: 'black', marginLeft: '5px'}}>Sign up </a>
                  
              </div>
              <a className="text-muted" href="/loginAdmin">Login with Admin</a>

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

        
        // <div className="containerLogin" id="containerLogin">
            
        // <div className="form-container sign-up">
        // <form onSubmit={handleSignup}>
        //     <h1>Tạo tài khoản</h1>
        //     <input type="text" id="username" placeholder="Tên tài khoản" />
        //     <input type="email" id="email" placeholder="Email" />
        //     <input type="text" id="phone_number" placeholder="Số điện thoại" />
        //     <input type="password" id="password" placeholder="Mật khẩu" />
        //     <input type="password" id="confirmPassword" placeholder="Nhập lại mật khẩu" />
        //     <span>-----OR------</span>
        //     <div className="social-icons">
        //         <a href="#" className="icon">
        //         <i className="fa-brands fa-google-plus-g"></i>
        //         </a>
        //     </div>

        //     <button type='submit'>Đăng kí</button>
        //     </form>
        // </div>
        // <div className="form-container sign-in">
        //     <form id="formLogin" onSubmit={handleLogin}>
            
        //     <h1>Đăng nhập</h1>
        //     <input type="text" placeholder="Tên đăng nhập" onChange={(e) => setEmail(e.target.value)}  />
        //     <input type="password" placeholder="Mật khẩu" onChange={(e) => setPassword(e.target.value)} />
        //     <a href="/forgotPassword">Forget Your Password ?</a>
        //     <span>-----OR------</span>
        //     <div className="social-icons">
        //         <a href="#" className="icon">
        //         <i className="fa-brands fa-google-plus-g"></i>
        //         </a>
        //     </div>

        //     <button type='submit'>Đăng nhập</button>
            
        //     </form>
        // </div>
        
        // <div className="toggle-container">
        //     <div className="toggle">
        //     <div className="toggle-panel toggle-left">
        //         <h1>Welcome Back!</h1>
        //         <p>Enter your personal details to use all site features</p>
        //         <button id="login">
        //         Đăng nhập
        //         </button>
        //     </div>
        //     <div className="toggle-panel toggle-right">
        //         <h1>RaT Hello!</h1>
        //         <p>Register with your personal details to use all site features</p>
        //         <button id="register">
        //         Đăng kí
        //         </button>
        //     </div>
        //     </div>
        // </div>
        // </div>
        
    );
};


