import React from 'react'
import { useDrop } from 'react-dnd'
import styled from 'styled-components'
import destroy from '../assets/ui/destroy.svg'

const Area = styled.div` 
width: 100%;
height: 50px;
background-color: #111;
border: 1px solid #444;
border-radius: 10px;
display:flex;
align-items: center;
justify-content: center;
`

const Img = styled.img` 
width: 44px;
`

export const DiscardArea = ({ discardItem }) => {
  const [{ isOver }, dropRef] = useDrop({ // eslint-disable-line
    accept: 'item',
    drop: (item) => {
      discardItem(item.id, item.type)
    }
  })

  return (
    <Area title="destroy item" ref={dropRef}><Img src={destroy}/></Area>
  )
}
