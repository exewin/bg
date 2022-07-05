import React from 'react'
import styled from 'styled-components'

const Color = styled.span`
color: ${props=>props.light === props.match ? 'yellow' : 'white'};
`

export const ColorHighlight = ({children, light, match}) => {
  return (
    <Color light={light} match={match}>{children}</Color>
  )
}
