import axios from "axios";
import { AuthContext } from "../context/auth-context";
import CourseList from "../Course/CourseList";
import { useEffect,useState } from "react";
import Card from "../sharedUI/Card";
import StudentCourse from "./StudentCourse";
import { useContext } from "react";
const BASE_URL = 'https://learningcurve-5b3d2-default-rtdb.firebaseio.com/course.json'
let List = []
const StudentCourseList = (props)=>{
    const [courseList,setCourseList] = useState([]) 
    let login = useContext(AuthContext)
    let id = login.userId;


    useEffect(() =>{
         let res;
         List = []
         const fetchData = async () =>{
            
            try{
               res = await axios.get(BASE_URL)
            }
            catch(err)
            {
                alert(err.message)
                return
            }
            let data = res.data;
            if(!data)
            {
                return;
            }
            data = Object.entries(data);
            List = []
            for(let i = 0;i<data.length; i++)
            {
                let enList = data[i][1].enrolled;
                if(enList)
                {   
                    if(enList.find(ele=>{
                        return id === ele}))
                        {
                            List.push(data[i][1])
                        }
                }
            }
           
            setCourseList(prev=>{
                return [...List]
            })
        }
        fetchData();
        },[])

    return(
        <div>
            {courseList.map((ele)=>{
                return <Card><StudentCourse
                title = {ele.title}
                desc = {ele.desc}
                code = {ele.code}
                enrolled = {ele.enrolled || []}
                >
                </StudentCourse>  </Card>
            })}
        </div>
        )
}
export default StudentCourseList;