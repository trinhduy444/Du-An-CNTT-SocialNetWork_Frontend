import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "../assets/css/style.css"
import { authService } from '../service/authService';
import logo from '../public/images/logo_RaT.png'
import {BASE_URL} from '../config/axiosConfig';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

export const Nav = () => {
    const navigate = useNavigate();
    const adminInfo = useSelector((state) => state.auth);
    console.log(adminInfo.isAdminLoggedIn);
   
    const handleLogout = async () => {
        Swal.fire({
            title: 'Are you sure Logout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await authService.logout();
                    navigate('/loginAdmin');
                } catch (error) {
                    console.error('Error during logout:', error.message);
                }
            }
        });
 
    };
      return (
        <nav className="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg" id="navbarVertical">
        <div className="container-fluid ">
            <button className="navbar-toggler ms-n2" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand py-lg-2 mb-lg-5 px-lg-6 me-0" href="/userManagement/page=1">
                <h3 className="text-success"><img src={logo} width="40" className="rounded-circle"/><span className="text-info">PRODUCT</span>REVIEW</h3> 
            </a>
            <div className="navbar-user d-lg-none">
                <div className="dropdown">
                    <a href="#" id="sidebarAvatar" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <div className="avatar-parent-child">
                            <img alt="Image Placeholder" src="https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80" className="avatar avatar- rounded-circle"/>
                            <span className="avatar-child avatar-badge bg-success"></span>
                        </div>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="sidebarAvatar">
                        <a href="/profile" className="dropdown-item">Profile</a>
                        <a href="#" className="dropdown-item">Settings</a>
                        <a href="#" className="dropdown-item">Billing</a>
                        <hr className="dropdown-divider"/>
                        <a href="#" className="dropdown-item" >Logout</a>
                    </div>
                </div>
            </div>
            <div className="collapse navbar-collapse" id="sidebarCollapse">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/userManagement/page=1">
                            <i className="bi bi-people"></i> Quản lí người dùng
                            {/* <span className="badge bg-soft-primary text-primary rounded-pill d-inline-flex align-items-center ms-auto">6</span> */}
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/postManagement/all/page=1">
                            <i className="bi bi-file-text"></i> Quản lí bài đăng
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/reportManagement/all/page=1">
                            <i className="bi bi-bar-chart"></i> Quản lí report
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            <i className="bi bi-bookmarks"></i> Quảng cáo
                        </a>
                    </li>
                </ul>
                <hr className="navbar-divider my-5 opacity-20"/>
                <ul className="navbar-nav mb-md-4">
                    <li>
                        <div className="nav-link text-xs font-semibold text-uppercase text-muted ls-wide" href="#">
                            Contacts
                            <span className="badge bg-soft-primary text-primary rounded-pill d-inline-flex align-items-center ms-4">13</span>
                        </div>
                    </li>
                    <li>
                        <a href="#" className="nav-link d-flex align-items-center">
                            <div className="me-4">
                                <div className="position-relative d-inline-block text-white">
                                    <img alt="Image Placeholder" src="https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80" className="avatar rounded-circle"/>
                                    <span className="position-absolute bottom-2 end-2 transform translate-x-1/2 translate-y-1/2 border-2 border-solid border-current w-3 h-3 bg-success rounded-circle"></span>
                                </div>
                            </div>
                            <div>
                                <span className="d-block text-sm font-semibold">
                                    Daisy johnson
                                </span>
                                <span className="d-block text-xs text-muted font-regular">
                                    Paris, FR
                                </span>
                            </div>
                            <div className="ms-auto">
                                <i className="bi bi-chat"></i>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link d-flex align-items-center">
                            <div className="me-4">
                                <div className="position-relative d-inline-block text-white">
                                    <span className="avatar bg-soft-warning text-warning rounded-circle">JW</span>
                                    <span className="position-absolute bottom-2 end-2 transform translate-x-1/2 translate-y-1/2 border-2 border-solid border-current w-3 h-3 bg-success rounded-circle"></span>
                                </div>
                            </div>
                            <div>
                                <span className="d-block text-sm font-semibold">
                                    Michael Jordan
                                </span>
                                <span className="d-block text-xs text-muted font-regular">
                                    Bucharest, RO
                                </span>
                            </div>
                            <div className="ms-auto">
                                <i className="bi bi-chat"></i>
                            </div>
                        </a>
                    </li>
                </ul>
                <div className="mt-auto"></div>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/profile">
                            <i className="bi bi-person-square"></i> Account
                        </a>
                    </li>
                    <li className="nav-item" onClick={handleLogout}>
                        <a className="nav-link" href="#">
                            <i className="bi bi-box-arrow-left" ></i> Logout
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
      );
};

