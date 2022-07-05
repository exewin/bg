import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Background } from '../../../components/Background'
import { Box } from '../../../components/Box'
import { Button } from '../../../components/Button'
import { bgs } from '../../../utils/backgroundController'
import paper from "../../../assets/ui/paper.png"
import { useCharacter } from '../../../contexts/CharacterContext'
import { sendMailDB } from '../../../firebase/firestore'
import { capitalizeWord } from '../../../utils/capitalizeWord'
import { ColorHighlight } from '../../../components/ColorHighlight'

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
height:500px;
max-width: 400px;
min-width:400px;
`

const InputReceiver = styled.input`
font-family: 'Shadows Into Light', cursive;
background: none;
border:none;
outline: none;
font-size: 24px;
padding: 0;
margin: 0;
`

const InputMessage = styled.textarea` 
font-family: 'Shadows Into Light', cursive;
background: none;
border:none;
resize: none;
outline: none;
padding: 0;
margin: 0;
font-size: 24px;
height:500px;
max-width: 400px;
min-width:400px;
`

const Author = styled.p` 
text-align: right;
`

const ButtonWrapper = styled.div` 
display:flex;
flex-direction:row;
align-self: center;
`

const SingleMail = styled.div` 
width: 100%;
display:grid;
grid-template-columns: 1fr 1fr;
`

const Mails = styled.div` 
max-height: 380px;
overflow-y: auto;
`

const Reverse = styled.div`
display:flex;
flex-direction:column-reverse;
`


export const Mail = () => {

    const [msg, setMsg] = useState("")
    const [receiver, setReceiver] = useState("")
    const [res, setRes] = useState("")
    const [write, setWrite] = useState(false)
    const [selectedLetter, setSelectedLetter] = useState(null)
    const {character, deleteMail} = useCharacter()

    useEffect(()=>{
        if(write)
            setSelectedLetter(null)
    },[write])

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

    const deleteMessage = () => {
        deleteMail(selectedLetter.i)
        setSelectedLetter(null)
    }

    const selectLetter = (letter) => {
        setSelectedLetter(letter)
        setWrite(false)
    }

    const respond = () => {
        setReceiver(selectedLetter?.author)
        setWrite(true)
    }
    
    return (
        <Background img={bgs[2]}>
            <Wrapper>
                <MenuWrapper>
                    <Button wide onClick={()=>setWrite(true)}><ColorHighlight light={write} match={true}>Write</ColorHighlight></Button>
                    <Box scale={1.2}>
                    <Title>Mailbox:</Title>
                    <Mails>
                        <Reverse>
                        {character.mails && Object.keys(character.mails).map((keyName, i) => (
                            <Button key={keyName} wide size={1.3} onClick={()=>selectLetter({...character?.mails[keyName], i})}>
                                <SingleMail>
                                    <ColorHighlight light={selectedLetter?.i} match={i}>{`${character?.mails[keyName]?.author}`}</ColorHighlight>
                                    <ColorHighlight light={selectedLetter?.i} match={i}>
                                        {new Date(character?.mails[keyName]?.date.toDate()).toLocaleTimeString('en-us', {})}
                                    </ColorHighlight>
                                </SingleMail>
                            </Button>
                        ))}
                        </Reverse>
                    </Mails>
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
                        <InputMessage
                            placeholder="message"
                            value={msg}
                            onChange={(e)=>setMessage(e.target.value)}
                        />
                        <Author>{character?.information?.name}</Author>
                    </Letter>
                    <Button onClick={sendMessage}>Send</Button>
                </LetterBox>
                : selectedLetter &&
                <LetterBox>
                <Title>Read Letter:</Title>
                <Letter bg={paper}>
                    <Dear> Dear {character?.information?.name}</Dear>
                    <Message>{selectedLetter?.msg}</Message>
                    <Author>{selectedLetter?.author}</Author>
                </Letter>
                <ButtonWrapper>
                    <Button onClick={deleteMessage}>Delete</Button>
                    <Button onClick={respond}>Respond</Button>
                </ButtonWrapper>
                </LetterBox>
                }           
            </Wrapper>
        </Background>
    )
}
