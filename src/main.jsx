import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Form } from '../Pages/Login'
import { Home } from '../Pages/Home'
import {SearchPod} from '../Pages/Search'
import {Profile} from '../Pages/Profile'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Search' element={<SearchPod />} />
        <Route path='/Profile' element={<Profile />} />
      </Routes>
    </Router>
  </StrictMode>
)
