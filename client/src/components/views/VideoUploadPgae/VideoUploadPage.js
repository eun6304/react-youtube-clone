import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import DropZone from 'react-dropzone';
import  axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;
const { Title } = Typography;

const { Option } = Select;

const PrivateOptions = [
  { value : 0, label : "Private"},
  { value : 1, label : "Public"}
]

const CategoryOptions = [
  { value : 0, label : "Film & Animation"},
  { value : 1, label : "Autos & Vehicles"},
  { value : 2, label : "Music"},
  { value : 3, label : "Pets & Animals"},
]

function VideoUploadPage() {
  // value들을  state에 저장
  const user = useSelector(state => state.user) // user 정보 가져오기, 현재 로그인한 사람
  const [VideoTitle, setVideoTitle] = useState("")
  const [Description, setDescription] = useState("")
  const [Private, setPrivate] = useState(0)
  const [Category, setCategory] = useState("Film & Animation")
  const [FilePath, setFilePath] = useState("")
  const [Duration, setDuration] = useState("")
  const [ThumbnailPath, setThumbnailPath] = useState("")
  
  const navigate = useNavigate();

  const onTitleChange = e => {
    setVideoTitle(e.currentTarget.value)
  }

  const onDescriptionChange = e => {
    setDescription(e.currentTarget.value)
  }

  const onPrivateChange = e => {
    setPrivate(e.currentTarget.value)
  }

  const onCategoryChange = e => {
    setCategory(e.currentTarget.value)
  }

  const onDrop = files => {
    let formData = new FormData
    // 파일 보낼땐 헤더를 설정 안해주면 오류가 생김
    const config = {
      header : {'content-type' : 'multipart/form-data'}
    }
    formData.append("file", files[0])
    axios.post('/api/video/uploads', formData, config)
    .then(response => {
      if(response.data.success) {

        let variable = {
          url : response.data.url,
          filename : response.data.fileName
        }

        setFilePath(response.data.url)

        axios.post('/api/video/thumnail', variable)
        .then(response => {
          if(response.data.success) {
            setDuration(response.data.fileDuration)
            setThumbnailPath(response.data.url)
          }else {
            alert('썸네일 생성에 실패했습니다.')
          }
        })
      }else {
        alert('비디오 업로드를 실패했습니다.')
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  const onSubmit = e => {
    e.preventDefault();

    const variables = {
      writer : user.serverUserData._id,
      title : VideoTitle,
      description : Description,
      privacy : Private,
      filePath : FilePath,
      category : Category,
      duration : Duration,
      thumbnail : ThumbnailPath
    }

    axios.post('/api/video/uploadVideo', variables)
    .then(response => {
      if(response.data.success) {
        setTimeout(() => {
          message.success("성공적으로 업로드를 했습니다.")
          navigate('/')
        }, 3001)
      } else {
        alert("비디오 업로드에 실패했습니다.")
      }
    })
  }

  return (
    <div style={{ maxWidth: '700px', margin : '2rem auto' }}>
      <div style={{ textAlign : 'center', marginBottom : '2rem' }}>
        <Title level={2}>Upload Video</Title>
      </div>
      <Form onSubmit={onSubmit}>
        <div style={{ display : 'flex', justifyContent : 'space-between'}}>
          {/* Drop zone */}
          <DropZone
            onDrop={onDrop}
            multiple={false}
            maxSize={1000000000000}
          >
            {({ getRootProps, getInputProps}) => (
              <div style={{ width : '300px', height : '240px', border : '1px solid lightgray', display : 'flex',
              alignItems : 'center', justifyContent : 'center'}} {...getRootProps()}>
                <input {...getInputProps()} />
                <PlusOutlined />
              </div>
            )}
          </DropZone>
          {/* Thumbnail */}
          <div>
            { ThumbnailPath && 
              <img src={ `http://localhost:5000/${ThumbnailPath}` } alt="thumbnail" />
            }
          </div>
          <div>
            <img  />
          </div>
        </div>
        <br />
        <br />
        <label>Title</label>
        <Input 
          onChange={onTitleChange}
          value={VideoTitle}
        />
        <br />
        <br />
        <label>Description</label>
        <TextArea 
          onChange={onDescriptionChange}
          vaule={Description}
        />
        <br />
        <br />
        <Select 
          onChange={onPrivateChange} 
          defaultValue={PrivateOptions[0].value}
          style={{ width: '100%', marginBottom: '16px' }}
          >
          {PrivateOptions.map((item, index) => (
            <Option  key={index} value={item.value}>{ item.label }</Option>
          ))}
        </Select>
        <Select 
          defaultValue={CategoryOptions[0].value}
          onChange={onCategoryChange}
          style={{ width: '100%' }}
        >
        {CategoryOptions.map((item, index) => (
            <Option  key={index} value={item.value}>{ item.label }</Option>
          ))}
        </Select>
        <br />
        <br />
        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default VideoUploadPage
