import Card from "../sharedUI/Card";
import ImageUpload from "./ImageUpload";
import { useState,useEffect } from "react";
import "./Course.css"
import Button from "../sharedUI/Button";
const Slide = (props)=>{
    const [text,setText] = useState("")
    const [file,setImageFile] = useState(null)

    useEffect(()=>{
        setState({
            text : props.text,file:props.file
        })
    },[])
    const [state,setState] = useState({ text : text
    , file : file,
    url : ''
    })
    const setFile = (file)=>{
        return{
            ...state,
            file : file
        }
        setImageFile(file)
        props.onSlideUpdate(state.text,state.file)
    }
    const ontextChangeHandler = (event)=>{
        setState(prev=>{
            return {
                ...prev,
                text : event.target.value
            }
        })
        setText(event.target.value)
        props.onSlideUpdate(state.text,state.file)
    }
    return(
        <Card>
        <div className = 'slide'>
        <form>
        <ImageUpload 
        value = {state.file}
        center></ImageUpload>
        <textarea 
        onChange = {ontextChangeHandler}
        type = "textarea" name = "text"
        rows={30} 
        style = {{
            width   : "500px",
            font : 'inherit',
            marginBottom : '30px'
        }}
        
        value = {text}
        ></textarea>
      
        </form>
        <Button>Save Slide</Button>
        </div>
        </Card>
        )

}
export default Slide;