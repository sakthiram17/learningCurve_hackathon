import { useState,useReducer,useEffect} from "react"
import Button from "../sharedUI/Button";
import Slide from "./Slide"
import Card from "../sharedUI/Card"
let no_of_slides = 6;
let initial_state = []
for(let i =0;i<6;i++)
{
    initial_state.push(({file : '',text: ''}))
}
const Slides = () =>{
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
        {<Slide text = {SlidesList[currentPage].text}
         file =  {SlidesList[currentPage].file}
         onSlideUpdate = {UpdateState}
        ></Slide>}
    <div>
    <Button onClick = {moveBackward}>Prev</Button>
    <Button onClick = {moveForwad} inverse>Next</Button>
    </div>
   
    </div>
    )

}
export default Slides;