import Button from "../sharedUI/Button";
import "./Student.css"
import { useNavigate } from "react-router-dom";

const StudentCourse = (props)=>{
    let navigate = useNavigate();
    return(
        <div className="student-course">
        <div className = 'course-code'>{props.code}</div>
        <div className = 'course-title'>{props.title}</div>
        <div className = 'course-desc'>{props.desc}</div>
        <Button onClick = {()=>{
            return navigate('/student/quiz/'+props.code)
        }}inverse>Take Quiz</Button>
        <Button onClick = {()=>{
            return navigate('/student/learn/'+props.code)
        }}>Start Learning</Button>
        </div>
        )

}
export default StudentCourse;