import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {authService}  from '../../service/authService';
import Swal from 'sweetalert2';

//rafc

export const ResetPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleReset = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: "Mật khẩu không khớp nhau!",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        }
        try {
            const token = window.location.pathname.split('/')[2];
            await authService.resetPassword(token,password, confirmPassword);
            Swal.fire({
                icon: 'success',
                title: 'Mật khẩu đã được reset thành công!',
                showConfirmButton: false,
                timer: 1500
            });
            setTimeout(() => {
                navigate('/login');
            }, 3000);
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
        <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <form onSubmit={handleReset}>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordConfirm">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="passwordConfirm"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
            
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>
    )
};


