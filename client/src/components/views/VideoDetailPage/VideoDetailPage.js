import React, { useEffect, useState } from 'react'
import { Row, Col, List, Avatar } from 'antd'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ReactPlayer from 'react-player/lazy';
import SideVideo from '../VideoDetailPage/Section/SideVideo';
import Subscribe from './Section/Subscribe';
import Comments from './Section/Comments';
import LikeDislikes from './Section/LikeDislikes';

function VideoDetailPage() {
  const videoId = useParams().videoId // app.js 에서 :videoId 했기 때문에
  const variable = { videoId : videoId } 
  const [VideoDetail, setVideoDetail] = useState([])
  const [Comment, setComment] = useState([])
  
  useEffect(() => {
    axios.post('/api/video/getVideoDetail', variable)
    .then(response => {
      if(response.data.success) {
        setVideoDetail(response.data.videoDetail)
      } else {
        alert('비디오 정보를 가져오는 것을 실패했습니다.')
      }
    })

    // 댓글 불러오기는 부모 컴포넌트에서 해야한다.
    axios.post('/api/comments/getComments', variable)
    .then(response => {
      if(response.data.success) {
        setComment(response.data.comments)
      } else {
        alert('코멘트 정보 불러오기 실패했습니다.')
      }
    })
  }, [])
  
  const refreshFunction = (newComments) => {
    setComment(Comment.concat(newComments))
  }

  if(VideoDetail.writer) {
    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>
          <div style={{ width : '100%', height : '80vh', padding: '3rem 4rem' }}>
            <ReactPlayer
              width='100%'
              height='100%' 
              url={`http://localhost:5000/${VideoDetail.filePath}`}
              playing={true}        // 자동 재생 on
              controls={true}       // 플레이어 컨트롤 노출 여부
              light={false}         // 플레이어 모드
              pip={true}            // pip 모드 설정 여부
            />
            <List.Item
              actions={[<LikeDislikes video userId={localStorage.getItem('userId')} videoId={videoId} />, <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')} />]}
            >
              <List.Item.Meta
                avatar={<Avatar src={VideoDetail.writer.image} />} // populate을 해서 가능함
                title={VideoDetail.title}
                description={VideoDetail.description}
              />
  
            </List.Item>

            <Comments refreshFunction={refreshFunction} commentLists={Comment} postId={videoId}/>
  
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    )
  } else {
    <div>...loading</div>
  }
  
}

export default VideoDetailPage
