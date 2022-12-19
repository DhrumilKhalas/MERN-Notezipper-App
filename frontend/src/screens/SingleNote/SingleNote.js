import React, {useState, useEffect} from 'react'
import MainScreen from '../../components/MainScreen'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import {useSelector, useDispatch} from "react-redux"
import ReactMarkdown from "react-markdown"
import {fetchUpdateNote} from "../../redux/updateNoteSlice"
import axios from "axios"
import { useParams } from 'react-router-dom';
import {useNavigate} from "react-router-dom"
import ErrorMsg from '../../components/ErrorMsg/ErrorMsg';
import {STATUSES} from "../../redux/updateNoteSlice"
import Loader from '../../components/Loader/Loader';

const SingleNote = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()
  const {status, isError} = useSelector(state=>state.isNoteUpdated)
  

  useEffect(()=>{
    const fetching = async () => {
      const res = await axios.get(`/api/notes/${params.id}`)
      const data = await res.data
      setTitle(data.title)
      setContent(data.content)
      setCategory(data.category)
      setDate(data.updatedAt)
    }
    fetching()
  }, [params.id, date])

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const editHandler = async (e) => {
    e.preventDefault()
    dispatch(fetchUpdateNote(params.id, title, content, category))
    resetHandler()
    navigate("/mynotes")
  }

 

  
  return (
    <>
      <MainScreen title="Edit Note">
    
{isError && <ErrorMsg variant="danger">{isError}</ErrorMsg>}

    <Card>
      <Card.Header>Edit your Note</Card.Header>
      <Card.Body>


     


    <Form onSubmit={editHandler}>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Edit the Title" value={title} onChange={(e)=>setTitle(e.target.value)} required autoComplete='off' />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Content</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Edit the Content" value={content} onChange={(e)=>setContent(e.target.value)} required autoComplete='off' />
      </Form.Group>

      {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

      <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Category</Form.Label>
        <Form.Control type="text" placeholder="Edit the Category" value={category} onChange={(e)=>setCategory(e.target.value)} required autoComplete='off' />
      </Form.Group>

        {status===STATUSES.LOADING && <Loader/>}
      <div style={{margingTop:"30px"}}>
      <Button variant="warning" type="submit">EDIT NOTE</Button>
      
      </div>

    </Form> 
    
        
      </Card.Body>
      <Card.Footer className="text-muted">
          Last Updated on - {date.substring(0, 10)}
        </Card.Footer>
    </Card>
  
      </MainScreen>
    </>
  )
}

export default SingleNote