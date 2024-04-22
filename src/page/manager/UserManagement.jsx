import React, { useEffect, useState } from 'react';
import "../../assets/css/style.css"
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { adminService } from '../../service/adminService';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import sweetalert2
import { Nav } from '../../component/Nav';
import {formartDay} from '../../utils/formartDay.js';
import {BASE_URL} from '../../config/axiosConfig.js';
import avtDefault from '../../public/images/user.png';
import { useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import logo from '../../public/images/logo_RaT.png'

export const UserManagement = () => {
    const navigate = useNavigate();
    const adminInfo = useSelector((state) => state.auth);

    console.log(adminInfo.isAdminLoggedIn);
    const [showModal, setShowModal] = useState(false);
    const [showModalCreateAdmin, setShowModalCreateAdmin] = useState(false);
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const { pageNumber } = useParams();
    const location = useLocation();
    const [selectedUser, setSelectedUser] = useState(null);
    const [adminData, setAdminData] = useState({
        username: '',
        email: '',
        password: '',
        phone_number: ''
    });
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const currentPage = parseInt(searchParams.get('page')) || 1;
        setPage(currentPage);
    }, [location.search]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const limit = 7;
                const skip = (page - 1) * limit;
                const allUsers = await adminService.getAllUser({ limit, skip });
                setUsers(allUsers.metadata);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, [page, pageNumber]); 

    const handleNextPage = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        navigate(`/userManagement/page=${nextPage}`);
    };

    const handlePreviousPage = () => {
        const previousPage = Math.max(page - 1, 1);
        setPage(previousPage);
        navigate(`/userManagement/page=${previousPage}`);
    };


    const showSweetAlert = (userId) => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Deleted!',
              'Record has been successfully deleted.',
              'success'
            )
          }
        });
      };
    

    const hanldeViewUser = (user) => {
        setShowModal(true);
        setSelectedUser(user);
    };
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdminData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleModalCreateAdmin = () => {
        setShowModalCreateAdmin(true);
    }
    const handleCloseModalCreateAdmin = () => {
        setShowModalCreateAdmin(false);
        setAdminData(prevState => ({...prevState, username: '', email: '', password: '', phone_number: ''}));
    }
    const handleSubmitModalCreateAdmin = async () => {
        
        try {
            const response = await adminService.createAdmin(adminData);
            console.log(response);
            if(response.message){
                Swal.fire({
                    icon: 'success',
                    title: `Tạo Admin Account thành công`,
                    showConfirmButton: false,
                    timer: 1500
                });
                setShowModalCreateAdmin(false);
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: `Tạo Admin Account thất bại`,
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
    };

  return (
    
    <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
    <Nav/>
    <div className="h-screen flex-grow-1 overflow-y-lg-auto">
    <header className="bg-surface-primary border-bottom pt-6">
        <div className="container-fluid">
            <div className="mb-npx">
                <div className="row align-items-center">
                    <div className="col-sm-6 col-12 mb-4 mb-sm-0">
                        <h1 className="h2 mb-0 ls-tight">
                            <img src={logo} width="40" className="rounded-circle"/>PRODUCT REVIEW - ADMIN DASHBOARD</h1>
                    </div>
                    <div class="col-sm-6 col-12 text-sm-end">
                            <div class="mx-n1">
                                <a href="#" class="btn d-inline-flex btn-sm btn-primary mx-1">
                                    <span class=" pe-2">
                                        <i class="bi bi-plus"></i>
                                    </span>
                                    <span>Create user</span>
                                </a>
                                <a href="#" class="btn d-inline-flex btn-sm btn-warning mx-1" onClick={() => handleModalCreateAdmin()}>
                                    <span class=" pe-2">
                                        <i class="bi bi-plus"></i>
                                    </span>
                                    <span>Create admin</span>
                                </a>
                            </div>
                        </div>
                </div>
            </div>
            <ul className="nav nav-tabs mt-4 overflow-x border-0">
                <li className="nav-item ">
                    <a href="/userManagement/page=1" className="nav-link active">All Users</a>
                </li>
                <li className="nav-item">
                    <a href="analysisUser" className="nav-link font-regular" id="analysisLink">Analysis</a>
                </li>
            </ul>
        </div>
    </header>
        <main className="py-6 bg-surface-secondary">
            <div className="container-fluid main-container">
                
                <div className="card shadow border-0 mb-7">
                    <div className="card-header">
                        <h5 className="mb-0">DANH SÁCH NGƯỜI DÙNG</h5>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover table-nowrap">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Avatar</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Surname</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Phone number</th>
                                    <th scope="col">Ngày sinh</th>
                                    <th scope="col">Ngày tạo tài khoản</th>
                                    <th scope="col">Số bài đăng</th>
                                    <th scope="col">Số lần vi phạm</th>
                                    <th scope="col">Trạng thái</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                     <td>
                                        {user.avatar ? (
                                            <img alt="Avatar" src={`${BASE_URL}/user/getAvatarByName/${user.avatar}`} className="avatar avatar-sm rounded-circle me-2" />
                                        ) : (
                                            <img alt="Default Avatar" src={avtDefault} className="avatar avatar-sm rounded-circle me-2" />
                                        )}
                                        <span className="text-heading font-semibold">{user.firstName}</span>
                                    </td>
                                    <td>{user.username}</td>
                                    <td>{user.surname}</td>
                                    <td>{user.permission}</td>
                                    <td>{user.phone_number}</td>
                                    <td>{formartDay.formartDayUp(user.birthday)}</td>

                                    <td>{formartDay.formartDayUp(user.createdAt)}</td>
                                    {/* <td>{user.lastLogin}</td> */}
                                    <td>{user.postCount}</td>
                                    <td>0</td>
                                    <td>{user.status}</td>
                                     <td className="text-end">
                                        <button href="#" onClick={() => hanldeViewUser(user)} className="btn btn-sm btn-neutral">View</button>
                                        <button type="button" onClick={() => showSweetAlert(user._id)} className="btn btn-sm btn-square btn-neutral text-danger-hover">
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <Modal show={showModal} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>{selectedUser?.username} | <a href={`/viewProfile/${selectedUser?._id}`} target="_blank">View Profile</a></Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="flex-column-reverse">
                                    <div>
                                        <img src={`${BASE_URL}/user/getAvatarByName/${selectedUser?.avatar}`} alt="user-avatar" style={{ width: "100%" }} />
                                    </div>
                                    <div>
                                        <p><strong>Role:</strong> {selectedUser?.permission}</p>
                                        <p><strong>Email:</strong> {selectedUser?.email}</p>
                                        <p><strong>Phone:</strong> {selectedUser?.phone_number}</p>
                                        <p><strong>Birthday:</strong> {formartDay.formartDayUp(selectedUser?.birthday)}</p>
                                        <p><strong>Post count:</strong> {selectedUser?.postCount}</p>
                                        <p><strong>Violation count:</strong> 0</p>
                                        <p><strong>Status:</strong> {selectedUser?.status}</p>
                                        <p><strong>Day create account:</strong> {formartDay.formartDayUp(selectedUser?.createdAt)}</p>
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                 
                                <Button variant="secondary" onClick={handleCloseModal}>
                                    Close
                                </Button>
                                
                            </Modal.Footer>
                        </Modal>
                        <Modal show={showModalCreateAdmin} onHide={handleCloseModalCreateAdmin}>
            <Modal.Header closeButton>
                <Modal.Title>Tạo admin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="flex-column-reverse">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            placeholder="Enter username"
                            value={adminData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            value={adminData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={adminData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone_number">Phone Number</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phone_number"
                            name="phone_number"
                            placeholder="Enter phone number"
                            value={adminData.phone_number}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModalCreateAdmin}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmitModalCreateAdmin}>
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
                    </div>
                    <div className="text-center mt-4">
                <button className="btn btn-primary me-2" onClick={handlePreviousPage}>Previous</button>
                <span>Page {page} </span>
                <button className="btn btn-primary" onClick={ handleNextPage}>Next</button>
            </div>
                </div>
                
            </div>
        </main>
        
    </div>
</div>
  );
};


