import React from 'react'
import { useDrop } from 'react-dnd';
import styled from 'styled-components';

const Area = styled.div` 
width: 100%;
height: 50px;
background-color: gray;
border-radius: 10px;
`

export const DiscardArea = ({discardItem}) => {

    const [{ isOver }, dropRef] = useDrop({
        accept: 'item',
        drop: (item) => {
          discardItem(item.id, item.type)
        }
    })

  return (
    <Area ref={dropRef}>Discard Item</Area>
  )
}
