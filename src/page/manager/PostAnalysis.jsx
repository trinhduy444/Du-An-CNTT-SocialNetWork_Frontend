import React, { useEffect, useState } from 'react';
import "../../assets/css/style.css"
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { adminService } from '../../service/adminService';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import sweetalert2
import { Nav } from '../../component/Nav';
import logo from '../../public/images/logo_RaT.png'
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns'; 
export const PostAnalysis = () => {
    
    let postData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October','November', 'December'],
        datasets: [{
          label: 'Post Statistics',
          backgroundColor: 'rgba(46, 138, 138, 0.3)',
          borderColor: 'rgba(46, 138, 138, 0.3)',
          borderWidth: 1,
          data: [0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0]
        }]
    };
    useEffect( async () => {
        const ctx = document.getElementById('postChart').getContext('2d');
        const myChart = new Chart(ctx, {
          type: 'bar',
          data: postData,
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
    
        const handleDayClick = async () => {
            const response = await adminService.countPostByDay();
            // console.log(response.metadata);
        
            const labels = response.metadata.map(item => item.day);
            const data = response.metadata.map(item => item.count);
        
            myChart.data.labels = labels;
            myChart.data.datasets[0].data = data;
            myChart.update();
        };
        
    
        const handleWeekClick = async () => {
            const response = await adminService.countPostByWeek();
        
            
            const labels = response.metadata.map(item => item.week);
            const data = response.metadata.map(item => item.count); 
    
            myChart.data.labels = labels;
            myChart.data.datasets[0].data = data;
            myChart.update();
        };
        
    
        const handleMonthClick = async () => {
            const response = await adminService.countPostByMonth();
            
            const data = response.metadata.map(item => item.count); 
    
        
            myChart.data.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October','November', 'December'];
            myChart.data.datasets[0].data = data;
            myChart.update();
        };
    
        // Đăng ký các event listener
        document.getElementById('dayBtn').addEventListener('click', handleDayClick);
        document.getElementById('weekBtn').addEventListener('click', handleWeekClick);
        document.getElementById('monthBtn').addEventListener('click', handleMonthClick);
    
        return () => {
          document.getElementById('dayBtn').removeEventListener('click', handleDayClick);
          document.getElementById('weekBtn').removeEventListener('click', handleWeekClick);
          document.getElementById('monthBtn').removeEventListener('click', handleMonthClick);
        };
      }, [postData]);

     return (
        <div className="d-flex flex-column flex-lg-row h-lg-full bg-surface-secondary">
            <Nav/>
            <div class="h-screen flex-grow-1 overflow-y-lg-auto">
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
                                    <span>Create post</span>
                                </a>
                                <a href="#" class="btn d-inline-flex btn-sm btn-warning mx-1">
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
                    <a href="/postManagement/all/page=1" className="nav-link font-regular">All Users</a>
                </li>
                <li className="nav-item">
                    <a href="analysisPost" className="nav-link active" id="analysisLink">Analysis</a>
                </li>
            </ul>
        </div>
    </header>
        <main class="py-6 bg-surface-secondary">
            <div class="container">
                <div class="row">
                    <div class="container mt-1">
                        <div class="card card-sm">
                            <div class="card-header">
                            Biểu đồ số lượng bài đăng hệ thống
                            </div>
                            <div class="card-body">
                            <canvas id="postChart"></canvas>
                            </div>
                            <div class="card-footer">
                            <div class="btn-group" role="group" aria-label="Date Range">
                                <button type="button" class="btn btn-secondary" id="dayBtn">Day</button>
                                <button type="button" class="btn btn-secondary" id="weekBtn">Week</button>
                                <button type="button" class="btn btn-secondary" id="monthBtn">Month</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    
                </div>
            </div>
        </main>
    </div>
        </div>
    );
};


