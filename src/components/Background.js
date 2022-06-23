import React from 'react'
import styled, { css, keyframes } from 'styled-components'


const a = keyframes`
  from {opacity: 0;}
  to {opacity: 1;}
`

const s = css`
animation: ${a} 0.8s;
`

const Div = styled.div` 
  background-image: url(${props=>props.bg});
  background-repeat: no-repeat;
  background-size: cover;
  height: calc(100% - 4px);
  width: calc(100% - 4px);
  padding: 2px;
  ${s};
`


export const Background = ({children, img}) => {
  return (
    <Div bg={img}>{children}</Div>
  )
}
