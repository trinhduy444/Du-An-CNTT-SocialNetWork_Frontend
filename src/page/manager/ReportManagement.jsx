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
import { Modal, Button } from 'react-bootstrap';
import logo from '../../public/images/logo_RaT.png'


export const ReportManagement = () => {
    const navigate = useNavigate();
    const [reports, setReports] = useState([]);
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const { status, pageNumber } = useParams();
    const location = useLocation();
    const [adminId, setAdminId] = useState(null);
    const [adminUsername, setAdminUsername] = useState(null);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const currentPage = parseInt(searchParams.get('page')) || 1;
        setPage(currentPage);
    }, [location.search]);

    useEffect(() => {
        const fetchreports = async () => {
            try {
                const limit = 7;
                const skip = (page - 1) * limit;
                if (status !== 'all') {
                    const allreports = await adminService.getAllreportByStatus({ limit, skip, status });
                    setReports(allreports.metadata);
                    return;
                }
                else {
                    const allreports = await adminService.getAllReport({ limit, skip });
                    // console.log(allreports.metadata[0].creator_id.username)
                    setReports(allreports.metadata);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchreports();
    }, [status, pageNumber]);

    const handleNextPage = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        navigate(`/reportManagement/${status}/page=${nextPage}`);
    };

    const handlePreviousPage = () => {
        const previousPage = Math.max(page - 1, 1);
        setPage(previousPage);
        navigate(`/reportManagement/${status}/page=${previousPage}`);
    };
    const handleStatusChange = (event) => {
        navigate(`/reportManagement/${event.target.value}/page=1`);
    };
    const handleDeleteReport = async (reportId) => {
        console.log(`Delete post ${reportId}`);
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
                    console.log(`Delete post ${reportId}`);
                    const response = await adminService.deleteReport(reportId);
                    if (response.statusCode === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Xóa bài Report thành công',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        const newReport = reports.filter(report => report._id !== reportId);
                        setReports(newReport);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        });
    }
    const handleViewReport = (report) => {
        // setPostStatusChose(post.status);
        
        setSelectedReport(report);      
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setSelectedReport(null);      
        setShowModal(false);
    };
    const handleSetViolation = async (reportId) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await adminService.setViolation(reportId);
                    if (response.statusCode === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Set violation thành công',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        const newReport = reports.map(report => {
                            if (report._id === reportId) {
                                return {
                                    ...report,
                                    violation: true,
                                    status: 'reviewed'
                                };
                            }
                            return report;
                        });
                        setReports(newReport);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        });
       
    }

    const handleUnViolation = async (reportId) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await adminService.unViolation(reportId);
                    if (response.statusCode === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Set Un violation thành công',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        const newReport = reports.map(report => {
                            if (report._id === reportId) {
                                return {
                                    ...report,
                                    violation: false,
                                    status: 'reviewed'
                                };
                            }
                            return report;
                        });
                        setReports(newReport);
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
                    <a href="/reportManagement/all/page=1" className="nav-link active">All Reports</a>
                </li>
                <li className="nav-item">
                    <a href="analysisReport" className="nav-link font-regular" id="analysisLink">Analysis</a>
                </li>
            </ul>
        </div>
    </header>        <select className="form-select"  name="selectStatus" id="selectStatus" value={status} onChange={handleStatusChange}>
            <option value="all" selected>All</option>
            <option value="not viewed">Not Viewed</option>
            <option value="viewed">Viewed</option>
            <option value="reviewed">Reviewed</option>
            <option value="report">From report</option>
            <option value="personal page">Personal page</option>
            <option value="comment">From Comment</option>
        </select>
        <main className="py-6 bg-surface-secondary">
            <div className="container-fluid main-container">
                
                <div className="card shadow border-0 mb-7">
                    <div className="card-header">
                        <h5 className="mb-0">DANH SÁCH REPORT</h5>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover table-nowrap">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">From</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Creator</th>
                                    <th scope="col">User Bị Report</th>
                                    <th scope="col">Administrator</th>
                                    <th scope="col">Ngày tạo</th>
                                    <th scope="col">Lần cuối chỉnh sửa</th>
                                    <th scope="col">Vi phạm</th>
                                    <th scope="col">Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {reports.map(report => (
                                <tr key={report._id}>
                                    <td>{report.report_type_id.report_from}</td>
                                    <td>{report.report_type_id.name}</td>
                                    <td>{report.creator_id.username}</td>
                                    <td>{report.reported_user_id.username}</td>
                                    {report.administrator_id ? (<td>{report.administrator_id.username}</td>
                                    ):(<td>No admin </td>
                                    )

                                    }
                                    <td>{formartDay.formartDayUp(report.createdAt)}</td>
                                    <td>{formartDay.formartDayUp(report.updateAt)}</td>
                                    {report.violation === true ? (                                    
                                        <td>Có</td>
                                    ):(                                    
                                        <td>Không</td>
                                    )}
                                    <td>{report.status}</td>
                                     <td className="text-end">
                                        <button  className="btn btn-sm btn-neutral" onClick={() => handleViewReport(report)} >View</button>
                                        <button type="button" className="btn btn-sm btn-square btn-neutral text-danger-hover" onClick={() => handleDeleteReport(report._id)}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <Modal show={showModal} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>{selectedReport?.report_type_id.name}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div key={selectedReport?._id}>
                                    <i>Người viết: <strong>{selectedReport?.creator_id.username}</strong></i>
                                    <br />
                                    <i>Người bị report: <strong>{selectedReport?.reported_user_id.username}</strong></i>
                                    <p>Report từ: {selectedReport?.report_type_id.report_from}</p>
                                    <p>Ngày tạo: {formartDay.formartDayUp(selectedReport?.createdAt)}</p>
                                    <p>Content: <i>{selectedReport?.content}</i></p>
                                    <p>Hình ảnh minh chứng vi phạm: </p>
                                    {selectedReport && selectedReport.image && (
                                    <div>
                                        {selectedReport.image.length === 1 ? (
                                            <img src={`${BASE_URL}/post/displayFile/${selectedReport.image[0]}`} alt="Ảnh của bài viết" />
                                        ) : (
                                            selectedReport.image.map((img, index) => (
                                                index % 2 === 0 ? (
                                                    <div className="row mb-3" key={index}>
                                                        <div className="col">
                                                            <img src={`${BASE_URL}/post/displayFile/${img}`} alt={`Ảnh ${index + 1} của bài viết`} />
                                                        </div>
                                                        {index + 1 < selectedReport.image.length && (
                                                            <div className="col">
                                                                <img src={`${BASE_URL}/post/displayFile/${selectedReport.image[index + 1]}`} alt={`Ảnh ${index + 2} của bài viết`} />
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : null
                                            ))
                                        )}
                                    </div>
                                )}                                    <p>Xem nội dung bị report: <a href={`/reportDoc/${selectedReport?.report_type_id.report_from}/${selectedReport?.post_id}`} target="_blank">Xem</a></p>
                                    <p>Vi phạm: <strong>{selectedReport?.violation ? 'Có' : 'Không'}</strong></p>
                                </div>
                            

                            </Modal.Body>
                            <Modal.Footer className="d-flex justify-content-between">
                                {
                                    selectedReport?.status === 'not viewed' ? ( <Button variant="info" onClick={() => handleSetViolation(selectedReport?._id)}>
                                    Set violation
                                </Button>): (
                                     <Button variant="info" onClick={() => handleUnViolation(selectedReport?._id)}>
                                     Un Violation
                                 </Button>
                                )
                                }
                               
                                <Button variant="danger" onClick={handleCloseModal}>
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


