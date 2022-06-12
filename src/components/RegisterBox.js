import React from "react"
import {Box} from '@mui/material'

export const RegisterBox = () => {
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

            Create Account:
        
        </Box>
    )
}