import { useState,useReducer,useEffect} from "react"
import Button from "../sharedUI/Button";
import StudentSlide from "./StudentSlide"
import Card from "../sharedUI/Card"
import slideimg from "./dc.jpg"
let no_of_slides = 6;
let initial_state = []
for(let i =0;i<6;i++)
{
    initial_state.push(({file : {slideimg},text: 'A DC Machine is an electro-mechanical energy conversion device. There are two types of DC machines; one is DC generator, and another one is known as DC motor. A DC generator converts mechanical power (ωT) into DC electrical power (EI), whereas, a DC motor converts d.c electrical power into mechanical power'}))
}
const StudentSlides = () =>{
    const [currentPage,setCurrentPage] = useState(0);
    const [SlidesList,setSlidesList] = useState(initial_state)
    const moveForwad = ()=>{
        if(!(currentPage<no_of_slides-1))
        {
            alert('End of Slide, Please Increase no of slides to continue')
            return;
        }
        setCurrentPage(currentPage +1)
    }
    const moveBackward = ()=>{
        if(currentPage<1)
        {
            alert('This is the First Page!!!!')
            return;
        }
        setCurrentPage(currentPage -1)
    }
    const UpdateState = (text,file)=>{
        setSlidesList(prev=>{
            let temp = [...prev];
            temp[currentPage] = {text : text,file:file}
            return temp;
        })
    }
    
    return(
    <div className = 'slides'>
     <Card>
       Slide Number : {currentPage+1}
    </Card>
        {<StudentSlide text = {SlidesList[currentPage].text}
         file =  {SlidesList[currentPage].file}
        ></StudentSlide>}
    <div>
    <Button onClick = {moveBackward}>Prev</Button>
    <Button onClick = {moveForwad} inverse>Next</Button>
    </div>
   
    </div>
    )

}
export default StudentSlides;