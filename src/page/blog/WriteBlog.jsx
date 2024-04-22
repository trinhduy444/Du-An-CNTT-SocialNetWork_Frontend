import React, {  useState } from 'react';
import { TopNav } from '../../component/TopNav.jsx';
import { useNavigate } from 'react-router-dom';
import { postService } from '../../service/postService.js';
import Swal from 'sweetalert2';
import writeImg from '../../public/images/writeImg.jpg';

export const WriteBlog = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState({ type: '', content: '' });

    const handleCancel = () => {
        navigate('/');
    }
    const handlePost = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure create this post?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Create'
        }).then(async (result) => {
            if (!result.isConfirmed) {
                return;
            }
            const title =document.getElementById('title').value;        
            const content =document.getElementById('content').value;
            const addressOrWebsite = document.getElementById('addressOrWebsite').value;
            const inputaddressOrWebsite = document.getElementById('inputaddressOrWebsite').value;
            const selectTypePost = document.getElementById('selectTypePost').value
            const files = e.target.files.files;
            const maxSize = 6 * 1024 * 1024;
            const maxFiles = 4;
            let videoCount = 0;
    
            if (files.length > maxFiles) {
                Swal.fire({
                    icon: 'error',
                    title: "Chỉ được phép tải lên tối đa 4 tệp.",
                    showConfirmButton: false,
                    timer: 1500
                });
                return;
            }
            const data = new FormData();
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (file.size > maxSize) {
                    Swal.fire({
                        icon: 'error',
                        title: `Tệp ${file.name} quá lớn, vui lòng chọn tệp dưới 5MB.`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    return;
                }
                if (file.type.includes("video")) {
                    videoCount++;
                    if (videoCount > 1) {
                        Swal.fire({
                            icon: 'error',
                            title: "Chỉ được phép tải lên tối đa 1 video.",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        return;
                    }
                    data.append('video', file);
                } else if (file.type.includes("image")) {
                    data.append('image', file);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: `Tệp ${file.name} không phải là hình ảnh hoặc video.`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    return;
                }
            }
    
            data.append('type_post_id',selectTypePost);
            data.append('title', title);
            data.append('content', content);
            if(inputaddressOrWebsite != null && inputaddressOrWebsite != '' && inputaddressOrWebsite != undefined){
                if(addressOrWebsite === 'address'){
                    data.append('address', inputaddressOrWebsite);
                }
                else{
                    data.append('website', inputaddressOrWebsite);
                }
            }
            try {
                await postService.createPost(data);
                Swal.fire({
                    icon: 'success',
                    title: `Đăng bài viết thành công`,
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
            } catch (err) {
                Swal.fire({
                    icon: 'error',
                    title: `Đăng bài viết thất bại`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
        
       
    }
    return (
        <body  style={{backgroundColor: '#d38825'}}>
            <main>
            <TopNav/>

                <section className="booking-section section-padding">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-10 col-12 mx-auto">
                            <div className="booking-form-wrap">
                                <div className="row">
                                    <div className="col-lg-7 col-12 p-0">
                                        <form className="custom-form booking-form" action="#" method="post" role="form"onSubmit={handlePost}> 
                                            <div className="text-center mb-4 pb-lg-2">
                                                <em className="text-white">explane your feelling with your product</em>

                                                <h2 className="text-white">Write a blog</h2>
                                            </div>

                                            <div className="booking-form-body">
                                                <div className="row">
                                                <div className="col-lg-12 col-12">
                                                    <label htmlFor="selectTypePost" className="form-label">Chọn thể loại:</label>
                                                    <select className="form-select" id="selectTypePost" required>
                                                    <option value="65cf3e459e4d222b4bf3acac">Food&Drinks</option>
                                                    <option value="65ccf7a3f4b25875addcf5a6">Fashions</option>
                                                    <option value="65cf3e4e9e4d222b4bf3acb0">Services</option>
                                                    <option value="65e4a90866f13977483fa39c">Others</option>

                                                    </select>
                                                </div>
                                                
                                                <div  className="col-lg-12 col-12">
                                                    <label htmlFor="title" className="form-label">Tiêu đề:</label>
                                                    <input type="text" className="form-control" id="title" name="title" placeholder='Nhập tiêu đề bài viết của bạn...' required/>
                                                </div>
                                                <div className="col-lg-12 col-12">
                                                    <label htmlFor="content" className="form-label">Nội dung:</label>
                                                    <textarea className="form-control" placeholder="Nhập nội dung..." id="content" name="content" rows="3" required></textarea>
                                                </div>
                                                <div  className="col-lg-12 col-12">
                                                    <label htmlFor="files" className="form-label">Hình ảnh(Tối đa 4 tệp):</label>
                                                    <input type="file" className="form-control" id="files" name="files[]" multiple required/>
                                                </div>
                                                <div  className="col-lg-12 col-12">
                                                    <label htmlFor="addressOrWebsite" className="form-label form-label-no-asterisk text-danger">Chọn nhập địa chỉ hoặc đường dẫn:</label>
                                                        <select className="form-select" id="addressOrWebsite" name="addressOrWebsite">
                                                            <option value="website">Đường dẫn website</option>
                                                            <option value="address">Địa chỉ</option>
                                                        </select>

                                                </div>
                                                <input type="text" className="form-control" id="inputaddressOrWebsite" name="inputaddressOrWebsite" placeholder='Nhập địa chỉ hoặc đường dẫn'/>
                                                <div className="row">
                                            <div className="d-flex justify-content-end">
                                                <button type="submit" className="btn btn-primary mr-2">POST</button>
                                                <button type="button" style={{marginLeft: '10px'}}className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                                            </div>
                                        </div>

                     </div>
                    </div>
                                        </form>
                                    </div>

                                    <div className="col-lg-5 col-12 p-0">
                                        <div className="booking-form-image-wrap">
                                            
                                            <img src={writeImg} className="booking-form-image img-fluid" alt="" style={{height:'938px', width: '463px'}}/>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    </div>
                </section>

            </main>

            
      
        
    
        </body>
    );
}