import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {authService}  from '../../service/authService';
//rafc

export const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleForgot = async (e) => {
        e.preventDefault();
        await authService.forgotPassword(email);
        setSubmitted(true);
    };
    const handleBack = () => {
        return navigate('/login');
    }
    return (
        <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <form onSubmit={handleForgot} className="border p-4">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Your Email Address:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <small id="emailHelp" className="form-text text-muted">
                            We'll never share your email with anyone else.
                        </small>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    {submitted && <p className="mt-2">Vui lòng kiểm tra hộp thư email của bạn.</p>}
                </form>
                <button onClick={handleBack} className="btn btn-secondary mt-2">Back</button>
            </div>
        </div>
    </div>
    )
};


