import React from 'react'
import styled from 'styled-components'

const Color = styled.span`
color: ${props => props.light === props.match ? 'yellow' : 'white'};
${props => props.css};
`

export const ColorHighlight = ({ children, light, match, css }) => {
  return (
    <Color light={light} match={match} css={css}>{children}</Color>
  )
}
