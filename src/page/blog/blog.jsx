import React, { useRef,useEffect, useState } from 'react';
import { TopNav } from '../../component/TopNav.jsx';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import user from '../../public/images/user.png';
import filter from '../../public/images/filter.png';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { postService } from '../../service/postService.js';
import { reportService } from '../../service/reportService.js';
import {BASE_URL} from '../../config/axiosConfig.js';
import {formartDay} from '../../utils/formartDay.js';
import { Modal, Button,Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export const Blog = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);
  const navigate = useNavigate();
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [showReportBox, setShowReportBox] = useState(false);
  const profileData = useSelector((state) => state.profileData);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [totalComments, setTotalComments] = useState(0);
  const [postCommentID, setPostCommentID] = useState('');
  const [userReportedID, setUserReportedID] = useState('');

  const [skip, setSkip] = useState(0);
  const [skipcmt, setSkipcmt] = useState(0);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);
  const { category } = useParams();
  const [reportTypes, setReportTypes] = useState([]);
  const [shouldFetchMore, setShouldFetchMore] = useState(true);
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFilterButtonClick = () => {
    if (selectedOption) {
      window.location.href = `/blog/${selectedOption}`;
    }
  };
  useEffect(() => {
    const fetchPosts = async () => {
          window.addEventListener('beforeunload', function(event) {
            setPosts([]);
        });
        if (shouldFetchMore) {
            if (category) {
                let idCat = '';
                switch (category) {
                    case 'Fashion':
                        idCat = '65ccf7a3f4b25875addcf5a6';
                        break;
                    case 'FoodandDrink':
                        idCat = '65cf3e459e4d222b4bf3acac';
                        break;
                    case 'Services':
                        idCat = '65cf3e4e9e4d222b4bf3acb0';
                        break;
                    case 'Others':
                        idCat = '65e4a90866f13977483fa39c';
                        break;
                    default:
                        idCat = '';
                }
                // console.log("skip o post cat ", skip)
                const allPosts = await postService.getAllPostByID({ idCat, limit: 5, skip });
                // console.log(allPosts.metadata)
                if (allPosts.metadata.length === 0) {
                    setShouldFetchMore(false);
                    Swal.fire('Thông báo', 'Bạn đã lướt hết bài viết!', 'info');
                } else {
                    setPosts(prevPosts => [...prevPosts, ...allPosts.metadata]);
                }
            } else {
                // console.log("skip o post ", skip);
                const allPosts = await postService.getAllPost({ limit: 5, skip });
                if (allPosts.metadata.length === 0) {
                    setShouldFetchMore(false);
                    Swal.fire('Thông báo', 'Bạn đã lướt hết bài viết!', 'info');
                } else {
                    setPosts(prevPosts => [...prevPosts, ...allPosts.metadata]);
                }
            }
        }    
    };
    fetchPosts();
}, [skip]);
 //#######################################################//
  const handleLoadMore = () => {
    setSkip(preveSkip => (preveSkip + 5));
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
      }
      else{
        return navigate('/login')
      }
    };
    const handleReport = async (postId, userId) => {
      setPostCommentID(postId);
      setUserReportedID(userId);
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
          text: 'Vui lòng chọn hình ảnh minh chứng.',
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
      console.log("report_type", report_type_id);
      formData.append('report_type_id', report_type_id);
      formData.append('content', reportContent);
      formData.append('post_id', postCommentID);
      try{
        const respone =  await reportService.createReport(formData,userReportedID);
        if(respone.statusCode === 201){
          Swal.fire({
            icon: 'success',
            title: respone.message,
            showConfirmButton: false,
            timer: 1500
        });
          handleCloseReport();
        }
        else{
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
    return (
        <body style={{backgroundColor: '#d38825'}}>
        <TopNav/>
        <Container className='container' >
        <Row>
          <Col md={8} className="leftcolumn">
            
          {Array.isArray(posts) && posts.map(post => (
            <div 
          key={post._id} 
          className="card" 
          style={{
            marginBottom: '20px',
            borderRadius: '10px',
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
            padding: '20px',
            backgroundColor: '#ffffff',
            border: '1px solid #f1f1f1',
            transition: '0.3s',
            marginTop: '20px'
          }}
        >          
        <div className="user-info" style={{ display: 'flex', justifyContent: 'space-between' }}>
            {post.avatar ? (
            <img alt="Avatar" src={`${BASE_URL}/user/getAvatarByName/${post.avatar}`} className="avatar avatar-sm rounded-circle me-2"  style={{
              width: '50px',
              height: '50px',
              marginRight: '10px',
              borderRadius: '50%',
            }}/>
          ) : (
            <img alt="Default Avatar" src={user} className="avatar avatar-sm rounded-circle me-2"  style={{
              width: '50px',
              height: '50px',
              marginRight: '10px',
              borderRadius: '50%',
            }} />
          )}
            <div className="user-details" style={{ flex: 1 }}>
            <a 
              className="user-name" 
              href={`/viewProfile/${post.user_id}`} 
              style={{
                fontSize: '16px',
                color: '#000000',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              <strong>{post.username}</strong>
            </a>
            <p 
              className="post-date" 
              style={{
                margin: '5px',
                fontWeight: '500',
              }}
            >
              {formartDay.formartDayDown(post.createdAt)}
            </p>
          </div>

            <strong id="category" style={{marginRight: '10px',
  color: '#fe9205'}}>{post.type_post_id.name}</strong>
          </div>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          {post.address || post.website ? (
            <p>
                {post.address ? (
                    <b style={{color: 'black'}}>
                        Address: {post.address}
                        {' '}
                    </b>
                ) : null}
                {post.website ? (
                    <a href={post.website} target="_blank" rel="noopener noreferrer" style={{ color: 'black', textDecoration: 'none' }}
  onMouseEnter={(e) => e.target.style.color = '#fe9205'}
  onMouseLeave={(e) => e.target.style.color = 'black'}>
                        <b style={{color: 'black'}}>Website: </b>{post.website && post.website.length > 20 ? (
                            <>
                                {post.website.slice(0, 20)}
                                {' ...'}
                            </>
                        ) : (
                            post.website
                        )}
                    </a>
                ) : null}
            </p>
        ) : null}
              <div className="post-images" style={{ display: 'flex', flexWrap: 'wrap'}}>
          {post.image.map((img, index) => (
            <img 
              key={index} 
              className={`post-image ${post.image.length === 1 ? 'single-image' : ''}`} 
              src={`${BASE_URL}/post/displayFile/${img}`} 
              alt={`Post Image ${index + 1}`} 
              style={{ paddingRight: '5px',width: post.image.length === 1 ? '100%' : '50%' }} 
            />
          ))}
        </div>
        <div className="post-actions">
          <button id={`btnLike-${post._id}`}  onClick={() => handleLike(post._id)}>
            <i id={`iLike-${post._id}`} className="bi bi-heart"></i>
            <span id={`spanLike-${post._id}`}>Like({post.likeCount})</span>
          </button>

          <button id={`btnDislike-${post._id}`} onClick={() => handleDislike(post._id)}>
            <i id={`iDisLike-${post._id}`} className="bi bi-heartbreak"></i>
            <span id={`spanDisLike-${post._id}`}>DisLike({post.dislikeCount})</span>
          </button>

          <button onClick={() => handleComment(post._id)} >
            <i className="bi bi-chat-dots"></i>
            <span>Comment</span>
          </button>

          <button onClick={() => handleReport(post._id, post.user_id)}>
            <i className="bi bi-exclamation-circle"></i>
            <span>Report</span>
          </button>
        </div>

          
        </div>
        
      ))}     
         </Col>
         <Col md={4} className="rightcolumn" style={{ position: 'relative' }}>
          <Card id="right-column">
              <Card.Body>
                  <Card.Title>Bộ lọc <img src={filter} alt="" id="filter" style={{height: '20px',
  width: '20px'}} /></Card.Title>
                  <Card.Text>
      <div id="options" style={{ marginTop: '20px' }}>
        <h5>Tìm kiếm theo:</h5>
        <div>
          <label style={{ display: '-webkit-inline-box', margin: '10px' }}>
            <input
              type="radio"
              name="option"
              value="FoodandDrink"
              checked={selectedOption === 'FoodandDrink'}
              onChange={handleOptionChange}
            />{' '}
            Food and Drink Blogs
          </label>
          <label style={{ display: '-webkit-inline-box', margin: '10px' }}>
            <input
              type="radio"
              name="option"
              value="Services"
              checked={selectedOption === 'Services'}
              onChange={handleOptionChange}
            />{' '}
            Services Blogs
          </label>
          <label style={{ display: '-webkit-inline-box', margin: '10px' }}>
            <input
              type="radio"
              name="option"
              value="Fashion"
              checked={selectedOption === 'Fashion'}
              onChange={handleOptionChange}
            />{' '}
            Fashion Blogs
          </label>
          <label style={{ display: '-webkit-inline-box', margin: '10px' }}>
            <input
              type="radio"
              name="option"
              value="Others"
              checked={selectedOption === 'Others'}
              onChange={handleOptionChange}
            />{' '}
            Others Blogs
          </label>
        </div>
      </div>

      <button
        className="search-button"
        style={{ backgroundColor: '#fe9205', height: '40px', width: '80px', borderRadius: '10px' }}
        onClick={handleFilterButtonClick}
      >
        Filter
      </button>
    </Card.Text>
              </Card.Body>
          </Card>
          {shouldFetchMore ? (
            <button
              onClick={() => handleLoadMore()}
              className="view-more-button"
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                width: '200px',
                height: '50px',
                borderRadius: '10px'
              }}
            >
              Xem thêm bài viết
            </button>
          ) : null}

      </Col>

        </Row>
      </Container>
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
                  <label htmlFor="report-content">Nhập nội dung:</label>
                <textarea id="report-content" name="reportContent"  className="form-control"  placeholder="Write a report..." required></textarea>
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
      
        </body>
        
    );
}