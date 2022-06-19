import Card from "../sharedUI/Card";
import "./Student.css"
import imag from "./dc.jpg"
import Button from "../sharedUI/Button";
const StudentSlide = (props)=>{

    return(
        <Card>
        <div className = 'slide'>
        <img src = {imag}></img>
        <div class = "slide-body">
            {props.text}
        </div>
        <Button>Mark as Completed</Button>
        </div>
        </Card>
        )

}
export default StudentSlide;