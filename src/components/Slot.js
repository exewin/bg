import React, { useState } from 'react'
import styled from 'styled-components'
import slot from "../assets/ui/slot.png"
import i0 from "../assets/icons/items/0.png"
import i1 from "../assets/icons/items/1.png"
import i2 from "../assets/icons/items/2.png"
import i3 from "../assets/icons/items/3.png"
import i4 from "../assets/icons/items/4.png"
import i5 from "../assets/icons/items/5.png"
import i6 from "../assets/icons/items/6.png"
import i7 from "../assets/icons/items/7.png"
import i8 from "../assets/icons/items/8.png"
import i9 from "../assets/icons/items/9.png"
import i10 from "../assets/icons/items/10.png"
import i11 from "../assets/icons/items/11.png"
import i12 from "../assets/icons/items/12.png"
import i13 from "../assets/icons/items/13.png"
import i14 from "../assets/icons/items/14.png"
import i15 from "../assets/icons/items/15.png"
import i16 from "../assets/icons/items/16.png"
import i17 from "../assets/icons/items/17.png"
import i18 from "../assets/icons/items/18.png"
import i19 from "../assets/icons/items/19.png"
import i20 from "../assets/icons/items/20.png"
import i21 from "../assets/icons/items/21.png"
import i22 from "../assets/icons/items/22.png"
import i23 from "../assets/icons/items/23.png"
import i24 from "../assets/icons/items/24.png"
import i25 from "../assets/icons/items/25.png"
import i26 from "../assets/icons/items/26.png"
import i27 from "../assets/icons/items/27.png"
import i28 from "../assets/icons/items/28.png"
import i29 from "../assets/icons/items/29.png"
import i30 from "../assets/icons/items/30.png"
import i31 from "../assets/icons/items/31.png"
import i32 from "../assets/icons/items/32.png"
import i33 from "../assets/icons/items/33.png"
import i34 from "../assets/icons/items/34.png"
import i35 from "../assets/icons/items/35.png"
import i36 from "../assets/icons/items/36.png"

import helmPlaceholder from "../assets/icons/items/helmplaceholder.png"
import chestPlaceholder from "../assets/icons/items/chestplaceholder.png"
import glovesPlaceholder from "../assets/icons/items/glovesplaceholder.png"
import bootsPlaceholder from "../assets/icons/items/bootsplaceholder.png"
import weaponPlaceholder from "../assets/icons/items/weaponplaceholder.png"
import legsPlaceholder from "../assets/icons/items/legsplaceholder.png"

const items = [i0,i1,i2,i3,i4,i5,i6,i7,i8,i9,
  i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,
  i20,i21,i22,i23,i24,i25,i26,i27,i28,i29,
  i30,i31,i32,i33,i34,i35,i36]

const Container = styled.div` 
display:flex;
position: relative;
flex-wrap: wrap;
user-select: none;
${props=>props.gridPos && props.gridPos};
`

const Div = styled.div` 
background-image: url(${props=>props.bg});
background-repeat: no-repeat;
background-size: cover;
width: 63px;
height: 63px;
color: white;
display:flex;
align-items: center;
justify-content: center;
`
const Img = styled.img` 
border-radius: 10px;
width:55px;
`

const Hover = styled.div` 
width: 200px;
height: 100px;
background-color: rgba(33,33,33,0.5);
border-radius: 10px;
position: absolute;
left:66px;
color:white;
font-family: 'Joan', serif;
padding: 5px 10px;
z-index: 1;
`
const ItemDetailHeader = styled.div` 
color: yellow;
font-size: larger;
`
const ItemDetail = styled.div` 
display: grid;
grid-template-columns: 1fr 1fr;
align-items: center;
`

const Number = styled.div` 
font-family: 'Zen Kaku Gothic New', sans-serif;
`

export const Slot = ({item, type, id, interactable = null}) => {

  const [hover, setHover] = useState(false)

  if(item && type && type !== item.slot){
    console.error("something is wrong with item slot.", type)
  }

  const display = () => {
    if(type){
      switch(type){
        case "Head":{
          return {position: "grid-row: 1 / 2; grid-column: 2 / 3;", placeholder: helmPlaceholder}
        }
        case "Weapon":{
          return {position: "grid-row: 2 / 3; grid-column: 1 / 2;", placeholder: weaponPlaceholder}
        }
        case "Chest":{
          return {position: "grid-row: 2 / 3; grid-column: 2 / 3;", placeholder: chestPlaceholder}
        }
        case "Gloves":{
          return {position: "grid-row: 2 / 3; grid-column: 3 / 4;", placeholder: glovesPlaceholder}
        }
        case "Legs":{
          return {position: "grid-row: 3 / 4; grid-column: 2 / 3;", placeholder: legsPlaceholder}
        }
        case "Boots":{
          return {position: "grid-row: 4 / 5; grid-column: 2 / 3;", placeholder: bootsPlaceholder}
        }
      }
    }
    return false
  }

  const doubleClick = event => {
    if(event.detail == 2){
      interactable(id)
    }
}

  const displayData = display()

  return (
    <Container gridPos={displayData.position}>
      <Div onClick={doubleClick} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} bg={slot}>
        {item ? <Img draggable="false" src={items[item?.imgId]}/> : type && <Img src={displayData.placeholder}/>}
      </Div>
      {hover && item && 
        <Hover>
          <ItemDetailHeader>{item?.name}</ItemDetailHeader>
          {item?.strength > 0 && <ItemDetail>Strength: <Number>{item?.strength}</Number></ItemDetail>}
          {item?.wisdom > 0 && <ItemDetail>Wisdom: <Number>{item?.wisdom}</Number></ItemDetail>}
          {item?.endurance > 0 && <ItemDetail>Endurance: <Number>{item?.endurance}</Number></ItemDetail>}
        </Hover>
      }
    </Container>
  )
}
