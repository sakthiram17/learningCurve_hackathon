import { useEffect ,useState} from "react"
import axios from "axios"
import Course from "./Course"
import Button from "../sharedUI/Button"
import "./CourseList.css"
import Card from "../sharedUI/Card"
const URL = 'https://learningcurve-5b3d2-default-rtdb.firebaseio.com/course.json'
const CourseList = (props)=>{
    const [state,setState] = useState(
        {
            title : '',
            code : '',
            desc : ''
        }
    )
    let initalList = []
    useEffect(()=>{
       
        const fetchData = async ()=>{
            let res;
            initalList = []
            try{
                res = await axios.get(URL)
            }
            catch(err)
            {
                alert(err.message)
                setList([])
                return;
            }

            if(res)
            {
                let data = res.data;
                data = Object.entries(data);
                initalList = []
                for(let i = 0;i<data.length;i++)
                {
                    if(true)
                    {
                        initalList.push(data[i][1])
                    }
                    setList((prev)=>{
                        let temp = [...initalList]
                        return temp;
                    })
                }
            }
          }
        fetchData();
    },[])
    const [list,setList] = useState([])
    const AddCourseHandler = (e)=>{
        e.preventDefault();
        setList(prev=>{
            return [...prev,state]
        })
        const addCourse = async()=>{
            let res;
            try{
                res = await axios.post(URL,state)
            }
            catch(err)
            {
                alert(err)
                return;
            }
        }
        addCourse();
    }
    const RemoveCourseHandler = ()=>{

    }
    const onNameChanger = (event)=>{
        setState(prev=>{
            return {
                ...state,
                title : event.target.value
            }
        })
    }
    const onCodeChanger = (event)=>{
        setState(prev=>{
            return {
                ...state,
                code : event.target.value
            }
        })
    }
    const onDescChanger = (event)=>{
        setState(prev=>{
            return {
                ...state,
                desc : event.target.value
            }
        })
    }
    return(
  
        <div className = 'course-list'>
            {list? 
            list.map((ele)=>{
          
                return (
                    <Course
                    title = {ele.title}
                    desc = {ele.desc}
                    code = {ele.code}
                    enrolled = {ele.enrolled || []}
                    onRemove = {RemoveCourseHandler}
                    >
                    </Course> 
                ) 
              
            }): 'No Course Found try again later'}
            <Card>
            <div className = 'course-list-btn'>
   
            </div>
            <form>
                <label htmlFor = "name">Course Title</label>
                <input onChange = {onNameChanger} type = "text"
                name = "name"
                ></input>
                  <label htmlFor = "code">Course Code</label>
                <input type = "text"
                name = "code"
                onChange = {onCodeChanger}
                ></input>
                      <label htmlFor = "desc">Course Description</label>
                <input type = "text"
                name = "desc"
                onChange = {onDescChanger}
                ></input>
                <Button inverse onClick = {AddCourseHandler}>Add a Course</Button>
            </form>
            </Card>
        </div>
        )
        

}
export default CourseList;