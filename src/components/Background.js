import React from 'react'
import styled from 'styled-components'

const Div = styled.div` 
background-image: url(${props=>props.bg});
background-repeat: no-repeat;
background-size: cover;
height: calc(100% - 4px);
width: calc(100% - 4px);
padding: 2px;
`


export const Background = ({children, img}) => {
  return (
    <Div bg={img}>{children}</Div>
  )
}
