import React, { useState } from 'react'
import styled from 'styled-components'
import { Background } from '../../../components/Background'
import { Box } from '../../../components/Box'
import { Button } from '../../../components/Button'
import { bgs } from '../../../utils/backgroundController'
import paper from "../../../assets/ui/paper.png"
import { useCharacter } from '../../../contexts/CharacterContext'
import { findUserByNameDB, sendMailDB } from '../../../firebase/firestore'
import { capitalizeWord } from '../../../utils/capitalizeWord'

const Wrapper = styled.div` 
display:flex;
flex-wrap:wrap;
flex-direction: row;
font-family: 'Joan', serif;
color:white;
text-shadow: 1px 1px black;
`

const MenuWrapper = styled.div` 
display:flex;
flex-direction:column;
align-items: center;
`


const LetterBox = styled.div`
display:flex;
flex-direction:column;
`

const Letter = styled.div` 
background-image: url(${props=>props.bg});
background-size:contain;
background-repeat: no-repeat;
font-family: 'Shadows Into Light', cursive;
width:420px;
height: 604px;
padding: 30px 40px;
display:flex;
flex-direction: column;
font-size: 24px;
color:black;
text-shadow: none;
margin-bottom: 5px;
`

const Title = styled.h3` 
`

const Dear = styled.div` 
`

const Message = styled.div` 
`

const InputReceiver = styled.input`
font-family: 'Shadows Into Light', cursive;
background: none;
border:none;
outline: none;
font-size: 24px;
`

const InputMessage = styled.textarea` 
font-family: 'Shadows Into Light', cursive;
background: none;
border:none;
resize: none;
outline: none;
font-size: 24px;
height:500px;
max-width: 400px;
min-width:400px;
`

const Author = styled.p` 
text-align: right;
`

export const Mail = () => {

    const [msg, setMsg] = useState("")
    const [receiver, setReceiver] = useState("")
    const [res, setRes] = useState("")
    const [write, setWrite] = useState(false)
    const [selectedLetter, setSelectedLetter] = useState(null)
    const {character} = useCharacter()

    const sendMessage = () => {
        if(!msg || !receiver){
            return setRes("Message or Receiver can't be empty.")
        }
        else{
            sendMailDB(receiver, msg, character.information.name).then(response=>{
                if(response){
                    setRes("Success.")
                    setReceiver("")
                    setMsg("")
                } else {
                    setRes("Error. Make sure the name is correct.")
                }
            })
        }
    }

    const setMessage = (str) => {
        if(str.length > 480){
            setRes("Reached maximum message length.")
            str.length = 480
        }
        setMsg(str)
    }

    const selectLetter = (letter) => {
        setSelectedLetter(letter)
        setWrite(false)
    }
    
    return (
        <Background img={bgs[2]}>
            <Wrapper>
                <MenuWrapper>
                        <Button wide onClick={()=>setWrite(true)}>Write</Button>
                    <Box scale={1.2}>
                    <Title>Mailbox:</Title>
                    {character.mails && Object.keys(character.mails).map((keyName, i) => (
                        <Button onClick={()=>selectLetter(character?.mails[keyName])}>
                            {`${character?.mails[keyName]?.author}` /*${!character?.mails[keyName]?.read ? "(new)" : "(old)"}*/}
                        </Button>
                    ))}
                    </Box>
                </MenuWrapper>
                {write ? 
                <LetterBox>
                    <Title>Send Letter: {res && res}</Title>
                    <Letter bg={paper}>
                        
                        <Dear>Dear <InputReceiver
                            placeholder="receiver"
                            value={receiver}
                            onChange={(e)=>setReceiver(capitalizeWord(e.target.value))}
                        /></Dear>
                        <Message><InputMessage
                            placeholder="message"
                            value={msg}
                            onChange={(e)=>setMessage(e.target.value)}
                        /></Message>
                        <Author>{character?.information?.name}</Author>
                    </Letter>
                    <Button onClick={sendMessage}>Send</Button>
                </LetterBox>
                : selectedLetter &&
                <LetterBox>
                <Title>Read Letter:</Title>
                <Letter bg={paper}>
                    <Dear> Dear {character?.information?.name}</Dear>
                    <Message>{selectedLetter.msg}</Message>
                    <Author>{selectedLetter.author}</Author>
                </Letter>
                <Button>Delete</Button>
                </LetterBox>
                }           
            </Wrapper>
        </Background>
    )
}
