import "./Question.css"
import {useEffect, useState} from 'react'
import Card from "../../sharedUI/Card";
const Question = (props)=>{
    let answerContent = null;
    const [explanation,setExplanation] = useState(null);
    const [chosenOption,setChosenOption] = useState(null);
    useEffect(()=>{
        answerContent = null;
   
        setChosenOption(null)
    },[])
    const onAnswerHanlder = (event)=>{
        setChosenOption(event.target.innerHTML);
        setExplanation(props.explanation)
       
        props.onSave(chosenOption)
        if(event.target.innerHTML===props.rightOption)
        {
          answerContent = 
          <div className="answer">
            <div className ='correct'>
                You have Chosen the Right Option
            </div>
            <div className="explanation">
                {props.explanation}
            </div>
          </div>
           setExplanation(answerContent)
        }
        else{
            answerContent = 
          <div className="answer">
            <div className ='wrong'>
                You have Chosen the wrong Option,Please retry again
            </div>
            <div className="explanation">
                {props.explanation}
            </div>
            <button className = 'retry-btn' onClick = {
                ()=>{
                    setExplanation('')
                }
            }>Retry</button>
          </div>
        }
       
    }
    return(
        <Card>
        <div className = 'question'>
        <div className = 'question-body'>
            {props.question}
        </div>
        <div className = 'options'>
            <div className = 'option'>
                <button id = 'A' onClick = {onAnswerHanlder}
                >A</button>
                <label htmlFor="A">
                    {props.A}
                </label>
            </div>
            <div className = 'option'>
                <button id = 'B' onClick = {onAnswerHanlder}>B</button>
                <label htmlFor="B">
                    {props.B}
                </label>
            </div>
            <div className = 'option'>
                <button id = 'C' onClick = {onAnswerHanlder}>C</button>
                <label htmlFor="C">
                    {props.C}
                </label>
            </div>
            <div className = 'option'>
                <button id = 'D' onClick = {onAnswerHanlder}>D</button>
                <label htmlFor="A">
                    {props.D}
                </label>
                </div>
            </div>
        <div className = 'explanation'>
        {chosenOption?explanation:null}
        </div>
       
        <button  onClick = {props.moveBackword}>Prev</button>
        <button onClick = {props.moveForward}>Next</button>
        <button onClick = {()=>{
            props.onSave(chosenOption)
        }}>Save</button>
        
        </div>
        </Card>
        )
}
export default Question;