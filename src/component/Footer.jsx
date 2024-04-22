import React from 'react';

export const Footer = () => {
  return (
    <footer className="footer-distributed">

        <div className="footer-left">
            <h3>Product<span>Reviews</span></h3>

            <p className="footer-links">
                <a href="#">Home</a>
                |
                <a href="#">Write a Reviews</a>
                |
                <a href="#">Categories</a>
                |
                <a href="#">Contact</a>
            </p>

            <p className="footer-company-name">Copyright © 2024 <strong>Product-Reviews</strong> All rights reserved</p>
        </div>

        <div className="footer-center">
            <div>
                <i className="fa fa-map-marker"></i>
                <p><span>Dalat</span>
                    Lam Dong</p>
            </div>

            <div>
                <i className="fa fa-phone"></i>
                <p>0765721407</p>
            </div>
            <div>
                <i className="fa fa-envelope"></i>
                <p><a href="mailto:trunghieu090802@gmail.com">trunghieu090802@gmail.com</a></p>
            </div>
        </div>
        <div className="footer-right">
            <p className="footer-company-about">
                <span>About the project</span>
                <strong>Product Reviews</strong> is a Youtube channel where you can find more creative CSS Animations
                and
                Effects along with
                HTML, JavaScript and Projects using C/C++.
            </p>
            <div className="footer-icons">
                <a href="#"><i className="fa fa-facebook"></i></a>
                <a href="#"><i className="fa fa-instagram"></i></a>
                <a href="#"><i className="fa fa-linkedin"></i></a>
                <a href="#"><i className="fa fa-twitter"></i></a>
                <a href="#"><i className="fa fa-youtube"></i></a>
            </div>
        </div>
    </footer>
  );
};

