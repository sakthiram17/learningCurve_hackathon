import React from 'react'
import { useEffect,useState } from 'react';
import {NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = (props)=>{
    const [width,getWidth] = useState(window.innerWidth)
    useEffect(()=>{
        window.addEventListener('resize',()=>{
            getWidth(window.innerWidth)
            if(window.innerWidth>=600)
            {
                props.off();
            }
        })
      
    },
    [width])

    let is_small = width>768?false:true;
    let navElementList = props.list;
    let header = props.header;
    let navList = [];
    let menuButton = null;
    if(!is_small)
    {
        for(var i = 0;i<props.list.length;i++)
            {navList.push(<li><NavLink 
              
                className={({ isActive }) => (isActive ? 'NavBarElement active' : 'NavBarElement ')}
                to = {`/${props.list2[i]}`}>{props.list[i]}</NavLink></li>)
            }
            
            if(props.logged){
                navList.push(
                <li><button className='nav-button' onClick = {props.logout}>
        
                Log Out</button></li>
            )}
            
    }
    else{
        menuButton = ( <button className = "menu-button" key = {20} onClick = {props.expand}>

        {
        <span className = "menu-bar-icon">
            <div className = "openMenu"></div>
            <div className = "openMenu"></div>
            <div className = "openMenu"></div>
        </span>
        }
        
        
        </button>)
    }

    

    const nav = (
        <div className='NavBar'>
        <div className= 'btn-grp'>
        {menuButton}
        </div>
        <div className = {!is_small?'navbar-header':'small_nav-header'}
        >
        <span className="header-f">{props.first}</span>
        <span className = "header-l">{props.last}</span>
        </div>
        <ul type = "none">
        {navList}
        </ul>
        </div>
    );
    return nav;


}
export default Navbar