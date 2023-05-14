import React from 'react'
import { Card, CardContent, Button, Stack, Typography, Avatar } from '@mui/material'
import { colors } from '../../../values/Colors'

export const SubDashboardCard = ({society,handleCardClick, isCardClickable=false}) => {

  // Method to find ordinal for semester (1st, 2nd, 3rd, 4th)
  const ordinal = (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n%100;
    return n + (s[(v-20)%10] || s[v] || s[0]);
  }

  return (
    <Card elevation={8} onClick={ handleCardClick && handleCardClick} sx={{backgroundColor:'background', height:'100%', borderRadius:4, ':hover':{cursor: isCardClickable ? 'pointer' : 'default'}}}>
      <CardContent>
        <Stack direction='column' spacing={2} alignItems='start'>

          {/* SubjectCode and SubjectSemester */}
          {/* <Stack direction='row' spacing={2} alignItems='start'>
            <Typography variant='body' fontFamily='PoppinsSemiBold' color='text.primary' paddingX={1} paddingY={0.5} borderRadius={2} bgcolor={colors.secondaryColor} width='fit-content'>{subject.SubjectCode}</Typography>
            <Typography variant='body' fontFamily='PoppinsSemiBold' color='text.primary' paddingX={1} paddingY={0.5} borderRadius={2} bgcolor={colors.secondaryColor} width='fit-content'>{`${ordinal(subject.SubjectSemester)} Sem`}</Typography>
          </Stack> */}
          
          {/* SubjectName and SubjectCredits */}
          <Stack direction='row' spacing={2} display='flex' alignItems='start'>
            <Typography variant='h4' sx={{wordBreak:'break-word'}}>Society Name: {society.society_name}</Typography>
            {/* <Avatar sx={{backgroundColor:colors.activeColor, color:'text.primary', fontFamily:'PoppinsRegular'}}>{subject.SubjectCredits}</Avatar> */}
          </Stack>

          {/* DepartmentName */}
          <Typography variant='h6' fontFamily='PoppinsSemiBold' color='text.secondary' noWrap>Society Address: {society.society_address}</Typography>

          {/* SubjectDescription */}
          <Typography variant='h6' fontFamily='PoppinsRegular' color='text.secondary' width='100%' noWrap>General Secretory: {society.gs}</Typography>

      
          
        </Stack>
      </CardContent>
    </Card>
  )
}
