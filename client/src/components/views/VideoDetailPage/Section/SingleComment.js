import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Comment, Avatar, Button, Input, Form } from 'antd'
import axios from 'axios'
import LikeDislikes from './LikeDislikes'

const { TextArea } = Input;

function SingleComment(props) {
  const user = useSelector(state => state.user)
  const [OpenReply, setOpenReply] = useState(false)
  const [CommentValue, setCommentValue] = useState("")

  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply)
  }

  const onHandleChange = event => {
    setCommentValue(event.currentTarget.value)
  }

  const onSubmit = values => {
    // event.preventDefault();

    const variables = {
      content : CommentValue,
      writer : user.serverUserData._id,
      postId : props.postId,
      responseTo : props.comment._id
    }

    axios.post('/api/comments/saveComment', variables)
     .then(response => {
      if(response.data.success) {
        setCommentValue("")
        setOpenReply(false)
        props.refreshFunction(response.data.result)
      }else {
        alert('댓글 저장  실패 했습니다.')
      }
     })
  }

  const actions = [
    <LikeDislikes userId={localStorage.getItem('userId')} commentId={props.comment._id} /> ,
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply to</span>
  ]

  return (
    <div>
      <Comment 
        actions={actions}
        author={props.comment.writer.name}
        avatar={<Avatar src={props.comment.writer.image} alt />}
        content={<p>{ props.comment.content }</p>}
      />

      { OpenReply &&
        <Form layout="vertical" onFinish={onSubmit} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Form.Item style={{ flex: 1, marginBottom: 0 }}>
          <TextArea
            rows={2}
            onChange={onHandleChange}
            value={CommentValue}
            placeholder="코멘트를 작성해 주세요"
          />
        </Form.Item>
        
        <Button type="primary" htmlType="submit" style={{ height: '52px' }}>
          Submit
        </Button>
      </Form>
      }
    
    </div>
  )
}

export default SingleComment
