import { Box, Button, ButtonGroup, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {ArrowCircleLeft, ArrowCircleRight } from '@mui/icons-material';
import { Portrait } from '../../components/Portrait';
import { selectPortrait } from '../../utils/portraitController';
import { createCharacterDB, userExistsDB } from '../../firebase';
import { useAuth } from "../../AuthContext"
import { useNavigate } from 'react-router-dom';
import { CenteredLoading } from '../../components/CenteredLoading';


const PortraitBox = styled.div`
width:200px;
`

export const Creation = () => {

    const [portrait, setPortrait] = useState(0)
    const [name, setName] = useState("")
    const [charClass, setCharClass] = useState("warrior")
    const {user} = useAuth()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await createCharacterDB(user.uid, {name, portrait, charClass})
        navigate("../gamescreen")
    }

    useEffect(()=>{
        setLoading(true)
        if(user?.uid)
            userExistsDB(user.uid).then(response =>{
                if(response)
                    navigate("../gamescreen")
            })
        setLoading(false)
    },[user])



    return (
        <Box
        sx={{
            borderRadius: '5px',
            padding: '10px',
            width: '300px',
            height: '600px',
            backgroundColor: 'rgba(177,123,255,0.9)',
        }}>
            {loading ? <CenteredLoading/> : 
            <>
                <Typography variant="subtitle1">
                    Create character:
                </Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl>

                        <TextField 
                            required
                            name="name"
                            label="Name" 
                            type="name" 
                            autoComplete="off"
                            size="small" 
                            variant="filled"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />

                        <PortraitBox>
                            <Portrait index={portrait}/>
                            <ButtonGroup variant="contained">
                                <Button onClick={()=>setPortrait(prev=>selectPortrait(prev+1))} sx={{width:'100px'}}><ArrowCircleLeft/></Button>
                                <Button onClick={()=>setPortrait(prev=>selectPortrait(prev-1))} sx={{width:'100px'}}><ArrowCircleRight/></Button>
                            </ButtonGroup>
                        </PortraitBox>

                        <FormLabel sx={{ mt: 1 }}>Class</FormLabel>
                        <RadioGroup 
                            defaultValue={charClass} 
                            name="radio-class"
                            value={charClass}
                            onChange={(e)=>setCharClass(e.target.value)}
                        >
                            <FormControlLabel value="warrior" control={<Radio />} label="Warrior" />
                            <FormControlLabel value="paladin" control={<Radio />} label="Paladin" />
                            <FormControlLabel value="mage" control={<Radio />} label="Mage" />
                        </RadioGroup>

                    </FormControl>
                    <div><Button sx={{ mt: 1 }} variant="contained" type="submit">Ready</Button></div>
                </form>
            </>
            }
        </Box>
    )
}
