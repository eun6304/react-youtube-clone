import { Card, Avatar, Col, Typography, Row } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import moment from 'moment';

const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {
  const [Videos, setVideos] = useState([])

  useEffect(() => {
     axios.get('/api/video/getVideos')
     .then(response => {
      if(response.data.success) {
        setVideos(response.data.videos)
      }else {
        alert('비디오 가져오기를 실패 했습니다.')
      }
     })
  }, []) // [] 가 없으면 계속 실행, [] 있으면 한번만 실행
  
  const renderCards = Videos.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    return <Col lg={6} md={8} xs={24}>
      <a href={`/video/post/${video._id}`}>
        <div style={{ position : 'relative'}}>
          <img style={{ width : '100%'}} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
          <div className="duration">
            <span>{minutes} : {seconds} </span>
          </div>
        </div>
      </a>
      <br />
      <Meta 
        avatar={
          <Avatar src={video.writer.image} />
        }
        title={video.title}
        description=""
      />
      <span style={{ marginLeft : '3rem'}}>{video.writer.name}</span>
      <br />
      <span style={{ marginLeft : '3rem'}}>{video.views} views </span>  - <span>{moment(video.createdAt).format("YY-MMM-DD")}</span>
    </Col>
  })

  return (
    <div style={{ width : '85%', margin : '3rem auto'}}>
      <Title level={2}> Recommended </Title>
      <hr />
      <Row gutter={[32, 16]}>
        {renderCards}
      </Row>
    </div>
  )
}

export default LandingPage
