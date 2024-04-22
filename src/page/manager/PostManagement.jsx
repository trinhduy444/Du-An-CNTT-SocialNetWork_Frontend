import React, { useEffect, useState } from 'react';
import "../../assets/css/style.css"
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { adminService } from '../../service/adminService';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import sweetalert2
import { Nav } from '../../component/Nav';
import { Header } from '../../component/Header';
import {formartDay} from '../../utils/formartDay.js';
import {BASE_URL} from '../../config/axiosConfig.js';
import { Modal, Button } from 'react-bootstrap';
import avtDefault from '../../public/images/user.png';
import { useSelector } from 'react-redux';
import logo from '../../public/images/logo_RaT.png'

export const PostManagement = () => {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const { status, pageNumber } = useParams();
    const [postIdChose,setPostIdChose] = useState(null);
    const [postStatusChose,setPostStatusChose] = useState('');

    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const currentPage = parseInt(searchParams.get('page')) || 1;
        setPage(currentPage);
    }, [location.search]);
    useEffect(() => {
        const fetchposts = async () => {
            try {
                const limit = 7;
                const skip = (page - 1) * limit;
                if (status !== 'all') {
                    const allposts = await adminService.getAllPostByStatus({ limit, skip, status });
                    setPosts(allposts.metadata);
                    return;
                }
                else {
                    const allposts = await adminService.getAllPost({ limit, skip });
                    setPosts(allposts.metadata);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchposts();
    }, [status, pageNumber]);

    const handleNextPage = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        navigate(`/postManagement/${status}/page=${nextPage}`);
    };

    const handlePreviousPage = () => {
        const previousPage = Math.max(page - 1, 1);
        setPage(previousPage);
        navigate(`/postManagement/${status}/page=${previousPage}`);
    };
    const handleStatusChange = (event) => {
        navigate(`/postManagement/${event.target.value}/page=1`);
    };
    const handleDeletePost = async (postId) => {
        console.log(`Delete post ${postId}`);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    console.log(`Delete post ${postId}`);
                    const response = await adminService.deletePost(postId);
                    if (response.statusCode === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Xóa bài viết thành công',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        const newPosts = posts.filter(post => post._id !== postId);
                        setPosts(newPosts);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        });
    }
    const handleViewPost = (post) => {
        setPostIdChose(post._id);
        // console.log(post.status);
        setPostStatusChose(post.status);
        setSelectedPost(post);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setPostIdChose(null);
        setPostStatusChose(null);
        setSelectedPost(null);
        setShowModal(false);
    };
    const handleApprovePost = async (postId) => {
        Swal.fire({
            title: 'Bạn có chắc duyệt bài viết này?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Duyệt!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await adminService.acceptPost(postId);
                    if (response.statusCode === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Duyệt bài viết thành công',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        handleCloseModal()
                        const newPosts = posts.filter(post => post._id !== postId);
                        setPosts(newPosts);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        });
    }
    const handleRejectPost = async (postId) => {
        Swal.fire({
            title: 'Bạn có chắc ẩn bài viết này?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ẩn!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await adminService.rejectPost(postId);
                    if (response.statusCode === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Ẩn bài viết thành công',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        handleCloseModal()
                        const newPosts = posts.filter(post => post._id !== postId);
                        setPosts(newPosts);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        });
    }

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

                </div>
            </div>
            <ul className="nav nav-tabs mt-4 overflow-x border-0">
                <li className="nav-item ">
                    <a href="/postManagement/all/page=1" className="nav-link active">All Posts</a>
                </li>
                <li className="nav-item">
                    <a href="analysisPost" className="nav-link font-regular" id="analysisLink">Analysis</a>
                </li>
            </ul>
        </div>
    </header>
        <select className="form-select" name="selectStatus" id="selectStatus" value={status} onChange={handleStatusChange}>
            <option value="all" selected>All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
        </select>
        <main className="py-6 bg-surface-secondary">
            <div className="container-fluid main-container">
                
                <div className="card shadow border-0 mb-7">
                    <div className="card-header">
                        <h5 className="mb-0">DANH SÁCH BÀI ĐĂNG</h5>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover table-nowrap">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Type</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Creator</th>
                                    <th scope="col">Ngày đăng</th>
                                    <th scope="col">Like</th>
                                    <th scope="col">Dislike</th>
                                    <th scope="col">Comment</th>
                                    <th scope="col">Address/Website</th>
                                    <th scope="col">Trạng thái</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {posts.map(post => (
                                <tr key={post._id}>
                                    <td>{post.type_post_id.name}</td>
                                    <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {post.title}
                                    </td>
                                    <td>{post.username}</td>
                                    <td>{formartDay.formartDayUp(post.createdAt)}</td>
                                    <td>{post.likeCount}</td>
                                    <td>{post.dislikeCount}</td>
                                    <td>{post.commentsCount}</td>
                                    <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {post.address || post.website}
                                    </td>

                                    <td>{post.status}</td>
                                     <td className="text-end">
                                        <button  onClick={() => handleViewPost(post)}  className="btn btn-sm btn-neutral">View</button>
                                        <button type="button" onClick={() => handleDeletePost(post._id)}  className="btn btn-sm btn-square btn-neutral text-danger-hover">
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <Modal show={showModal} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>{selectedPost?.title}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <i>Người đăng: <strong>{selectedPost?.username}</strong></i>
                                <p>Content: <i>{selectedPost?.content}</i></p>
                                <b>Detail: "
                                    {selectedPost && (selectedPost.address || selectedPost.website) ? (
                                        <a href={selectedPost.website ? selectedPost.website : selectedPost.address} target="_blank" rel="noopener noreferrer">
                                            {selectedPost.website ? selectedPost.website : selectedPost.address}
                                        </a>
                                    ) : (
                                        "N/A"
                                    )}
                                    "
                                </b>
                                {selectedPost && selectedPost.image && (
                                    <div>
                                        {selectedPost.image.length === 1 ? (
                                            <img src={`${BASE_URL}/post/displayFile/${selectedPost.image[0]}`} alt="Ảnh của bài viết" />
                                        ) : (
                                            selectedPost.image.map((img, index) => (
                                                index % 2 === 0 ? (
                                                    <div className="row mb-3" key={index}>
                                                        <div className="col">
                                                            <img src={`${BASE_URL}/post/displayFile/${img}`} alt={`Ảnh ${index + 1} của bài viết`} />
                                                        </div>
                                                        {index + 1 < selectedPost.image.length && (
                                                            <div className="col">
                                                                <img src={`${BASE_URL}/post/displayFile/${selectedPost.image[index + 1]}`} alt={`Ảnh ${index + 2} của bài viết`} />
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : null
                                            ))
                                        )}
                                    </div>
                                )}



                            </Modal.Body>
                            <Modal.Footer className="d-flex justify-content-between">
                            {postStatusChose === 'pending' || postStatusChose === 'rejected' ? (
                                    <Button variant="success" onClick={() => handleApprovePost(postIdChose)}>
                                        Approve
                                    </Button>
                                ) : (
                                    <Button variant="warning" onClick={() => handleRejectPost(postIdChose)}>
                                        Reject
                                    </Button>
                                )}

                                <Button variant="danger"  onClick={() => handleDeletePost(postIdChose)}>
                                    Delete
                                </Button>
                                <Button variant="secondary" onClick={handleCloseModal}>
                                    Close
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


