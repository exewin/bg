import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import {Login} from "./sites/Login"
import {Dashboard} from "./sites/Dashboard"
import {Creation} from "./sites/dashboard/Creation"
import { Gamescreen } from "./sites/dashboard/Gamescreen"
import { Character } from "./sites/dashboard/gamescreen/Character"
import { Mission } from "./sites/dashboard/gamescreen/Mission"
import { Mail } from "./sites/dashboard/gamescreen/Mail"
import { Work } from "./sites/dashboard/gamescreen/Work"
import { CharacterProvider } from "./contexts/CharacterContext"
import { Players } from "./sites/dashboard/gamescreen/Players"
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export const App = () => {
  return(
      <AuthProvider>
        <CharacterProvider>
            <DndProvider backend={HTML5Backend}>
          <BrowserRouter>
            <Routes>
              <Route index element={<Login/>}/>
              <Route path="dashboard" element={<Dashboard/>}>
                <Route path="creation" element={<Creation/>}/>
                <Route path="gamescreen" element={<Gamescreen/>}>
                  <Route path="character" element={<Character/>}/>
                  <Route path="mission" element={<Mission/>}/>
                  <Route path="mail" element={<Mail/>}>
                    <Route path=":name" element={<Mail/>}/>
                  </Route>
                  <Route path="work" element={<Work/>}/>
                  <Route path="players" element={<Players/>}>
                    <Route path=":name" element={<Players/>}/>
                  </Route>
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
          </DndProvider>
        </CharacterProvider>
      </AuthProvider>
  )
}