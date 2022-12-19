import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"
import MainScreen from '../../components/MainScreen'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import ReactMarkdown from "react-markdown"
import {useSelector, useDispatch} from "react-redux"
import { fetchCreateNote, STATUSES } from '../../redux/notesSlice';
import Loader from '../../components/Loader/Loader';
import ErrorMsg from '../../components/ErrorMsg/ErrorMsg';

const CreateNote = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {status, isError} = useSelector(state => state.noteList)

  // console.log(noteList)
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(fetchCreateNote(title, content, category))
    resetHandler()
    navigate("/mynotes")
  }

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  }

  return (
    <>
      <MainScreen title="Create Note">
    


  {isError && <ErrorMsg variant="danger">{isError}</ErrorMsg>}
    <Card>
      <Card.Header>Create a new Note</Card.Header>
      <Card.Body>
     

    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required autoComplete='off' />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Content</Form.Label>
        <Form.Control as="textarea" rows={3} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Enter the Content" required autoComplete='off'/>
      </Form.Group>
      {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card> 
            )}
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Category</Form.Label>
        <Form.Control type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required autoComplete='off' />
        <div style={{display:"flex", gap:"10px", marginTop:"20px"}}>
        {status===STATUSES.LOADING && <Loader/>}

        <Button variant="success" type="submit">CREATE NOTE</Button>
        <Button variant="danger" onClick={resetHandler}>RESET FIELDS</Button>
        </div>
       
      </Form.Group>
    </Form>
  

    
      </Card.Body>
      <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
    </Card>



      </MainScreen>
    </>
  )
}

export default CreateNote