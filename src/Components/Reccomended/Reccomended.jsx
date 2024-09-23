import React, { useEffect, useState ,useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import './Reccomended.css'
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { API_KEY } from "../../data";
import { value_converter } from "../../data";
import moment from "moment";
import { Link } from "react-router-dom";


const Reccomended = ({categoryId}) => {
    const [apiData,setApiData] = useState([]);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const swiperRef = useRef(null);

    const fetchData = async () =>{
        const relatedVideo_url =`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
        await fetch(relatedVideo_url).then(res=>res.json()).then(data=>setApiData(data.items));
    }
    useEffect(()=>{
        fetchData();
    },[]);
    const [data,setData] = useState([]);
    


  return (
    <div className='reccommended'>
       
       <div className="shortreccomended">
        <hr />
        <h3>Shorts</h3>
        <div className={`swiper-container ${isBeginning ? 'is-beginning' : ''} ${isEnd ? 'is-end' : ''}`}>
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => {
                  setIsBeginning(swiper.isBeginning);
                  setIsEnd(swiper.isEnd);
             }}
            spaceBetween={1}
            slidesPerView={3}
            navigation={true}
            pagination={{ clickable: true }}
            modules={[Navigation]}
            className="mySwiper"

            
          >
            {apiData.slice(3,9).map((item,index)=>{
              return(

            <SwiperSlide>

              <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index}className='shortcard'>
                <img src={item.snippet.thumbnails.medium.url} alt="" />
                <h4>{item.snippet.title}</h4>
                <p>{value_converter(item.statistics.viewCount)} Views</p>
              </Link>
             
            </SwiperSlide>
              )
            })}

          </Swiper>
          
        
         </div>
         <hr />
       </div>

        {apiData.map((item,index)=>{
          return(

          <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index}className="sidevideo">
          <img src={item.snippet.thumbnails.medium.url} alt=""/>
          <div className="videoinfo">
            <h4>{item.snippet.title}</h4>
            <p>{item.snippet.channelTitle}</p>
            <p>{value_converter(item.statistics.viewCount)}views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
          </div>
      </Link>
          
          )
        })}

 

     </div>
    
   
  )
}

export default Reccomended