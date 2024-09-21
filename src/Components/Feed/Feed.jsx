import React, { useEffect, useState} from 'react'
import './Feed.css'
import thumbnail1 from '../../assets/thumbnail1.png'
import thumbnail2 from '../../assets/thumbnail2.png'
import thumbnail3 from '../../assets/thumbnail3.png'
import thumbnail4 from '../../assets/thumbnail4.png'
import thumbnail5 from '../../assets/thumbnail5.png'
import thumbnail6 from '../../assets/thumbnail6.png'
import thumbnail7 from '../../assets/thumbnail7.png'
import thumbnail8 from '../../assets/thumbnail8.png'
import channelprofile from '../../assets/tom.png'
import { Link } from 'react-router-dom'
import { API_KEY } from '../../data'
import { value_converter } from '../../data'
import moment from 'moment/moment'


const Feed = ({category}) => {
    const [data,setData] = useState([]);
    
    const fetchData = async () =>{
        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`
        await fetch(videoList_url).then(response=>response.json()).then(data=>setData(data.items))
    }
    useEffect(()=>{
        fetchData();
    },[category])
    



  return (
    <div className="feed">
    <div className="video-feed">
        {data.slice(0,8).map((item,index)=>{
            return(
        <Link to={`video/${item.snippet.categoryId}/${item.id}`} className = 'card'>
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="channelprofile">
                 <img src={item.snippet.thumbnails.medium.url} className="channelpicture" alt=""  />
            <div className='channel-text'>
                <h2>{item.snippet.title}</h2>
                <h3>{item.snippet.channelTitle}</h3>
                <p>{value_converter(item.statistics.viewCount)}views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                </div>
            </div>
        </Link>
            )
        })}
        </div>
        <div className="shortfeed">
        <h3>Shorts</h3>
          <div className="shorts-container">
                {data.slice(25,32).map((item,index)=>{
                    return(
                    <Link to={`video/${item.snippet.categoryId}/${item.id}`} className = 'card'>
                <div key={index} className = 'shortcard'>
                    <img src={item.snippet.thumbnails.medium.url} alt="" />
                    <h2>{item.snippet.title}</h2>
                    <p>{value_converter(item.statistics.viewCount)}views </p>
                </div>
                </Link>
                    )
                })}
           </div>
        </div>

    <div className="video-feed">
        {data.slice(9).map((item,index)=>{
            return(
        <Link to={`video/${item.snippet.categoryId}/${item.id}`} className = 'card'>
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="channelprofile">
                 <img src={item.snippet.thumbnails.default.url} className="channelpicture" alt=""  />
            <div className='channel-text'>
                <h2>{item.snippet.title}</h2>
                <h3>{item.snippet.channelTitle}</h3>
                <p>{value_converter(item.statistics.viewCount)}views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                </div>
            </div>
        </Link>
            )
        })}
        </div>

    

    </div>
  )
}

export default Feed