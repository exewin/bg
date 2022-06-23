import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import {Login} from "./sites/Login"
import {Dashboard} from "./sites/Dashboard"
import {Creation} from "./sites/dashboard/Creation"
import { Gamescreen } from "./sites/dashboard/Gamescreen"
import { Character } from "./sites/dashboard/gamescreen/Character"
import { Mission } from "./sites/dashboard/gamescreen/Mission"
import { Chat } from "./sites/dashboard/gamescreen/Chat"
import { Work } from "./sites/dashboard/gamescreen/Work"
import { CharacterProvider } from "./contexts/CharacterContext"

export const App = () => {
  return(
      <AuthProvider>
        <CharacterProvider>
          <BrowserRouter>
            <Routes>
              <Route index element={<Login/>}/>
              <Route path="dashboard" element={<Dashboard/>}>
                <Route path="creation" element={<Creation/>}/>
                <Route path="gamescreen" element={<Gamescreen/>}>
                  <Route path="character" element={<Character/>}/>
                  <Route path="mission" element={<Mission/>}/>
                  <Route path="chat" element={<Chat/>}/>
                  <Route path="work" element={<Work/>}/>
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </CharacterProvider>
      </AuthProvider>
  )
}