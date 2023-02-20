import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'

function Comments(props) {
  const videoId = useParams().videoId
  const user = useSelector(state => state.user)
  const [CommentsValue, setCommentsValue] = useState("")

  const handleClick = event => {
    setCommentsValue(event.currentTarget.value)
  }

  const onSubmit = event => {
    event.preventDefault();

    const variables = {
      content : CommentsValue,
      writer : user.serverUserData._id,
      postId : videoId
    }

    axios.post('/api/comments/saveComment', variables)
     .then(response => {
      if(response.data.success) {
        setCommentsValue("")
        props.refreshFunction(response.data.result)
      }else {
        alert('댓글 저장  실패 했습니다.')
      }
     })
  }

  return (
    <div>
      <br />
      <p> Replies </p>
      <br />

      {/* Comments Lists */}
      {props.commentLists && props.commentLists.map((comment, index) => (
        (!comment.responseTo &&
          <React.Fragment key={index}>
            <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={props.postId} />
            <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} postId={props.postId} commentLists={props.commentLists} />
          </React.Fragment>
        )
      ))}

      
      {/* Root Comments Form */}
      <form style={{ display : 'flex' }} onSubmit={onSubmit} >
        <textarea
          style={{ width : '100%', borderRadius : '5px' }}
          onChange={handleClick}
          value={CommentsValue}
          placeholder='코멘트를 작성해 주세요'
        />
        <br />
        <button style={{ width : '20%', height : '52px'}} onClick={onSubmit}>Submit</button>
      </form>

    </div>
  )
}

export default Comments
