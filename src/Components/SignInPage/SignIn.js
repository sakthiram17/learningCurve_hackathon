import "./SignIn.css"
import {useState} from 'react'
import axios from "axios"
import Card from "../sharedUI/Card"
import {useNavigate} from 'react-router-dom'
import Button from "../sharedUI/Button"
const BASE_URL = 'https://learningcurve-5b3d2-default-rtdb.firebaseio.com/users.json'
const SignIn = ()=>{
    const [state,setState] = useState({
        password : '',
        email : '',
        type:'student',
        name : '',
    })
    const [isValid,setValid] = useState(false)
    let navigate = useNavigate();
    const checkValidity = ()=>{
        if(state.password.length >=3 && state.email && state.name)
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
    const nameUpdater = (event)=>{
        setState(prev=>{
            return {
                ...prev,
                name : event.target.value
            }
        })
        checkValidity();
    }
    const signUserUp = async (e)=>{
     
        e.preventDefault();
        let response;
        try{
            response = await axios.post(BASE_URL,state)
        }
        catch(err)
        {

        }
        return navigate('/')
    }

    return(
        <Card>
        <div className = "sign">
        <form>
        <label htmlFor = "email">Enter your Name</label>
        <input required type = "text" name = "email" onChange = {nameUpdater}>
        </input>    
        <label htmlFor = "email">Enter your mail id</label>
        <input required type = "text" name = "email" onChange = {emailUpdater}>
        </input>    
        <label htmlFor = "password">Enter your password</label>    
        <input required  type = "password" onChange = {passwordUpdater}></input>
        <select className ='u' required onChange = {studentUpdater}>
            <option>Student</option>
            <option>Teacher</option>
        </select>
        <Button disabled  =  {!isValid} onClick = {signUserUp}>Sign In</Button>
        </form>
    </div>
    </Card>
    )

}
export default SignIn