import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Comment, Avatar, Button, Input } from 'antd'
import axios from 'axios'
import LikeDislikes from './LikeDislikes'

const { TextArea } = Input;

function SingleComment(props) {
  const user = useSelector(state => state.user)
  const [OpenReply, setOpenReply] = useState(false)
  const [CommentVaule, setCommentVaule] = useState("")

  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply)
  }

  const onHandleChange = event => {
    setCommentVaule(event.currentTarget.value)
  }

  const onSubmit = event => {
    event.preventDefault();

    const variables = {
      content : CommentVaule,
      writer : user.serverUserData._id,
      postId : props.postId,
      responseTo : props.comment._id
    }

    axios.post('/api/comments/saveComment', variables)
     .then(response => {
      if(response.data.success) {
        setCommentVaule("")
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
        <form style={{ display : 'flex' }} onSubmit={onSubmit} >
          <textarea
            style={{ width : '100%', borderRadius : '5px' }}
            onChange={onHandleChange}
            value={CommentVaule}
            placeholder='코멘트를 작성해 주세요'
          />
          <br />
          <button style={{ width : '20%', height : '52px'}} onClick={onSubmit}>Submit</button>
        </form>
      }
    
    </div>
  )
}

export default SingleComment
