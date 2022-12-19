import React, {useState} from 'react'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import LandingPage from './screens/LandingPage/LandingPage'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import MyNotes from './screens/MyNotes/MyNotes'
import LoginScreen from './components/LoginScreen/LoginScreen'
import RegisterScreen from './components/RegisterScreen/RegisterScreen'
import CreateNote from './screens/CreateNote/CreateNote'
import SingleNote from './screens/SingleNote/SingleNote'
import ProfileScreen from './screens/Profile/ProfileScreen'
import Error from './screens/Error/Error'
import { useSelector } from 'react-redux'

const App = () => {
  const [search, setSearch] = useState("")
  const userLogin = useSelector(state=>state.user)
  const {userInfo} = userLogin 

  return ( 
    <BrowserRouter>
      <Header setSearch={setSearch}/>
      <main>
        <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        {userInfo ? (<Route exact path="/mynotes" element={<MyNotes search={search}/>} />) : (<Route exact path="/mynotes" element={<LandingPage/>} />) }
        <Route exact path="/login" element={<LoginScreen/>} />
        <Route exact path="/profile" element={<ProfileScreen/>} />
        <Route exact path="/register" element={<RegisterScreen/>} />
        {userInfo ? (<Route exact path="/createnote" element={<CreateNote/>} />) : (<Route exact path="/createnote" element={<LandingPage/>} />) }
        {userInfo ? (<Route exact path="/note/:id" element={<SingleNote/>} />) : (<Route exact path="/note/:id" element={<LandingPage/>} />)}
        <Route path="*" element={<Error/>} />
        </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  )
}

export default App