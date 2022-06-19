import "./Backdrop.css"
const Backdrop = (props)=>{
    if(props.disabled)
    {
        return
    }
    return(
        <div className = 'backdrop' onClick = {props.offSideBar}>

        </div>
    )

}
export default Backdrop;