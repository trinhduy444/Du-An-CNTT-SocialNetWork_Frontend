import React, { useEffect, useState } from 'react';
import "../../assets/css/style.css"
import { useNavigate } from 'react-router-dom';
import { Nav } from '../../component/Nav';
import { Header } from '../../component/Header';
export const CreateAdmin = () => {
    const navigate = useNavigate();
 
  return (
    
    <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
    <Nav/>
    <div className="h-screen flex-grow-1 overflow-y-lg-auto">
        <Header/>
        <main className="py-6 bg-surface-secondary">
        <div className="container-fluid main-container">
        <form>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1"/>
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
        </main>
        
    </div>
</div>
  );
};


