import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "../assets/css/style.css"
import logo from '../public/images/logo_RaT.png'
import {BASE_URL} from '../config/axiosConfig';


export const Header = () => {
      return (
        <header className="bg-surface-primary border-bottom pt-6">
        <div className="container-fluid">
            <div className="mb-npx">
                <div className="row align-items-center">
                    <div className="col-sm-6 col-12 mb-4 mb-sm-0">
                        <h1 className="h2 mb-0 ls-tight">
                            <img src={logo} width="40" className="rounded-circle"/>PRODUCT REVIEW - ADMIN DASHBOARD</h1>
                    </div>

                </div>
            </div>
            <ul className="nav nav-tabs mt-4 overflow-x border-0">
                <li className="nav-item ">
                    <a href="#" className="nav-link active">All Users</a>
                </li>
                <li className="nav-item">
                    <a href="analysis.html" className="nav-link font-regular" id="analysisLink">Analysis</a>
                </li>
            </ul>
        </div>
    </header>
      );
};

