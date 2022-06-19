import { useState,useEffect } from "react";
import "./Course.css"
import Card from "../sharedUI/Card";
import {useNavigate} from "react-router-dom"
import Button from "../sharedUI/Button"
import axios from "axios";
const BASE_URL = 'https://learningcurve-5b3d2-default-rtdb.firebaseio.com/course.json'
const URL = 'https://learningcurve-5b3d2-default-rtdb.firebaseio.com/course'
const Course = (props)=>{
    let navigate = useNavigate();
    let initialList = [];
    useEffect(() =>{
    },[])
    const showList = useState(false);
    const [enrolledList,setenrolledList] = useState(props.enrolled);
    const [studentList,setStudentList] = useState([]);
    const [error,setError] = useState(null);
    const [email,updateMail] = useState(null);
    const [id,setId] = useState(null);
    
    const AddStudentHanlder = (event)=>{
        event.preventDefault();
        setenrolledList((prev)=>{
            if(prev.find(
                (ele)=>{
                    return ele === email
                }
            ))
            {
                alert('Student already added')
                return [...prev]
            }
            return [...prev,email]
        })
    }
    const showStudentList = (event)=>{
        let res;
        const getCourseList= async ()=>{
             
          try{
            res =  await axios.get(BASE_URL)
          }
          catch(err)
          {
            alert(err.message)
            return
          }
          let found = false;
        let data;
        if(res)
        {
        data =res.data;
        }
        else{
            data = null;
        }
     
        let pos = 0;
        if(data)
        {    data = Object.entries(data);
            for(let i = 0;i<data.length;i++)
            {
                if(data[i][1].code === props.code)
                {
                    pos = i;
                    found = true;
                    setId(data[i][0])
                }
            }
         }
        } 
       
        if(studentList.length>=1)
        {
            setStudentList([])
        }  
        else{
            setStudentList(enrolledList)
        }
       
    }
    useEffect(()=>{
        const updateDB = async ()=>{
          
            await axios.patch(URL + '/'+id + '.json',{
                title : props.title,
                name : 
                props.name,
                desc : props.desc,
                code: props.code,
                enrolled : enrolledList
            })
        }
        if(enrolledList !== props.enrolled)
        {
        //updateDB();
        }
        if(studentList.length>=1)
        {
            setStudentList([])
        }  
        else{
            setStudentList(enrolledList)
        }
    },[enrolledList])
    const mailUpdater = (event) =>{
        updateMail(event.target.value)
    }
    return(
        <Card>
            {error}
        <div className = 'course'>
        <div className = 'course-code'>{props.code}</div>
        <div className = 'course-title'>{props.title}</div>
       
        <div className = 'course-desc'>{props.desc}</div>
        <form className = 'course-form'>
        <label htmlFor="email">
            Enter the Email of the Student to be added
        </label>
        <input onChange = {mailUpdater} type = "text" name = "email">
        </input>        
        </form>
        <Button onClick = {AddStudentHanlder}>Add Student</Button>
        <Button inverse onClick = {showStudentList}>Toggle Enrolled List</Button>
        
        <div className = 'enrolled-list'>
            List of Students Enrolled
        <ol>
            {studentList.map(ele=>{
                return <li>{ele}</li>
            })}
        </ol>
        </div>
        <div>
        <Button
        onClick = {()=>{
            return navigate('/teacher/'+props.code)
        }}
        >Upload Material</Button>
        </div>
        </div>
        </Card>
        )


}
export default Course;