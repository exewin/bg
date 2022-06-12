import React from "react"
import {Box} from '@mui/material'

export const LoginBox = () => {
    return(
        <Box
        sx={{
            borderRadius: '5px',
            padding: '10px',
            color: 'white',
            width: 300,
            height: 300,
            backgroundColor: 'primary.dark',
            '&:hover': {
              backgroundColor: 'primary.dark',
              opacity: [1, 1, 0.7],
            },
        }}>

            Login
        
        </Box>
    )
}