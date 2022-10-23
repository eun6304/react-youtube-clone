import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Video } from '../../../../../server/models/Video';

function LandingPage() {
  useEffect(() => {
    axios.get('/api/hello')
    .then(res => {
      console.log(res.data)
    })
  }, [])
  const navigate = useNavigate();

  const onClickHandler = () => {
    axios.get('/api/users/logout')
    .then(response => {
      if(response.data.success) {
        navigate('/login')
      }else {
        alert("로그아웃 실패했습니다.")
      }
    })
  }
  return (
    <div style={{ width : '85%', margin : '3rem auto'}}>
      <Title level={2}> Recommended </Title>
      <hr />
      <Row gutter={[32, 16]}>
        {renderCards}
        <Col lg={6} md={8} xs={24}>
          {/* <a href={/>video/post/${video._id}}> */}
          <div style={{ position : 'relative'}}>
            {/* <img style={{ width : '100%'}} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail />"*/}
            <div className="duration">
              {/* <span>{minutes} : {seconds} </span> */}
            </div>
          </div>
          {/* </a> */}
          <br />
          <Meta 
            // avartar={
            //   <Avartar src={video.writer.image} />
            // }
            // title={video.title}
            description=""
          />
          {/* <span>{video.writer.name}</span><br /> */}
          {/* <span style={{ marginLeft : '3rem'}}>{video.views}</span>  - <span>{moment(video.createdAt).format("MM")}</span>*/}
        </Col>
      </Row>
    </div>
  )
}

export default LandingPage
