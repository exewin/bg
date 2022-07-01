import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Portrait } from '../../components/Portrait'
import { selectPortrait } from '../../utils/portraitController'
import { createCharacterDB, userExistsDB } from '../../firebase/firestore'
import { useAuth } from "../../contexts/AuthContext"
import { useNavigate } from 'react-router-dom'
import { CenteredLoading } from '../../components/CenteredLoading'
import { Background } from '../../components/Background'
import { bgs } from '../../utils/backgroundController'
import card from "../../assets/ui/missionCard.png"
import { Box } from '../../components/Box'
import { Button } from '../../components/Button'
import { Icon } from '../../components/Icon'
import { classDescs } from '../../utils/classDescription'
import { capitalizeWord } from '../../utils/capitalizeWord'
import { nameRegex } from '../../utils/regExps'


const PortraitBox = styled.div`
width:200px;
`

const Title = styled.h3``
const Description = styled.p`
text-align: left;
font-size: 0.8em;
`

const Container = styled.div` 
height: 90vh;
width:100%;
overflow-y: auto;
overflow-x: hidden;
`

const Input = styled.input` 
height:25px;
width: 95%;
`

const Wrapper = styled.div` 
display:flex;
align-items:center;
justify-content: center;
`

const IconWrapper = styled.div` 
display:flex;
align-items:center;
justify-content: center;
gap:2px;
`

const Warning = styled.div` 
color:#f99;
font-size: 12px;
`

export const Creation = () => {

    const [portrait, setPortrait] = useState(0)
    const [name, setName] = useState("")
    const [nameWarning, setNameWarning] = useState("")
    const [charClass, setCharClass] = useState("warrior")
    const {user} = useAuth()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!nameRegex.test(name)){
            return setNameWarning("Name must be 3-12 characters long and can contain only English letters.")
        }

        try{
            await createCharacterDB(user.uid, {name, portrait, charClass})
            navigate("../gamescreen")
        } catch (e) {
            setNameWarning(e.message)
        }
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
        <Container>
            <Background img={bgs[3]} css={{position:'relative'}}>
            {loading ? <CenteredLoading/> : 
                    <>
                        <Box bg={card} scale={1}>
                            <Title>
                                Create Character:
                            </Title>
                                <Input
                                    required
                                    name="name"
                                    placeholder="Name" 
                                    type="name" 
                                    autoComplete="off"
                                    value={name}
                                    onChange={(e)=>setName(capitalizeWord(e.target.value))}
                                />
                                {nameWarning && <Warning>{nameWarning}</Warning>}
                                <PortraitBox>
                                    <Portrait index={portrait}/>
                                        <Wrapper>
                                            <Button wide size={0.5} onClick={()=>setPortrait(prev=>selectPortrait(prev+1))}>(---</Button>
                                            <Button wide size={0.5} onClick={()=>setPortrait(prev=>selectPortrait(prev-1))}>---)</Button>
                                        </Wrapper>
                                </PortraitBox>
                                    
                        </Box>
                        <Box scale={0.8} bg={card}>
                            <Title>
                                {capitalizeWord(charClass)}
                            </Title>
                            <IconWrapper>
                                <Icon selected={charClass === 'warrior'} icon={0} onClick={()=>setCharClass("warrior")}/>
                                <Icon selected={charClass === 'paladin'} icon={1} onClick={()=>setCharClass("paladin")}/>
                                <Icon selected={charClass === 'mage'} icon={2} onClick={()=>setCharClass("mage")}/>
                            </IconWrapper>
                            {classDescs(charClass)}
                            <Button onClick={handleSubmit}>Ready</Button>
                        </Box>
                    </>
            }
            </Background>
        </Container>
    )
}



// <RadioGroup 
// defaultValue={charClass} 
// name="radio-class"
// value={charClass}
// onChange={(e)=>setCharClass(e.target.value)}
// >