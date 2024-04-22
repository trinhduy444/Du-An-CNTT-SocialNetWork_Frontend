import React, { useEffect, useState } from 'react';
import '../../assets/css/viewProfile.css';
import { TopNav } from '../../component/TopNav.jsx';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { profileService } from '../../service/profileService.js';
import { reportService } from '../../service/reportService.js';
import { interactionSerivce } from '../../service/interactionService.js';
import { postService } from '../../service/postService.js';
import { useParams } from 'react-router-dom';
import {formartDay} from '../../utils/formartDay.js';
import user from '../../public/images/user.png';
import {BASE_URL} from '../../config/axiosConfig.js';
import background from '../../public/images/background.png';
import Swal from 'sweetalert2';
import { Modal, Button,Form } from 'react-bootstrap';

export const ViewProfile = () => {
  const navigate = useNavigate(); 
  const { userid } = useParams();
  const profileData = useSelector((state) => state.profileData);
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState([]);
  const [skip, setSkip] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const [isProfileDataLoaded, setIsProfileDataLoaded] = useState(false);
  const [buttonBackground, setButtonBackground] = useState("#fe9205");
  const [postCommentID, setPostCommentID] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [skipcmt, setSkipcmt] = useState(0);
  const [comments, setComments] = useState([]);
  const [totalComments, setTotalComments] = useState(0);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);
  const [userReportedID, setUserReportedID] = useState('');
  const [reportTypes, setReportTypes] = useState([]);
  const [showReportBox, setShowReportBox] = useState(false);
  const [showEditBox, setShowEditBox] = useState(false);
  const [selectedEditPost, setSelectedEditPost] = useState(null);
  const [arrayImageDeleted, setArrayImageDeleted] = useState([]);
  const [showFollower, setShowFollower] = useState(false);
  const [showFollowed, setShowFollowed] = useState(false);
  const [followersList, setFollowersList] = useState([]);
  const [followedList, setFollowedList] = useState([]);
  useEffect(() => {     
    const fetchProfile = async () => {
    const response = await profileService.getProfileById({userid, limit: 5, skip});
    setProfile(response.metadata.user);
    setPosts(response.metadata.posts);
  };
    fetchProfile();
  }, [skip]);

  useEffect(() => {
    if (profileData) {
        const fetchIsFollow = async () => {
        const result = await interactionSerivce.checkFollow(userid, profileData.data._id);
        setIsFollow(result);
      // console.log("is" + isFollow);
    };
        fetchIsFollow();
    } else {
      setIsProfileDataLoaded(true); 
    }
  }, [profileData, userid]);

  if (!isProfileDataLoaded) {
    return <div>Loading...</div>;
  }
  const handleComment =  async(postId) => {
    setPostCommentID(postId);
    console.log('handleComment', postId);
    setShowCommentBox(true);
    try{
      const allComments = await postService.getAllCommentFromAPost({postId,limitcmt : 4,skipcmt});
      setTotalComments(allComments.metadata.totalComments);
      setComments(allComments.metadata.comments);

    }catch(err){
      Swal.fire({
        icon: 'error',
        title: err.message,
        showConfirmButton: false,
        timer: 1500
      });
    }

  };
  const handleLoadMoreComment= (postId) =>{
    const newSkip = skipcmt + 4
    if (comments.length + 4 >= totalComments) {
      setShowLoadMoreButton(false);
    }
    console.log(skipcmt);
    postService.getAllCommentFromAPost({postId,limitcmt : 4,skipcmt:newSkip}).then((response) => {
      setSkipcmt(newSkip);
      setComments([...comments, ...response.metadata.comments]);
    }).catch((error) => {
      Swal.fire({
        icon: 'error',
        title: error.message,
        showConfirmButton: false,
        timer: 1500
      });
    });
  }
  const handleCloseComment = () => {
    setComments([])
    setSkipcmt(0);
    setShowLoadMoreButton(true);
    setShowCommentBox(false);
  };
  const handleCommentSubmit = async (event,postId) => {
    event.preventDefault();
    const commentInput = document.getElementById('comment-input').value;
    try{
      const responseCommentSubmit = await postService.createComment(commentInput,postId);
      if (responseCommentSubmit.statusCode === 200){
        Swal.fire({
          icon: 'success',
          title: responseCommentSubmit.message,
          showConfirmButton: false,
          timer: 1500
      });
      }else{
        Swal.fire({
          icon: 'success',
          title: responseCommentSubmit.message,
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
  }
   
    const handleLoadMore = () => {
        setSkip(skip + 5);
    };
    const handleLike = async (postId) => {
      if(profileData){
        const btn = document.getElementById(`btnLike-${postId}`);
        const btnDL = document.getElementById(`btnDislike-${postId}`);
        const iLike = document.getElementById(`iLike-${postId}`);
        const iDisLike = document.getElementById(`iDisLike-${postId}`);

        if (btn) {
            btn.style.backgroundColor = "#fe9205";
            btnDL.style.backgroundColor = "transparent";
            iLike.className = "bi bi-heart-fill";
            iDisLike.className = "bi bi-heartbreak";
            await postService.likePost(postId);
     
        }
      //  setIsDisLiked(false);
      //   setIsLiked(!isLiked);       
  
      }
      else{
        return navigate('/login')
      }

    };
    const handleDislike = async (postId) => {
      if(profileData){
        const btn = document.getElementById(`btnDislike-${postId}`);
        const btnL = document.getElementById(`btnLike-${postId}`);
        const iLike = document.getElementById(`iLike-${postId}`);
        const iDisLike = document.getElementById(`iDisLike-${postId}`);

        if (btn) {
            btn.style.backgroundColor = "#fe9205";
            btnL.style.backgroundColor = "transparent";
            iLike.className = "bi bi-heart";
            iDisLike.className = "bi bi-heartbreak-fill";
            await postService.disLikePost(postId);
        }
        setIsLiked(false);
        setIsDisLiked(!isDisLiked);
      }
      else{
        return navigate('/login')
      }
    };

  
  const handleEditPost = (post) => {
    // console.log('Edit post clicked');
    setSelectedEditPost(post);
    console.log(post._id);
    setShowEditBox(true);
  };
  const handleCloseEditPost = () => {
    setShowEditBox(false);
    setSelectedEditPost(null);
    setArrayImageDeleted([]);
  };
  const handleDeleteImage = (image) => {
    Swal.fire({
      title: 'Are you sure delete this image?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
    if (result.isConfirmed) {
      setArrayImageDeleted([...arrayImageDeleted, image]);
      setSelectedEditPost({
        ...selectedEditPost,
        image: selectedEditPost.image.filter((img, i) => img !== image),
      });
    }
    })
  }
  const handleSubmmitEdit = async (e,postId) => {
    console.log("da vo trong submmit")
    // console.log(arrayImageDeleted);
    e.preventDefault();
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    const title = document.getElementById('titleEdit').value;
    const content = document.getElementById('contentEdit').value;
    const detail = document.getElementById('detailEdit').value;
    const files = document.getElementById('filesEdit').files;
    const maxFiles = 4;
    if (files && files.length > maxFiles) {
      Swal.fire({
          icon: 'error',
          title: "Chỉ được phép tải lên tối đa 4 tệp.",
          showConfirmButton: false,
          timer: 1500
      });
      return;
    }
    if(title === '' || content === ''){
      Swal.fire({
        icon: 'error',
        title: 'Vui lòng không để trống title hoặc content',
        text: 'Vui lòng nhập title và content',
      });
      return;
    } 
    const formData = new FormData();

    if(detail !== undefined && urlRegex.test(detail)) {
      formData.append('website', detail);
    } else if(detail !== undefined){
      formData.append('address', detail);
    }
    formData.append('title', title);
    formData.append('content', content);
    for (let i = 0; i < files.length; i++) {
      const image = files[i];
      if (!image.type.startsWith('image/')) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid File Type',
          text: 'Please select only image files.',
        });
        return;
      }
      formData.append('image', files[i]);
    }
    arrayImageDeleted.forEach((img) => {
      formData.append('imageDeleted', img);
    });
    try {
      const response = await postService.updatePost(postId,formData);
      if (response.statusCode === 200) {
        Swal.fire({
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 1500
        });
        handleCloseEditPost();
      } else {
        Swal.fire({
          icon: 'error',
          title: response.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
  const handleDeletePost = async (postId) => {
    Swal.fire({
      title: 'Are you sure delete this post?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
    if (result.isConfirmed) {
      await postService.deletePost(postId);
      setPosts(posts.filter((post) => post._id !== postId));
     Swal.fire(
         'Deleted!',
         'Your file has been deleted.',
         'success'
       );
      }
      });  
  };
  const handleFollow = async (userid) =>{
    await interactionSerivce.addFollow(userid);
    setIsFollow(true); 
  }
  const handleUnfollow = async (userid) =>{
    await interactionSerivce.unFollow(userid);
    setIsFollow(false); 
    setButtonBackground("#fe9205")
  }
  const handleReport = async (postId) => {
    setPostCommentID(postId);
    setShowReportBox(true);
    if(!profileData){
      return navigate('/login')
    }
    try{
      const allReportTypes = await reportService.getAllReportTypes('post');
      setReportTypes(allReportTypes.metadata);
       console.log(allReportTypes);
    }catch(err){
      console.error(err);
    }
    
   };
  const handleCloseReport = () => {
    setPostCommentID('');
    setUserReportedID('');
    setShowReportBox(false);
  };
  const viewFollower=  async (userId) => {
    setShowFollower(true);

    try{
      const response = await profileService.viewFollowers(userId);
      // console.log(response.metadata);
      setFollowersList(response.metadata.followers);
    }
    catch(err){
      console.error(err);
    }
  }
  const viewFollowed=  async (userId) => {
    setShowFollowed(true);
    try{
      const response = await profileService.viewFolloweds(userId);
      // console.log(response.metadata);
      setFollowedList(response.metadata.followeds);
    }
    catch(err){
      console.error(err);
    }
  }
  const handleSubmmitReport = async (e) => {
    e.preventDefault();
    const report_type_id = document.getElementById('selectReportType').value;
    const reportContent = document.getElementById('report-content').value;
    const images = document.querySelector('input[type="file"]').files;
    const formData = new FormData();

   if (!report_type_id) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Report Type',
        text: 'Please select a report type.',
      });
      return;
    }
    if (!reportContent) {
        Swal.fire({
          icon: 'error',
          title: 'Missing Report Content',
          text: 'Please enter a report content.',
        });
        return;
    }
    if (images.length > 4 ) {
        Swal.fire({
          icon: 'error',
          title: 'Too Many Images',
          text: 'You can only select up to 4 images.',
        });
        return;
    }
    if(images.length === 0){
      Swal.fire({
        icon: 'error',
        title: 'Missing Image',
        text: 'Please select an image.',
    });
      return;
    }
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
        if (!image.type.startsWith('image/')) {
            Swal.fire({
            icon: 'error',
            title: 'Invalid File Type',
            text: 'Please select only image files.',
            });
          return;
        }
        formData.append('image', images[i]);
    }
    // console.log("report_type", report_type_id);
    formData.append('report_type_id', report_type_id);
    formData.append('content', reportContent);
    formData.append('post_id', postCommentID);
    try{
      const respone =  await reportService.createReport(formData,userid);
      if(respone.statusCode === 201){
        Swal.fire({
        icon: 'success',
        title: respone.message,
        showConfirmButton: false,
        timer: 1500
    });
    handleCloseReport();
    }else{        
      Swal.fire({
      icon: 'error',
      title: "Something went wrong",
      showConfirmButton: false,
      timer: 1500
    });
    }
    }
    catch(err){
      console.error(err); 
    }
  }
  const handleCloseViewFollower = () => {
    setShowFollower(false);
    setFollowersList([]);
  }
  const handleCloseViewFollowed = () => {
    setShowFollowed(false);
    setFollowedList([]);
  }
  return(
      <body >
          <TopNav />
    <div className='container' >
        <div className="profile-page tx-13">
            <div className="row">
                <div className="col-12 grid-margin">
                    <div className="profile-header">
                        <div className="cover">
                            <div className="gray-shade"></div>
                                <figure>
                                    <img src={background} className="img-fluid" alt="profile cover"/>
                                </figure>
                                <div className="cover-body d-flex justify-content-between align-items-center">
                                <div>
                                {profile.avatar ? 
            (<img src={`${BASE_URL}/user/getAvatarByName/${profile.avatar}`} alt="Avatar" className="img-xs rounded-circle"/>) 
            : (
              <img src={user} alt="Avatar" className="img-xs rounded-circle"/>
            )}                                        <span className="profile-name">{profile.username}</span>
                                </div>
                                {profileData && profileData.data._id !== userid && (
                                    <div className="classBtnFollow">
                                        {isFollow ? (
                                            <button className="bi bi-dash" id="btnUnfollow"  style={{ backgroundColor: buttonBackground, borderRadius:'5px', marginTop:'5px',height: '40px', width:'100px'}} onClick={() => handleUnfollow(userid)}>
                                                Unfollow
                                            </button>
                                        ) : (
                                            <button className="bi bi-plus-lg" id="btnFollow"  style={{borderRadius: '5px', marginTop:'5px', height: '40px', width:'100px'}} onClick={() => handleFollow(userid)}>
                                                Follow
                                            </button>
                                        )}
                                    </div>
                                )}                       
                        </div>
                    </div>
        <div className="header-links">
        <ul className="links d-flex align-items-center mt-3 mt-md-0">
        <li className="header-link-item d-flex align-items-center active">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-columns mr-1 icon-md">
        <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path>
        </svg>
        <a className="pt-1px d-none d-md-block" href="#" style = {{color: 'black'}}>Timeline</a>
        </li>
        <li className="header-link-item ml-3 pl-3 border-left d-flex align-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users mr-1 icon-md">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
        <a className="pt-1px d-none d-md-block"  onClick={() => viewFollower( profile._id)} style = {{color: 'black'}}href="#">Follower  <span className="text-muted tx-12" style = {{color: 'black'}}>{profile.followerCount}</span></a>
        </li>
        <li className="header-link-item ml-3 pl-3 border-left d-flex align-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user mr-1 icon-md">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
        </svg>
        
        <a className="pt-1px d-none d-md-block" onClick={() => viewFollowed( profile._id)} href="#" style = {{color: 'black'}}>Following <span className="text-muted tx-12" style = {{color: 'black'}}>{profile.followingCount}</span></a>
        </li>
        
        <li className="header-link-item ml-3 pl-3 border-left d-flex align-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-image mr-1 icon-md">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
        <a className="pt-1px d-none d-md-block" href="#" style = {{color: 'black'}}>Photos</a>
        </li>


        </ul>
        </div>
        </div>
        </div>
        </div>
        <div className="row profile-body">

        <div className="d-none d-md-block col-md-4 col-xl-3 left-wrapper">
        <div className="card rounded">
        <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mb-2">
        <h6 className="card-title mb-0"><strong>About</strong></h6>
        <div className="dropdown">
          {profileData && profileData.data._id === userid && (
            <a href="/profile"><i class="bi bi-pencil-square">Edit</i> </a>
          )}        
        </div>
        </div>
        <p>Hi! I'm a new blogger tks for looking my profile,Like and comment something for me.</p>
        <div className="mt-3">
        <label className="tx-11 font-weight-bold mb-0 text-uppercase"><strong>Joined</strong>:</label>
        <p className="text-muted" >{formartDay.formartDayUp(profile.createdAt)}</p>
        </div>

        <div className="mt-3">
        <label className="tx-11 font-weight-bold mb-0 text-uppercase"><strong>Email:</strong></label>
        <p className="text-muted"><a href={`mailto:${profile.email}`} className="__cf_email__" style={{ color: 'black', textDecoration: 'none' }}>[{profile.email}]</a></p>
        </div>


        </div>
        </div>
        </div>


        <div className="col-md-8 col-xl-6 middle-wrapper">
        <div className="row">
        <div className="col-md-12 grid-margin">
  {posts.map((post, index) => (
    <div className="card rounded" key={index}>
      <div className="card-header">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            {profile.avatar? 
            (<img src={`${BASE_URL}/user/getAvatarByName/${profile.avatar}`} alt="Avatar" className="img-xs rounded-circle"/>) 
            : (
              <img src={user} alt="Avatar" className="img-xs rounded-circle"/>
            )}
            <div className="ml-2">
              <p><strong>{profile.username}</strong></p>
              <p className="tx-11 text-muted">{formartDay.formartDayDown(post.createdAt)}</p>
            </div>
          </div>
      {profileData && profileData.data._id === userid && (
        <>
          <div className="dropdown">

          <button onClick={() => handleEditPost(post)} className="bi bi-pencil-square" style={{borderRadius: '5px'}}>Edit</button>
          <button onClick={() => handleDeletePost(post._id)} className="bi bi-trash" style={{borderRadius: '5px'}}>Delete</button>
          </div>

        </>
      )}

    
    </div>
      </div>
      <div className="card-body">
        <h4>{post.title}</h4>
        <p className="mb-3 tx-14">{post.content}</p>
        {post.address || post.website ? (
    <b>
        Detail:&nbsp;
        <a href={post.website ? post.website : post.address} target="_blank" style={{ color: 'black', textDecoration: 'none' }}
  onMouseEnter={(e) => e.target.style.color = '#fe9205'}
  onMouseLeave={(e) => e.target.style.color = 'black'}>
            {post.website ? (post.website.length > 35 ? post.website.slice(0, 35) + '...' : post.website) : (post.address.length > 20 ? post.address.slice(0, 20) + '...' : post.address)}
        </a>
    </b>
) : null}

        <div className="image-container">
          {post.image.map((image, index) => (
              <img key={index} className={`image-item ${post.image.length === 1 ? 'single-image' : ''}`} src={`${BASE_URL}/post/displayFile/${image}`} alt={`Image ${index + 1}`} />
          ))}
      </div>

        {/* {post.video && (
            <video controls className="video-fluid" style={{ width: "100%" }}>
                <source src={`${BASE_URL}/user/getVideoByName/${post.video}`} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        )} */}

      </div>
      <div className="card-footer">
        <div className="d-flex post-actions">
        <button id={`btnLike-${post._id}`}
            onClick={() => handleLike(post._id)}
        >
            <i id ={`iLike-${post._id}`} className="bi bi-heart"></i>
            <span id={`spanLike-${post._id}`} >Like({post.likeCount})</span>
        </button>

        <button id={`btnDislike-${post._id}`}
            onClick={() => handleDislike(post._id)}
        >
            <i id= {`iDisLike-${post._id}`} className="bi bi-heartbreak"></i>
            <span id={`spanDisLike-${post._id}`}>DisLike({post.dislikeCount})</span>
        </button>

          <button onClick={() => handleComment(post._id)}>
            <i className="bi bi-chat-dots"></i>
            <span>Comment</span>
          </button>
          <button onClick={() => handleReport(post._id)}>
            <i className="bi bi-exclamation-circle"></i>                       
            <span>Report</span>
          </button>
        </div>
      </div>
    </div>
  ))}
</div>


        </div>
        </div>


        <div className="d-none d-xl-block col-xl-3 right-wrapper">
        <div className="row">
        <div className="col-md-12 grid-margin">
        <div className="card rounded">


        </div>
        </div>

        </div>
        </div>
        </div>

        </div>
        </div>
        <Modal show={showCommentBox} onHide={handleCloseComment}>
        <Modal.Header closeButton>
          <Modal.Title>Comment {totalComments}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="fixed-modal-body" style={{maxHeight: '500px',
  overflowY: 'auto'}}>
          <div>
            {comments.map((comment, index) => (
              <div className="comment-container" key={index} style={{
                width: '100%',
                display: 'flex',
                alignItems: 'flex-start',
                marginBottom: '20px',
                border: '2px solid #ccc',
              }}>
                {comment.creator_id.avatar ? (
                  <img
                    src={`${BASE_URL}/user/getAvatarByName/${comment.creator_id.avatar}`}
                    style={{
                      width: '50px',
                      height: '50px',
                      marginRight: '10px',
                      borderRadius: '50%',
                    }}
                    alt={`avt-cmt${index}`}
                    id="avatar-comment"
                  />
                ) : (
                  <img
                    style={{
                      width: '50px',
                      height: '50px',
                      marginRight: '10px',
                      borderRadius: '50%',
                    }}
                    src={comment.avatar}
                    alt=""
                    id="avatar-comment"
                  />
                )}
                <div className="card-comment">
                  <div className="userId">
                    <a href={`/viewProfile/${comment.creator_id._id}`} style={{ color: 'black'}}>
                      {comment.creator_id.username}
                    </a>
                    <p className="time">
                      {formartDay.formartDayDown(comment.createdAt)}
                    </p>
                  </div>
                  <div className="comment-content">
                    <i>{comment.content}</i>
                  </div>
                  <div className="actions">
                    <button>
                      <i className="bi bi-heart"></i>
                    </button>
                    <button>
                      <i className="bi bi-heartbreak"></i>
                    </button>
                    <button>
                      <i className="bi bi-exclamation-circle"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {showLoadMoreButton && (
            <button onClick={() => handleLoadMoreComment(postCommentID)}>
              Xem thêm bình luận
            </button>
          )}
        </Modal.Body>
        <Modal.Footer>
          {profileData && (
            <form
            className="comment-input-container" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              marginBottom: '5px',
            }} 
              onSubmit={(event) => handleCommentSubmit(event, postCommentID)}
            >
          <textarea
            id="comment-input"
            placeholder="Write a comment..."
            required
            style={{
              width: 'calc(100% - 80px)',
              marginRight: '5px',
            }}
          ></textarea>
          <Button
            type="submit"
            style={{
              backgroundColor: 'rgb(17, 119, 41)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: '0.3s',
              marginRight: '3px',
            }}
          >
            Post
          </Button>            
          </form>
          )}
        </Modal.Footer>
      </Modal>
            <Modal show={showReportBox} onHide={handleCloseReport} >
            <Modal.Header closeButton>
              <Modal.Title>Report</Modal.Title>
                  </Modal.Header>
                    <Modal.Body  className="fixed-modal-body">
                      <Form onSubmit={handleSubmmitReport}>
                      <label htmlFor="selectReportType">Chọn loại tố cáo:</label>
                      <select className="form-select" id= 'selectReportType'>
                      <option value="">Select Report Type</option>
                      {reportTypes.map((reportType) => (
                          <option key={reportType._id} value={reportType._id}>{reportType.name}</option>
                      ))}
                  </select>
                  <label htmlFor="report-content">Nhập nội dung:</label><br />
                <textarea id="report-content" name="reportContent" className="form-control" placeholder="Write a report..." required></textarea>
                <label htmlFor="image">Chọn ảnh minh chứng:</label>
                <input type="file" name="image" multiple accept="image/*" required/>
                  
                      </Form>
               </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" type='submit' onClick={handleSubmmitReport} > Submit </Button>

                    <Button variant="secondary" onClick={handleCloseReport}>
                                    Close
                      </Button>
                    </Modal.Footer>
            </Modal>
            <Modal show={showEditBox} onHide={handleCloseEditPost} >
            <Modal.Header closeButton>
              <Modal.Title>Edit Post</Modal.Title>
                  </Modal.Header>
                    <Modal.Body  className="fixed-modal-body">
                      <Form onSubmit={(event) => handleSubmmitEdit(event, selectedEditPost?._id)}>
                      <p>Title: <textarea id= 'titleEdit'className="form-control" defaultValue={selectedEditPost?.title} ></textarea></p>
                      <p>Content: <textarea id='contentEdit'className="form-control" defaultValue={selectedEditPost?.content}></textarea></p>
                      <p>Detail: <textarea  id='detailEdit'className="form-control" defaultValue={selectedEditPost?.address || selectedEditPost?.website} /></p>
                      <label htmlFor="files" className="form-label">Hình ảnh(Tối đa 4 tệp):</label>
                      <input type="file" className="form-control" id="filesEdit" name="files[]" multiple />
                      {selectedEditPost && selectedEditPost.image && (
                        <div>
                            {selectedEditPost.image.map((img, index) => (
                                <div className="row mb-3 position-relative" key={index}>
                                    <div className="col">
                                        <img src={`${BASE_URL}/post/displayFile/${img}`} alt={`Ảnh ${index + 1} của bài viết`} />
                                        <button type="button" onClick={() => handleDeleteImage(img)} className="btn btn-danger position-absolute top-0 end-0">xóa</button>
                                    </div>
                                </div>
                            ))}
                      </div>
                      )}


                      </Form>
               </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" type='submit' onClick={(event) => handleSubmmitEdit(event, selectedEditPost?._id)} > Submit </Button>

                    <Button variant="secondary" onClick={handleCloseEditPost}>
                                    Close
                      </Button>
                    </Modal.Footer>
            </Modal>
            <Modal show={showFollower} onHide={handleCloseViewFollower} >
            <Modal.Header closeButton>
              <Modal.Title>Followers</Modal.Title>
                </Modal.Header>
                    <Modal.Body  className="fixed-modal-body">
                      <h4>Username (Follower)</h4>
                    {followersList.map((follower, index) => (
                      <div key={index} style={{display: 'flex', alignItems: 'center', marginBottom: '10px',border: '2px solid #f1f1f1' }}>
                        <div>
                            <a href={`/viewProfile/${follower.follower_id._id}`} style={{color: 'black'}}>User{index+1}: {follower.follower_id.username}</a>
                            <p style={{fontSize: '12px'}}>{follower.email}</p>
                        </div>
                        </div>
                    ))}
               </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseViewFollower}>
                                    Close
                      </Button>
                    </Modal.Footer>
            </Modal>

            <Modal show={showFollowed} onHide={handleCloseViewFollowed} >
            <Modal.Header closeButton>
              <Modal.Title>Followings</Modal.Title>
                </Modal.Header>
                    <Modal.Body  className="fixed-modal-body">
                      <h4>Username (Following)</h4>
                    {followedList.map((followed, index) => (
                      <div key={index} style={{display: 'flex', alignItems: 'center', marginBottom: '10px',border: '2px solid #f1f1f1' }}>
                        <div>
                            <a href={`/viewProfile/${followed.followed_id._id}`} style={{color: 'black'}}>User{index+1}: {followed.followed_id.username}</a>
                        </div>
                        </div>
                    ))}
               </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseViewFollowed}>
                                    Close
                      </Button>
                    </Modal.Footer>
            </Modal>
        </body>
    );
    
}