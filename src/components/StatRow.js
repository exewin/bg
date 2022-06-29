import React, { useState } from 'react'
import styled from 'styled-components'
import bag from "../assets/icons/bag.png"
import plus from "../assets/ui/plus.png"
import disabled from "../assets/ui/disabled_plus.png"
import hovered from "../assets/ui/hovered_plus.png"


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
`

const Number = styled.span` 
color:white;
font-family: 'Zen Kaku Gothic New', sans-serif;
padding-right: 2px;
text-align:right;
`

const Img = styled.img` 
width:${props=>props.w}px;
`


export const StatRow = ({name, stat, cost, money, hover, setHover, addPoint}) => {

    const [ownHover, setOwnHover] = useState(false)

    const capitalizeWord = (str) => {
        return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
      }

  return (
    cost <= money ?
        <Detail>
            {name && capitalizeWord(name)}: <Number>{stat}</Number> 
            <AddButton 
                onClick={()=>addPoint(name)} 
                onMouseEnter={()=>{
                    setHover(true)
                    setOwnHover(true)
                }}
                onMouseOut={()=>{
                    setHover(false)
                    setOwnHover(false)
                }}
            >
                <Img src={ownHover ? hovered : plus} w={17}/>
            </AddButton>
            {hover && <Number>{cost}<Img src={bag} w={17}/></Number>}
        </Detail>
        :
        <Detail>
            {name && capitalizeWord(name)}: <Number>{stat}</Number> 
            <DisabledButton
                onMouseEnter={()=>setHover(true)}
                onMouseOut={()=>setHover(false)}
            >
                <Img src={disabled} w={17}/>
            </DisabledButton>
            {hover && <Number>{cost}<Img src={bag} w={17}/></Number>}
        </Detail>
  )
}