import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
display:flex;
align-items: center;
justify-content: center;
height: 100%;
`

export const CenteredLoading = () => {
  return (
    <Div>
        Loading...
    </Div>
  )
}
