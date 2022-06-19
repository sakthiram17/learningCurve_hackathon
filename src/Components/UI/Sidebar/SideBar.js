import React from 'react'
import { useEffect,useState } from 'react';
import {NavLink} from 'react-router-dom'
import './SideBar.css'

const SideBar = (props)=>{
    let navElementList = props.list;
    let header = props.header;
    let navList = [];
    // if(props.disabled)
    // {
    //     return(<div className = 'SideBar'></div>)
    // }
    for(var i = 0;i<props.list.length;i++)
    {
            {
                navList.push(<li><NavLink 
              
                    className={({ isActive }) => (isActive ? 'SiderBarElement active' : 'NavBarElement ')}
                    to = {`/${props.list2[i]}`}>{props.list[i]}</NavLink></li>)
            }
    }
    if(props.logged)
    {
        navList.push(<button className = "nav-button" onClick = {props.logout}>Log Out</button>)
    }
  
    const closeClass =  props.disabled ? ' close' : ' open';
    const classes = closeClass + ' SideBar'; 
    const nav = (
        <div className={classes}>
        
        <ul>
    
        {navList}
        </ul>
        
        </div>
    );
    return nav;


}
export default SideBar