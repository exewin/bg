import React from 'react'
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

const items = [i0,i1,i2,i3,i4,i5,i6,i7,i8,i9,
  i10,i11,i12,i13,i14,i15,i16,i17,i18,i19,
  i20,i21,i22,i23,i24,i25,i26,i27,i28,i29,
  i30,i31,i32,i33,i34,i35,i36]

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

export const Slot = ({item}) => {
  return (
    <Div bg={slot}>{item && <Img src={items[item?.imgId]}/>}</Div>
  )
}
