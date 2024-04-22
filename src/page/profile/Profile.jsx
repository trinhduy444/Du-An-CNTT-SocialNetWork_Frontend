import React, { useEffect, useState } from 'react';
import { TopNav } from '../../component/TopNav.jsx';
// import { Footer } from '../../component/Footer.jsx';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { profileService } from '../../service/profileService.js';
import user from '../../public/images/user.png';
import {BASE_URL} from '../../config/axiosConfig.js';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { authService } from '../../service/authService.js';

export const Profile = () => {
    const navigate = useNavigate();
    const profileData = useSelector((state) => state.profileData);
    const [message, setMessage] = useState({ type: '', content: '' });
    const [selectedFile, setSelectedFile] = useState(null);
    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatNewPassword, setRepeatNewPassword] = useState('');
    const [showModal, setShowModal] = useState(false);

    let fortmatBirthday= '';

    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    if(profileData){

        if(profileData.data.birthday){        
        const birthdayDate = new Date(profileData.data.birthday);
        const day = birthdayDate.getDate();
        const month = birthdayDate.getMonth() + 1; 
        const year = birthdayDate.getFullYear();
    
        fortmatBirthday = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
        }
        if(profileData.data.avatar){
            profileData.data.avatar = `${BASE_URL}/user/getAvatarByName/${profileData.data.avatar}`;
        }
    }
 
    const handleCancel = () => {
        Swal.fire({
            title: 'Bạn có chắc muốn thoát?',
            text: "Chúng tôi sẽ chuyển hướng bạn tới trang chủ!",
            icon: 'question',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Thoát'
        }).then(async (result) => {
            if (result.isConfirmed) {
                navigate('/');
            }
        })
    }
    const handleToggleForm = () => {
        setShowModal(true);

    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    const handleChangePassword = async (e) => {
        //them cho tôi sự kiện submit
        Swal.fire({
            title: 'Bạn có chắc muốn lưu mật khẩu mới?',
            text: "Dữ liệu sẽ được cập nhật!",
            icon: 'question',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Lưu'
        }).then(async (result) => {
            if (result.isConfirmed) {
                e.preventDefault();

                if (newPassword !== repeatNewPassword) {
                    Swal.fire({
                        icon: "error",
                        title: "Password do not match",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    return;
                }
                try {
                    // console.log(oldPassword,newPassword,repeatNewPassword);
                    const respon = await authService.changePassword(oldPassword, newPassword, repeatNewPassword);
                    // console.log(respon);
                    if(respon.statusCode === 200){
                        Swal.fire({
                            icon: "success",
                            title: respon.message,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        handleCloseModal();
                    }
                    else{
               
                        Swal.fire({
                            icon: "error",
                            title: "Something went wrong",
                            showConfirmButton: false,
                            timer: 2000
                        });
                        window.location.reload();
                    
                    }

                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: error.message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
        }});  
    };

    const validPhone= (phone_number)=>{
        const regex = /^\d{10}$/;
        return regex.test(phone_number);
        
    }
    const handleSave =  async (e) => {
        e.preventDefault();
        const inputUsername = document.getElementById('inputUsername');
        const inputSurname = document.getElementById('inputSurname');
        const inputPhone = document.getElementById('inputPhone');
        const inputBirthday = document.getElementById('inputBirthday');
        Swal.fire({

            title: 'Bạn có chắc muốn lưu?',
            text: "Dữ liệu sẽ được cập nhật!",
            icon: 'question',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Lưu'
        }).then(async (result) => {
            if(result.isConfirmed){
    
                const newProfileData = {
                    username: inputUsername.value,
                    surname: inputSurname.value,
                    phone_number: inputPhone.value,
                    birthday: inputBirthday.value,
                }
                if(selectedFile){
                    if (selectedFile.type === 'image/png' || selectedFile.type === 'image/jpeg') {
                        const avatarFormData = new FormData();
                        avatarFormData.append('avatar', selectedFile);
                        await profileService.updateAvatar(avatarFormData);
                    }
                    else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Vui lòng chọn file ảnh',
                            showConfirmButton: false,
                            timer: 1500
                        });                        
                        return;
                    }
                }
                const response = await profileService.updateProfile(newProfileData); 
                if (response.statusCode === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: response.message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lưu thông tin mới thất bại',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }});
    }
    return(
        <body>
            <TopNav />
            {profileData ? (
                
                 <div className="container-xl px-4 mt-4">

                 <hr className="mt-0 mb-4"/>
                 <div className="row">
                 <div className="col-xl-4">
     
                 <div className="card mb-4 mb-xl-0">
                 <div className="card-header">Profile Avatar</div>
                 <div className="card-body text-center">
     
                 {profileData.data.avatar ? (
                <img className="img-account-profile rounded-circle mb-2" src={profileData.data.avatar} style= {{height: '15rem'}}alt="User avatar" />
                ) : (
                    <img className="img-account-profile rounded-circle mb-2" src={user} style= {{height: '15rem'}} alt="" />
                )}
     
                 <div className="small font-italic text-muted mb-4"></div>
     
                 <div className="mb-3">
                    <label htmlFor ="formFileAvatar" className="form-label">Change your avatar(png/jpg)</label>
                    <input className="form-control" type="file" id="formFileAvatar"  onChange={handleFileChange}/>
                    </div>
                 </div>
                 </div>
                 </div>
                 <div className="col-xl-8">
     
                 <div className="card mb-4">
                 <div className="card-header">Profile Details</div>
                 <div className="card-body">
                 <form  onSubmit={handleSave}>
     
                 <div className="mb-3">
                 <label className="small mb-1" htmlFor ="inputUsername">Username (how your name will appear to other users on the site)</label>
                 <input className="form-control" id="inputUsername" type="text" defaultValue={profileData.data.username}  required/>
                 </div>
     
                 <div className="row gx-3 mb-3">
     
                 <div className="col-md-6">
                 <label className="small mb-1" htmlFor ="inputSurname">Surname</label>
                 <input className="form-control" id="inputSurname" type="text"  defaultValue={profileData.data.surname}/>
                 </div>
     
                 <div className="col-md-6">
                 <label className="small mb-1" htmlFor ="inputStatus">Status</label>
                 <select className="form-select" aria-label="Default select example" defaultValue={profileData.data.status}>
                    <option defaultValue="active">Active</option>
                    <option defaultValue="inactive">Inactive</option>
                </select>                 
                </div>
                 </div>
     
       
     
                 <div className="mb-3">
                 <label className="small mb-1" htmlFor ="labelEmail">Email address (Can't change)</label>
                 <label className="form-control" id="labelEmail" >{profileData.data.email}</label>
                 </div>
     
                 <div className="row gx-3 mb-3">
     
                 <div className="col-md-6">
                 <label className="small mb-1" htmlFor ="inputPhone">Phone number</label>
                 <input className="form-control" id="inputPhone" type="tel"  defaultValue={profileData.data.phone_number} required/>
                 </div>
     
                    <div className="col-md-6">
                        <label className="small mb-1" htmlFor ="inputBirthday">Birthday</label>
                        <input className="form-control" id="inputBirthday" type="date" name="birthday" defaultValue={fortmatBirthday} />
                    </div>
                    </div>
     
                    <div className="d-flex justify-content-between">
                        <div>
                            <button className="btn btn-primary mr-2" type="submit" id="btnSave">Save changes</button>
                            <button className="btn btn-secondary mr-2" type="button" onClick={handleCancel}>Cancel</button>
                        </div>
                        <button className="btn btn-info" type="button" id="btnChangePassWword"onClick={handleToggleForm}>Change Password</button>
                        
                    </div>


                    </form>
                    
                    </div>
                </div>
                <Modal show={showModal} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Change Password</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="oldPassword">Old Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="oldPassword"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="newPassword">New Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="repeatNewPassword">Repeat New Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="repeatNewPassword"
                                        value={repeatNewPassword}
                                        onChange={(e) => setRepeatNewPassword(e.target.value)}
                                    />
                                </div>
                            </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseModal}>
                                    Close
                                </Button>
                                <Button variant="primary" type='submit' onClick={handleChangePassword}> Submit </Button>
                            </Modal.Footer>
                        </Modal>
                </div>
                 </div>
                 </div>
            ) : ( <p>Loading...</p>)}
           
            </body>    
        );
    
}