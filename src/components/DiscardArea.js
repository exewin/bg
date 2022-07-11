import React from 'react'
import { useDrop } from 'react-dnd';

export const DiscardArea = ({discardItem}) => {

    const [{ isOver }, dropRef] = useDrop({
        accept: 'item',
        drop: (item) => {
          discardItem(item.id, item.type)
        }
    })

  return (
    <div ref={dropRef}>DiscardArea</div>
  )
}
