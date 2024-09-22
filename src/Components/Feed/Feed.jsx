import React, { useEffect, useState } from 'react'
import './Feed.css'
import { Link } from 'react-router-dom'
import { API_KEY } from '../../data'
import { value_converter } from '../../data'
import moment from 'moment/moment'



const Feed = ({ category }) => {
    const [data, setData] = useState([]);
    const [visibleItems, setVisibleItems] = useState(7);
    const [showMoreVisible, setShowMoreVisible] = useState(true);

    const showMoreItems = () => {
        setVisibleItems(9);
        setShowMoreVisible(false);
    };

    const showLessItems = () => {
        setVisibleItems(7);
        setShowMoreVisible(true);
    };
    const fetchData = async () => {
        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`
        await fetch(videoList_url).then(response => response.json()).then(data => setData(data.items))
    }
    useEffect(() => {
        fetchData();
    }, [category])




    return (
        <div className="feed">
            <div className="video-feed">
                {data.slice(0, 8).map((item, index) => {
                    return (
                        <Link to={`video/${item.snippet.categoryId}/${item.id}`} className='card'>
                            <img src={item.snippet.thumbnails.medium.url} alt="" />
                            <div className="channelprofile">
                                <img src={item.snippet.thumbnails.medium.url} className="channelpicture" alt="" />
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
                    {data.slice(25, 25 + visibleItems).map((item, index) => {
                        return (
                            <Link to={`video/${item.snippet.categoryId}/${item.id}`} className='card'>
                                <div key={index} className='shortcard'>
                                    <img src={item.snippet.thumbnails.medium.url} alt="" />
                                    <h2>{item.snippet.title}</h2>
                                    <p>{value_converter(item.statistics.viewCount)}views </p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
                <div className="show-more-container">
                    {showMoreVisible ? (
                        <button className="show-more-button" onClick={showMoreItems}>
                            Show More
                        </button>
                    ) : (
                        <button className="show-less-button" onClick={showLessItems}>
                            Show Less
                        </button>
                    )}
                </div>
                <hr />
            </div>


            <div className="video-feed">
                {data.slice(9).map((item, index) => {
                    return (
                        <Link to={`video/${item.snippet.categoryId}/${item.id}`} className='card'>
                            <img src={item.snippet.thumbnails.medium.url} alt="" />
                            <div className="channelprofile">
                                <img src={item.snippet.thumbnails.default.url} className="channelpicture" alt="" />
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