import { useState } from "react"
import "./LoginPage.css"
import axios from 'axios'
import Card from "../sharedUI/Card"
import { useContext } from "react"
import { AuthContext } from "../context/auth-context"
import {useNavigate} from 'react-router-dom'
import Button from "../sharedUI/Button"
const BASE_URL = 'https://learningcurve-5b3d2-default-rtdb.firebaseio.com/users.json'
const LoginPage = ()=>{
    const LoginContext= useContext(AuthContext)
    const [state,setState] = useState({
        password : '',
        email : '',
        type : 'student',
    })
    const [isValid,setValid] = useState(false)
    let navigate = useNavigate();
    const checkValidity = ()=>{
        if(state.password.length >=2 && state.email)
        {
            setValid(true)
        }
        else{
            setValid(false)
        }
    }
    const emailUpdater = (event)=>{
        setState(prev=>{
            return {
                ...prev,
                email : event.target.value,
            }
        })
        checkValidity();
    }
    const passwordUpdater = (event)=>{
        setState(prev=>{
            return {
                ...prev,
                password : event.target.value,
            }
        })
        checkValidity();
    }
    const studentUpdater = (event)=>{
        setState(prev=>{
            return {
                ...prev,
                type : event.target.value
            }
        })
        checkValidity();
    }
    let navgiate = useNavigate();
    return(
        <Card>
        <div className = "login">
            <form>
            <label htmlFor = "name">Enter your mail id</label>
            <input type = "text" name = "email" onChange = {emailUpdater}>
            </input>    
            <label htmlFor = "password">Enter your password</label>    
            <input type = "password" onChange = {passwordUpdater}></input>
            <select onChange = {studentUpdater}>
                <option>student</option>
                <option>teacher</option>
            </select>
            <Button disabled = {!isValid} onClick = {(e)=>{
                LoginContext.login(e,state)
                if(state.type ==='student')
                {
                    return navgiate("/student")
                }
                else
                return navgiate("/teacher")

            }}
            className = "gen-btn"
            >Login</Button>
            </form>
        </div>
        </Card>
        )

}

export default LoginPage;