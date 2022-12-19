import React, { useEffect } from 'react'
import { Badge, Button} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import MainScreen from '../../components/MainScreen'
import "./MainScreen.css"
import Accordion from 'react-bootstrap/Accordion';
import {useDispatch, useSelector} from "react-redux"
import {fetchGetAllNotes} from "../../redux/notesSlice"
import ErrorMsg from "../../components/ErrorMsg/ErrorMsg"
import { STATUSES } from '../../redux/userSlice'
import Loader from "../../components/Loader/Loader"
import {fetchDeleteNote} from "../../redux/deleteNoteSlice"
import "./MyNotes.css"


const MyNotes = ({search}) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const noteList = useSelector(state=>state.noteList)
  const {status, isError, notes, success:successCreate} = noteList

  const userLogin = useSelector(state=>state.user)
  const {userInfo} = userLogin

  const {success:updateSuccess} = useSelector(state=>state.isNoteUpdated)
  const {status:deleteStatus, isError:deleteError, success:deleteSuccess} = useSelector(state=>state.isNoteDeleted)
  

  

  useEffect(()=>{
dispatch(fetchGetAllNotes())

if(!userInfo){
  navigate("/")
}
  }, [dispatch, navigate, userInfo, successCreate, updateSuccess, deleteSuccess])
   


    const handleDelete = (id) => {
        if(window.confirm("Are you sure?")){
          dispatch(fetchDeleteNote(id))
        }
         
        
    }

  return (
    <MainScreen title={`Welcome Back ${userInfo.name}...`}>
        <Link to="/createnote">
            <Button style={{marginLeft:10, marginBottom:30}} size="md" variant="success">Create New Note</Button>
        </Link>


        {/* =========== */}
        {isError && <ErrorMsg variant="danger">{isError}</ErrorMsg>}
        {deleteError && <ErrorMsg variant="danger">{deleteError}</ErrorMsg>}

        {status===STATUSES.LOADING && <Loader/>}
        {deleteStatus===STATUSES.LOADING && <Loader/>}
    
        
{notes?.filter((filteredNote)=>(
  filteredNote?.title.toLowerCase().includes(search.toLowerCase())
)).map((note, index) => {
    return(
        <Accordion key={index} style={{marginBottom:"10px"}} className="noteaccmain">
      <Accordion.Item eventKey="0" className='noteaccitem'>
        <Accordion.Header className='noteacctitle'>{note?.title}</Accordion.Header>
        <Accordion.Body className='noteaccbody'>
        <div className="noteaccbadgecontentbtn">
        <Badge className="noteaccbadgeinner">Category - {note?.category}</Badge>
         <div className='noteacccontent'>{note?.content}</div>
         <div className='noteacccreatedat'>Created on: {note?.createdAt?.slice(0, 10)}</div>
        </div> 
      
      <div className='noteaccbtns'>
      <Button variant="warning" onClick={()=>navigate(`/note/${note?._id}`)} className="noteaccbtn1" size="sm">Edit</Button>
        <Button variant="danger" onClick={() => handleDelete(note?._id)} className="noteaccbtn2" size="sm">Delete</Button>
      </div>
       
        
       
        </Accordion.Body>
      </Accordion.Item>
    
    </Accordion>
    )
})}
        
{/* =========== */}


    </MainScreen>
  )
}

export default MyNotes





    
  



