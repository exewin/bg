import React, { useState } from 'react'
import styled from 'styled-components'
import bag from "../assets/icons/bag.png"
import plus from "../assets/ui/plus.png"
import disabled from "../assets/ui/disabled_plus.png"
import hovered from "../assets/ui/hovered_plus.png"
import { capitalizeWord } from '../utils/capitalizeWord'

const Button = styled.div` 
padding:0;
margin-left: 15px;
width:17px;
align-items: center;
vertical-align: middle;
display:flex;
`

const AddButton = styled(Button)` 
cursor: pointer;
`

const DisabledButton = styled(Button)` 
`

const Detail = styled.div` 
display:grid;
grid-template-columns: 70px 50px 48px 50px;
align-items: center;
position: relative;
user-select: none;
`

const Number = styled.span` 
color:${props=>props.buffed ? "lime" : "white"};
font-family: 'Zen Kaku Gothic New', sans-serif;
padding-right: 2px;
text-align:right;
`

const Img = styled.img` 
width:${props=>props.w}px;
`

const BuffedTooltip = styled.div` 
width: fit-content;
color:white;
font-family: 'Joan', serif;
padding: 5px 10px;
z-index: 1;
font-size: 10px;
pointer-events: none;
width: 100px;
overflow-x: visible;
overflow-y: hidden;
height: 10px;
`


export const StatRow = ({name, stat, cost, money, hover, setHover, addPoint, buffed}) => {

    const [ownHover, setOwnHover] = useState(false)
    const [buffedHover, setBuffedHover] = useState(false)

  return (
    cost <= money ?
        <Detail>
            {name && capitalizeWord(name)}: 
            <Number 
                buffed={buffed}
                onMouseEnter={()=>buffed && setBuffedHover(true)}
                onMouseOut={()=>buffed && setBuffedHover(false)}
            >
                {stat}</Number> 
                {addPoint && <AddButton 
                    onClick={()=>addPoint(name)} 
                    onMouseEnter={()=>{
                        setHover && setHover(true)
                        setOwnHover(true)
                    }}
                    onMouseOut={()=>{
                        setHover && setHover(false)
                        setOwnHover(false)
                    }}
                >
                <Img src={ownHover ? hovered : plus} w={17}/>
            </AddButton>}
            {hover && <Number>{cost}<Img src={bag} w={17}/></Number>}
            {buffedHover && <BuffedTooltip>{`Base: ${buffed[0]}, Equipment: ${buffed[1]}`}</BuffedTooltip>}
        </Detail>
        :
        <Detail>
            {name && capitalizeWord(name)}: <Number buffed={buffed}>{stat}</Number> 
            {addPoint && <DisabledButton
                onMouseEnter={()=>setHover && setHover(true)}
                onMouseOut={()=>setHover && setHover(false)}
            >
                <Img src={disabled} w={17}/>
            </DisabledButton>}
            {hover && <Number>{cost}<Img src={bag} w={17}/></Number>}
        </Detail>
  )
}
