import "./Quiz.css"
import Question from "../Question/Question";
import { useState,useReducer } from "react";
import Card from "../../sharedUI/Card"
let content = null;
const Quiz = (props)=>{
   
    let questionList = [];
    const initialOptions = [];
    for(let i = 0;i<questionList.length;i++)
    {
        initialOptions.push(0)
    }
    
   
    const [currentQues,setCurrentQues] = useState(0);
    const [mark,setMark] = useState(null);
    const [chosenOptions,setChosenOptions] = useState(initialOptions)
    const [savedState,setSavedState] =  useState(initialOptions)
  
    const moveForward= ()=>{
   
        if(questionList.length-1===currentQues)
        {

            return;
        }
        setCurrentQues(currentQues+1);
    }
    const moveBackword = ()=>{
        if(currentQues<1)
        {
            alert('There is no question before this')
            return
        }
        setCurrentQues(currentQues-1);

    }
    const upDateMark=()=>{
        let m = 0;
        for(let i = 0;i<chosenOptions.length;i++)
        {
            if(chosenOptions[i]===props.questions[i].rightOption)
            {
                m++;
            }
        }
        m = m/(chosenOptions.length);
        setMark(m)
    }
    const onSaveHanlder = (option)=>{
        setChosenOptions((currentList)=>{
            let temp = [...currentList]
            temp[currentQues] = option;
            return temp;
        })
    
        upDateMark();
    }

    for(let i = 0;i<props.questions.length;i++)
    {
        questionList.push(<Question
        question = {props.questions[i].question}
        A = {props.questions[i].A}
        B = {props.questions[i].B}
        C = {props.questions[i].C}
        D = {props.questions[i].D}
        explanation = {props.questions[i].explanation}
        rightOption = {props.questions[i].rightOption}
        moveForward = {moveForward}
        moveBackword = {moveBackword}
        onSave = {onSaveHanlder}
        saved = {!!chosenOptions[i]}
        >
        </Question>)
    
    }
    questionList.push(
        <Card>
            your mark in the quiz is {mark}
        </Card>
    )
 
    return(
    <div className = 'quiz'>
        {questionList[currentQues]}
    </div>
    )

}
export default Quiz;