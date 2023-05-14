import React from 'react'
import { Typography } from '@mui/material'

export const PageHeader = ({ text }) => {
  return (
    <Typography sx={{paddingX:{xs:3, sm:6, md:9}, paddingY:{xs:3}}} variant='h3' fontFamily='PoppinsLight'>
        {text}
    </Typography>
  )
}