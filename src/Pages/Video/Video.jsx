import React from 'react'
import './Video.css'
import PlayVideo from '../../Components/PlayVideo/PlayVideo'
import Reccomended from '../../Components/Reccomended/Reccomended'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom'

 const Video = () => {
  
  const {videoId,categoryId} = useParams();

  return (
    <div className='play-container'>
        <PlayVideo videoId={videoId}/> 
        <Reccomended categoryId={categoryId}/>
    </div>
  )
}
export default Video