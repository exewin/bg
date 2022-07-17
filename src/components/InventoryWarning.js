import React from 'react'
import styled from 'styled-components'

const InvWarning = styled.div` 
color: orange;
text-shadow: 1px 1px black;
`


export const InventoryWarning = () => {

    const invWarning = "Any item found on mission will be lost."

  return (
    <InvWarning title={invWarning}>Warning! Your inventory is full.</InvWarning>
  )
}