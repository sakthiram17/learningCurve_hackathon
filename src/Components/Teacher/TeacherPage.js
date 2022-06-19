import "./TeacherPage.css"
import CourseList from "../Course/CourseList";
const TeacherPage = (props)=>{
    return(
        <div className = 'teacher-page'>
            <CourseList></CourseList>
        </div>
        )
}
export default TeacherPage;