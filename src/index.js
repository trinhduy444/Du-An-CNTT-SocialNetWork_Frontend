import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Login } from './page/login/Login';
import { Signup } from './page/login/Signup.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './page/home/home';
import { Blog } from './page/blog/blog.jsx';
import {WriteBlog} from './page/blog/WriteBlog.jsx';
import { Profile } from './page/profile/Profile';
import {ViewProfile} from './page/profile/ViewProfile';
import{ForgotPassword} from './page/login/ForgotPassword';
import{ResetPassword} from './page/login/ResetPassword';
import {LoginAdmin} from './page/login/LoginAdmin';
import { Provider } from 'react-redux';
import {isAuthenticated} from './utils/checkAuthentication';
import {UserManagement} from './page/manager/UserManagement.jsx'
import {PostManagement} from './page/manager/PostManagement.jsx'
import { ReportManagement } from './page/manager/ReportManagement.jsx';
import {CreateAdmin} from './page/manager/CreateAdmin.jsx'
import {PageNotFound} from './component/PageNotFound.jsx';
import { UserAnalysis } from './page/manager/UserAnalysis.jsx';
import { PostAnalysis } from './page/manager/PostAnalysis.jsx';
import { ReportAnalysis } from './page/manager/ReportAnalysis.jsx';
import store from './reducers/store'
const ProtectedRoute = ({ element, ...rest }) => {
  const isLogged = isAuthenticated();
  return isLogged ? element : <Navigate to="/login" />;
};

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        {/* Các Route khác */}
        <Route path="/login" element={<Login />} />
        <Route path="/loginAdmin" element={<LoginAdmin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:category" element={<Blog />} />
        <Route path="/writeblog" element={<ProtectedRoute element={<WriteBlog />} />} />
        <Route path="/viewprofile/:userid" element={<ViewProfile />} />
        <Route path="/userManagement/page=:pageNumber" element={<ProtectedRoute element={<UserManagement />} />}/>
        <Route path="/postManagement/:status/page=:pageNumber" element={<ProtectedRoute element={<PostManagement />} />}/>
        <Route path="/reportManagement/:status/page=:pageNumber" element={<ProtectedRoute element={<ReportManagement />} />}/>
        <Route path="/userManagement/analysisUser" element={<ProtectedRoute element={<UserAnalysis />} />}/>
        <Route path="/postManagement/all/analysisPost" element={<ProtectedRoute element={<PostAnalysis />} />}/>
        <Route path="/reportManagement/all/analysisReport" element={<ProtectedRoute element={<ReportAnalysis />} />}/>
        <Route path="/createAdmin" element={<ProtectedRoute element={<CreateAdmin />} />}/>
        
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </Router>
  </Provider>
);


reportWebVitals();
