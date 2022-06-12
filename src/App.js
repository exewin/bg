import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {Login} from "./sites/Login.js"

export const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  )
}