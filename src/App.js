import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./AuthContext"
import {Login} from "./sites/Login"
import {Dashboard} from "./sites/Dashboard"
import {Creation} from "./sites/dashboard/Creation"
import { Character } from "./sites/dashboard/gamescreen/Character"
import { Gamescreen } from "./sites/dashboard/Gamescreen"

export const App = () => {
  return(
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Login/>}/>
            <Route path="dashboard" element={<Dashboard/>}>
              <Route path="creation" element={<Creation/>}/>
              <Route path="gamescreen" element={<Gamescreen/>}>
                <Route path="character" element={<Character/>}/>
                <Route path="gamescreen" element={<Gamescreen/>}/>
                <Route path="gamescreen" element={<Gamescreen/>}/>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
  )
}