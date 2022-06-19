import logo from './logo.svg';
import './App.css';
import SideBar from './Components/UI/Sidebar/SideBar';
import Navbar from './Components/UI/Navbar/Navbar';
import Backdrop from './Components/UI/Backdrop/Backdrop';
import { useEffect, useState } from 'react';
import Question from './Components/UI/Question/Question';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import {AuthContext} from './Components/context/auth-context'
import SignIn from './Components/SignInPage/SignIn';
import LoginPage from "./Components/LoginPage/LoginPage"
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import TeacherPage from './Components/Teacher/TeacherPage';
import Course from "./Components/Course/Course"
import Slides from './Components/Course/Slides';
import Student from './Components/Student/Student';
import Quiz from './Components/UI/Quiz/Quiz';
import StudentSlides from './Components/Student/StudentSlides';

const BASE_URL = 'https://learningcurve-5b3d2-default-rtdb.firebaseio.com/users.json'
const QUESTIONS = {
  question : 'What is the answer to this question',
  A : 'option A',
  B : 'option B',
  C : 'option C',
  D :'option D',
  rightOption : 'C',
  explanation : 'Option C is the right answer to the question'
}
let QUESTIONS_LIST = [];
for(let i = 0;i<5;i++)
{
  QUESTIONS_LIST.push(QUESTIONS)
}
QUESTIONS_LIST[1] = {
  question : 'What is the answer to this question',
  A : 'option A .......',
  B : 'option B.......',
  C : 'option C......',
  D :'option D........',
  rightOption : 'C',
  explanation : 'Option C is the right answer to the question'

}
function App() {
  const [sidebarOn,setSidebar] = useState(false);
  const [loggedIn,setLogin] = useState(false);
  const [userMail,setUserMail] = useState(null)
  const [type ,setType ] = useState('student')
  let content;
  let navList = [];
  let navList2 = [];
  if(loggedIn && type === 'student')
  {
    content = <Routes>
      <Route path = '/student/quiz/:code'
      element = {<Quiz
      questions = {QUESTIONS_LIST}
      >

      </Quiz>}
      ></Route>
      <Route path = '/student/learn/:code' 
      element = {<StudentSlides></StudentSlides>}
      ></Route>
      
      <Route path = '/student' 
      element = {<Student ></Student>}
      ></Route>
      
    </Routes>
    navList = ["Dashboard"]
    navList2 = ["student"]
  }
 
  if(loggedIn && type === 'teacher')
  {
    content = <Routes>
      <Route path = '/teacher' exact
      element = {<TeacherPage></TeacherPage>}
      ></Route>
      <Route path = "/teacher/:code"
      element = {<Slides></Slides>}
      >

      </Route>
    </Routes>
    navList = ["Dashboard"]
    navList2 = ["teacher"]
     
  }
  if(!loggedIn)
  {
    content = <Routes>
        <Route path = '/' exact
      element = {<LoginPage></LoginPage>}
      ></Route>
      <Route path = '/login' exact
      element = {<LoginPage></LoginPage>}
      ></Route>
      <Route path = '/signup' exact
      element = {<SignIn></SignIn>}
      ></Route>
      
    </Routes>
    navList = ["Sign Up","Login"]
    navList2 = ['signup','login']
  }
  const sidebarSwitcher = ()=>{
    setSidebar(true)
  }
  const offSidebar = ()=>{
    setSidebar(false)
  }
  const initialLogin = ()=>{
    let data = JSON.parse(localStorage.getItem('login-token'))
    console.log(data)
    if(data)
    {
      setUserMail(data.email)
      setType(data.type)
      setLogin(true);
    }
  }
  useEffect(()=>{
    initialLogin();
  },[])
  const LogUserIn = async (e,state)=>{
    e.preventDefault();
    if(state.email !== '' && state.password !=='')
    {
        const response = await axios.get(BASE_URL)
        let data = response.data;
        data = Object.entries(data)
       
        for(let i = 0;i<data.length;i++)
        {
            if((data[i][1].email===state.email) && (state.password ==data[i][1].password))
            {
                setUserMail(data[i][1].email)
              
                setType(data[i][1].type)
            }
        }
        
        localStorage.setItem('login-token',JSON.stringify(state))
    setLogin(true);

   
    }
} 
  const LogOutHandler = ()=>{
    setLogin(false);
    localStorage.removeItem('login-token')
  }

  return (
    <AuthContext.Provider value = {{isLoggedIn:loggedIn,login:LogUserIn,logout:LogOutHandler,userId:userMail}}>
    <BrowserRouter>
    <div className="App">
      <Navbar
      list = {navList}
      first = "Learning"
      last = "Curve"
      expand = {sidebarSwitcher}
      list2 = {navList2}
      off = {offSidebar}
      logout = {LogOutHandler}
      logged = {loggedIn}
      ></Navbar>
     <SideBar
     disabled = {!sidebarOn}
      list = {navList}
      list2 = {navList2}
      logged = {loggedIn}
      logout = {LogOutHandler}
     >
     </SideBar>
     <Backdrop
     disabled = {!sidebarOn}
     offSideBar = {offSidebar}
     ></Backdrop>
     {content}
    </div> 
    </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
