import React from 'react'
import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import { cardColors } from '../../../values/Colors'
import { useSpring, animated } from 'react-spring'

export const DashboardCard = ({icon, numbers, text, handleCardClick, isCardClickable=false}) => {

  const { number } = useSpring({
    from: { number: 0 },
    number: numbers,
    delay: 500,
  })

  return (
    <Card onClick={ handleCardClick && handleCardClick} elevation={8} sx={{backgroundColor:cardColors[Math.floor(Math.random()*10)], borderRadius:4, ':hover':{cursor: isCardClickable ? 'pointer' : 'default'}}}>
      <CardContent>
        <Grid container padding={1} alignItems='center' justifyContent='space-between'>

          {/* Icon */}
          <Grid item>
              <Box component='img' src={icon} height='64px' width='64px'/>
          </Grid>

          {/* Name and Numbers */}
          <Grid item>
              <Stack>
                <Typography textAlign='end' variant='h4'><animated.div>{number.to(n => n.toFixed(0))}</animated.div></Typography>
                <Typography variant='h5' fontFamily='PoppinsLight' color='text.secondary'>{text}</Typography>
              </Stack>
          </Grid>

        </Grid>
      </CardContent>
    </Card>
  )
}