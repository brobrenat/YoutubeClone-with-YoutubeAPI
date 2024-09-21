import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import video1 from	'../../assets/video.mp4'
import like from	'../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from	'../../assets/share.png'
import save from	'../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { API_KEY } from '../../data'
import { value_converter } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'

const PlayVideo = () => {

    const {videoId} = useParams();
    //getchannelinfo
    const[channelData,setChannelData]=useState(null);
    const [apiData,setApiData] = useState(null);
    const [commentData,setCommentData] = useState([]);
    const fetchVideoData = async ()=>{
        const videoDetails_url =`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
        await fetch(videoDetails_url).then(res=>res.json()).then(data=>setApiData(data.items[0]));
    }
    useEffect(()=>{
        fetchVideoData();
    },[videoId])
    
    
    //getchannelinfo
    const fetchOtherData = async()=>{
        const channelData_url =`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
        await fetch(channelData_url).then(res=>res.json()).then(data=>setChannelData(data.items[0]));
        const comment_url=`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`
        await fetch(comment_url).then(res=>res.json()).then(data=>setCommentData(data.items))
    }
    useEffect(()=>{
        fetchOtherData();
    },[apiData])


    
  return (
    <div className='playvideo'>
        <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <h3>{apiData?apiData.snippet.title:"Title here"}</h3>
        <div className="play-video-info">
            <p>{value_converter(apiData?apiData.statistics.viewCount:"200K")} Views &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():"2 days ago"}</p>
            <div>
            <span><img src={like} alt="" /> {value_converter(apiData?apiData.statistics.likeCount:152)} </span>
            <span>  <img src={dislike} alt="" /> 12 </span>
            <span> <img src={share} alt="" /> Share </span> 
            <span>  <img src={save} alt="" /> Save </span> 
                
            </div>
        </div>
        <hr />
        <div className="publisher">
            <img src={channelData?channelData.snippet.thumbnails.default.url:user_profile} alt="" />
            <div>
                <p>{apiData?apiData.snippet.channelTitle:"Channel name"}</p>
                <span>{channelData?value_converter(channelData.statistics.subscriberCount):"1 M "} Subscribers</span>
         </div>    
                <button>Subscribe</button>    
        </div>
        <div className="viddescription">
            <p>{apiData?apiData.snippet.description.slice(0,250):"DescriptionHere"}</p>
            <hr />
            <h4>{apiData?value_converter(apiData.statistics.commentCount):132}</h4>


           {commentData.map((item,index)=>{
            return(
            <div key={index}className="comment">
                <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                <div>
                    <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}<span> 1 day ago</span></h3>
                    <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                    <div className="commentaction">
                        <img src={like} alt="" />
                        <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                        <img src={dislike} alt="" />
                    </div>
                </div>
            </div>
            )
           })}

           
        </div>
    </div>
  )
}

export default PlayVideo