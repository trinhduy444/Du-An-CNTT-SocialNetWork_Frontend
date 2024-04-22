import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { authService} from '../service/authService';
import { profileService } from '../service/profileService';
import setting from '../public/images/setting.png';
import help from '../public/images/help.png';
import profile from '../public/images/profile.png';
import logout from '../public/images/logout.png';
import { useDispatch } from 'react-redux';
import { saveProfileData } from '../actions/profileAction';
import {isAuthenticated} from '../utils/checkAuthentication';
import {BASE_URL} from '../config/axiosConfig';
import logo from '../public/images/logo.png';
import avtDefautl from '../public/images/user.png';
import "../assets/css/bootstrap.min.css"
import "../assets/css/vegas.min.css"
import "../assets/css/tooplate-barista.css"
import "../assets/css/bootstrap-icons.css"


export const TopNav = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const [userName, setUserName] = useState();
    const [userID, setUserID] = useState();

    const [avatarData, setAvatarData] = useState();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggleSubMenu = () => {
      setIsSubMenuOpen(!isSubMenuOpen);
    }
   
    useEffect(() => {
      if(isAuthenticated()){
        setIsLoggedIn(isAuthenticated());
      }
      if(isLoggedIn){
        profileService.getProfile().then((res) => {
          // console.log(res.metadata);
          dispatch(saveProfileData(res.metadata));
          setUserName(res.metadata.username);
          setUserID(res.metadata._id);
          if(res.metadata.avatar){
            const avatar = res.metadata.avatar;
            setAvatarData(`${BASE_URL}/user/getAvatarByName/${avatar}`);
          }
        });
      }
      
    }, [isLoggedIn]);
    
    useEffect(() => {
      // console.log(isAuthenticated());
        const refreshAccessToken = async () => {
          if(isAuthenticated()) {
            console.log('refreshing token');
            await authService.refreshToken();
          }
        }
        const interval = setInterval(refreshAccessToken,10 * 60 * 1000);
      
      return () => clearInterval(interval);
    }, []);
    
    const handleLogout = async () => {
      try {
        await authService.logout();
        setIsLoggedIn(false);
        setIsSubMenuOpen(false);
        navigate('/login');
      } catch (error) {
        console.error('Error during logout:', error.message);
      }
    };
    
      return (
        <nav className="navbar navbar-expand-lg">                
            <div className="container">
                <a className="navbar-brand d-flex align-items-center" href="/">
                    <img src={logo} className="navbar-brand-image img-fluid" alt="Barista Cafe Template"/>
                    
                </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-lg-auto">
                        <li className="nav-item">
                            <a className="nav-link click-scroll" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link click-scroll" href="#section2">Contact</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link click-scroll" href="/blog">Blog</a>
                        </li>
                       
                        <li className="nav-item">
                        {isLoggedIn ? ( avatarData ? (
                          
                            <img src={avatarData} className="user-pic" onClick={toggleSubMenu} alt="User Avatar" style={{
                              marginTop: '20px',
                              width: '40px',
                              height: '40px',
                              marginRight: '10px',
                              borderRadius: '50%',
                            }}/> 
                           
                          ):(
                            <img src={avtDefautl} className="user-pic" onClick={toggleSubMenu} alt="User Avatar" style={{
                              width: '50px',
                              height: '50px',
                              marginRight: '10px',
                              borderRadius: '50%',
                            }}/>

                          )) : (<a className="nav-link" href="/login">Login</a>) }
                        </li>
                        
                    </ul>
          <div className={isSubMenuOpen ? 'sub-menu-wrap open-menu' : 'sub-menu-wrap'} id="subMenu">
          <div className="sub-menu">
            <div className="user-info">
              <h3>{userName}</h3>
            </div>
          <hr />
          <a href="/profile" className="sub-menu-link">
            <img src={setting} alt="Edit Profile" />
            <p>Edit Profile</p>
            <span></span>
          </a>
          <a href={`/viewProfile/${userID}`} className="sub-menu-link">
            <img src={profile} alt="View Profile" />
            <p>View Profile</p>
            <span></span>
          </a>
          <a href="#" className="sub-menu-link">
            <img src={help} alt="Help & Support" />
            <p>Help & Support</p>
            <span></span>
          </a>
          <a href="#" className="sub-menu-link" onClick={handleLogout}>
            <img src={logout} alt="Logout" />
            <p>Logout</p>
            <span></span>
          </a>
        </div>
      </div>
                    <div className="ms-lg-3">
                        <a className="btn custom-btn custom-border-btn" href="/writeblog" style={{color : '#d98c28'}}>
                            Write a blog
                            <i className="bi-arrow-up-right ms-2"></i>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
      
      );
};

