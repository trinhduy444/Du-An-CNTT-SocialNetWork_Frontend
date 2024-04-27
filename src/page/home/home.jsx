import React, { useEffect } from 'react';
import { TopNav } from '../../component/TopNav.jsx';
import videoIntro from "./videos/pexels-mike-jones-9046237.mp4";
//rafc

export const Home = () => {
    useEffect(() => {
        let next = document.getElementById('next');
        let prev = document.getElementById('prev');
      
        const handleNextClick = () => {
          let items = document.querySelectorAll('.item');
          document.querySelector('.hero-slides').appendChild(items[0]);
        };
      
        const handlePrevClick = () => {
          let items = document.querySelectorAll('.item');
          document.querySelector('.hero-slides').prepend(items[items.length - 1]);
        };
      
        next.addEventListener('click', handleNextClick);
        prev.addEventListener('click', handlePrevClick);
      
        return () => {
          next.removeEventListener('click', handleNextClick);
          prev.removeEventListener('click', handlePrevClick);
        };
      }, []);
     
  return (
    <main style={{backgroundColor: '#d38825'}}>
    <TopNav></TopNav>


    <section className="hero-section d-flex justify-content-center align-items-center" id="section_1">

        <div className="container">
            <div className="row align-items-center">

                <div className="col-lg-6 col-12 mx-auto">
                    <em className="small-text">welcome to RaT Social</em>
                    
                    <h1>RaT</h1>

                    <p className="text-white mb-4 pb-lg-2">
                        Your <em>review</em> product daily lives.
                    </p>

                    <a className="btn custom-btn custom-border-btn smoothscroll me-3" id='prev' style={{color: '#c2812d'}}>
                        Previous
                    </a>

                    <a className="btn custom-btn smoothscroll me-2 mb-2" id='next'><strong style={{color: 'white'}}>Next</strong></a>
                </div>

            </div>
        </div>

        <div className="hero-slides">
        <div className="item" style={{backgroundImage: "url(https://www.wineport.ie/wp-content/uploads/2023/12/Wineport-new-web-pics-1920-x-1020-2.jpg)",backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
               
            </div>
            <div className="item" style={{backgroundImage: "url(https://befoodnv.be/static/uploads-cms2/home-banner-befood-1800-def.jpg)",backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
               
            </div>
            <div className="item" style={{backgroundImage: "url(https://www.cato.org/sites/cato.org/files/styles/optimized/public/2023-11/fast-fashion2.jpeg?itok=qCMa7eGV)",backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
       
            </div>
            <div className="item" style={{backgroundImage: "url(https://wpvip.edutopia.org/wp-content/uploads/2022/10/wolgawron-169hero-service-istock.jpg?w=2880&quality=85)",backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
  
            </div>
            <div className="item" style={{backgroundImage: "url(https://i.ibb.co/jTQfmTq/img5.jpg)", backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
      
            </div>
            <div className="item" style= {{backgroundImage: "url(https://i.ibb.co/RNkk6L0/img6.jpg)",backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
            </div>
        </div>
    </section>


    <section className="about-section section-padding" id="section_2">
        <div className="section-overlay"></div>
        <div className="container">
            <div className="row align-items-center">

                <div className="col-lg-6 col-12">
                    <div className="ratio ratio-1x1">
                        <video autoplay="" loop="" muted="" className="custom-video" poster="">
                            <source src={videoIntro}type="video/mp4"/>

                            Your browser does not support the video tag.
                        </video>

                        <div className="about-video-info d-flex flex-column">
                            <h4 className="mt-auto">We Started Since 2024.</h4>

                            <h4>Best chose the social for product reviews.</h4>
                        </div>
                    </div>
                </div>

                <div className="col-lg-5 col-12 mt-4 mt-lg-0 mx-auto">
                    <em className="text-white">Rat.com</em>

                    <h2 className="text-white mb-3">Rat review Anything</h2>

                    <p className="text-white">RaT social network or Review Anything was built by developer Duy Trinh with ExpressJS for Backend and ReactJS for Frontend. </p>

                    <p className="text-white">Most of the UI is built on Boostrap 5. Thanks for seen.</p>

                    <a href="https://github.com/trinhduy444?tab=repositories" target="_blank" className="smoothscroll btn custom-btn custom-border-btn mt-3 mb-4">My Github</a>
                </div>

            </div>
        </div>
    </section>



    <section className="reviews-section section-padding section-bg" id="section_4">
        <div className="container">
            <div className="row justify-content-center">

                <div className="col-lg-12 col-12 text-center mb-4 pb-lg-2">
                    <em className="text-white">The Most popular bloggers</em>

                    <h2 className="text-white">RaT Social</h2>
                </div>

                <div className="timeline">
                    <div className="timeline-container timeline-container-left">
                        <div className="timeline-content">
                            <div className="reviews-block">
                                <div className="reviews-block-image-wrap d-flex align-items-center">
                                    <div className="">
                                        <h6 className="text-white mb-0">duy.0119</h6>
                                        <em className="text-white"> Bloger fav</em>
                                    </div>
                                </div>

                                <div className="reviews-block-info">
                                    <p>Trịnh Trường Duy hay còn được biết đến là duy.0119, là một blogger nỗi tiếng trong lĩnh vực ăn uống.</p>

                                    <div className="d-flex border-top pt-3 mt-4">
                                        <strong className="text-white">4.5 <small className="ms-2">Rating</small></strong>

                                        <div className="reviews-group ms-auto">
                                            <i className="bi-star-fill"></i>
                                            <i className="bi-star-fill"></i>
                                            <i className="bi-star-fill"></i>
                                            <i className="bi-star-fill"></i>
                                            <i className="bi-star"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="timeline-container timeline-container-right">
                        <div className="timeline-content">
                            <div className="reviews-block">
                                <div className="reviews-block-image-wrap d-flex align-items-center">

                                    <div className="">
                                        <h6 className="text-white mb-0">hieu222</h6>
                                        <em className="text-white"> Bloger bike fav</em>
                                    </div>
                                </div>

                                <div className="reviews-block-info">
                                    <p>Trần Trung Hiếu hay còn được biết đến là hieu222, là một blogger nỗi tiếng trong lĩnh vực xe cộ.</p>

                                    <div className="d-flex border-top pt-3 mt-4">
                                        <strong className="text-white">4.5 <small className="ms-2">Rating</small></strong>

                                        <div className="reviews-group ms-auto">
                                            <i className="bi-star-fill"></i>
                                            <i className="bi-star-fill"></i>
                                            <i className="bi-star-fill"></i>
                                            <i className="bi-star-fill"></i>
                                            <i className="bi-star"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="timeline-container timeline-container-left">
                        <div className="timeline-content">
                            <div className="reviews-block">
                                <div className="reviews-block-image-wrap d-flex align-items-center">

                                    <div className="">
                                        <h6 className="text-white mb-0">phongbabaotap</h6>
                                        <em className="text-white"> Bloger have the most like</em>
                                    </div>
                                </div>

                                <div className="reviews-block-info">
                                    <p>Trần Phong hay còn được biết tới là phongbabaotap, là blogger sở hữu bài đăng nhiều tương tác nhất.</p>

                                    <div className="d-flex border-top pt-3 mt-4">
                                        <strong className="text-white">4.5 <small className="ms-2">Rating</small></strong>

                                        <div className="reviews-group ms-auto">
                                            <i className="bi-star-fill"></i>
                                            <i className="bi-star-fill"></i>
                                            <i className="bi-star-fill"></i>
                                            <i className="bi-star-fill"></i>
                                            <i className="bi-star"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>


    <section className="contact-section section-padding" id="section_5">
        <div className="container">
            <div className="row">   

                <div className="col-lg-12 col-12">
                    <em className="text-white">Say Hello</em>
                    <h2 className="text-white mb-4 pb-lg-2">Contact</h2>
                </div>

                <div className="col-lg-6 col-12">
                    <form action="#" method="post" className="custom-form contact-form" role="form">

                    <div className="row">
                        
                        <div className="col-lg-6 col-12">
                            <label for="name" className="form-label">Name <sup className="text-danger">*</sup></label>

                            <input type="text" name="name" id="name" className="form-control" placeholder="Jackson" required=""/>
                        </div>

                        <div className="col-lg-6 col-12">
                            <label for="email" className="form-label">Email Address</label>

                            <input type="email" name="email" id="email" pattern="[^ @]*@[^ @]*" className="form-control" placeholder="Jack@gmail.com" required=""/>
                        </div>

                        <div className="col-12">
                            <label for="message" className="form-label">How can we help?</label>

                            <textarea name="message" rows="4" className="form-control" id="message" placeholder="Message" required=""></textarea>
                            
                        </div>
                    </div>

                    <div className="col-lg-5 col-12 mx-auto mt-3">
                        <button type="submit" className="form-control">Send Message</button>
                    </div>
                </form>
                </div>

                <div className="col-lg-6 col-12 mx-auto mt-5 mt-lg-0 ps-lg-5">
                    <iframe className="google-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5039.668141741662!2d72.81814769288509!3d19.043340656729775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c994f34a7355%3A0x2680d63a6f7e33c2!2sLover%20Point!5e1!3m2!1sen!2sth!4v1692722771770!5m2!1sen!2sth" width="100%" height="300" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>  
                </div>

            </div>
        </div>
    </section>


    <footer className="site-footer">
        <div className="container">
            <div className="row">

                <div className="col-lg-4 col-12 me-auto">
                    <em className="text-white d-block mb-4">Where to find us?</em>

                    <strong className="text-white">
                        <i className="bi-geo-alt me-2"></i>
                        Ton Duc Thang University, TP Ho Chi Minh, Viet Nam
                    </strong>

                    <ul className="social-icon mt-4">
                        <li className="social-icon-item">
                            <a href="https://www.facebook.com/truongduy119" target="_blank" className="social-icon-link bi-facebook">
                            </a>
                        </li>

                        <li className="social-icon-item">
                            <a href="https://leetcode.com/trinhduy444/" target="_new" className="social-icon-link bi-bezier2">
                            </a>
                        </li>

                        <li className="social-icon-item">
                            <a href="https://www.linkedin.com/in/trinhduy444/" target="_blank" className="social-icon-link bi-linkedin">
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="col-lg-3 col-12 mt-4 mb-3 mt-lg-0 mb-lg-0">
                    <em className="text-white d-block mb-4">Contact</em>

                    <p className="d-flex mb-1">
                        <strong className="me-2">Phone:</strong>
                        <a href="tel: 305-240-9671" className="site-footer-link">
                            (+84) 
                            344 5116 07
                        </a>
                    </p>

                    <p className="d-flex">
                        <strong className="me-2">Email:</strong>

                        <a href="mailto:trinhduy444@gmail.com" className="site-footer-link">
                            trinhduy444@gmail.com
                        </a>
                    </p>
                </div>


                <div className="col-lg-5 col-12">
                    <em className="text-white d-block mb-4">Working Hours.</em>

                    <ul className="opening-hours-list">
                        <li className="d-flex">
                            Wake up
                            <span className="underline"></span>

                            <strong>7:00 - 8:00</strong>
                        </li>

                        <li className="d-flex">
                            Study Chinese
                            <span className="underline"></span>

                            <strong>18:00 - 20:30</strong>
                        </li>

                        <li className="d-flex">
                            Coding Time
                            <span className="underline"></span>

                            <strong>21:00 - Tired</strong>
                        </li>
                    </ul>
                </div>

                <div className="col-lg-8 col-12 mt-4">
                    <p className="copyright-text mb-0">Copyright © RaT Socail 2024
                    </p>
                </div>
        </div>
        </div>
    </footer>
</main>

  );
};


