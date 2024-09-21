import React from 'react'
import './Navbar.css'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import search_icon from'../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import more_icon from'../../assets/more.png'
import notif_icon from'../../assets/notification.png'
import profile_icon from '../../assets/jack.png'
import Home from '../../Pages/Home/Home'
import { Link } from 'react-router-dom'

export const Navbar = ({setSidebar}) => {
  return (
    <nav className = 'flex-div'>
        <div className = 'nav-left flex-div'>
            <img className ='menu_icon' onClick={()=>setSidebar(prev=>prev===false?true:false)}src ={menu_icon} alt =""/>
            <Link to='/'>
            <img className = 'logo' src ={logo} alt =""/>
            </Link>
        </div>
        <div className ='nav-middle flex-div'>
            <div className="searchbox flex-div">
            <input type="text" placeholder ='Search'/>
            <img src ={search_icon} alt ="  "/>
            </div>

        </div>
        <div className="nav-right flex-div">
            <img src ={upload_icon} alt="" />
            <img src={more_icon} alt="" />
            <img src={notif_icon} alt="" />
            <img src={profile_icon} className ='user-icon' alt="" />
        </div>
    </nav>
  )
}
