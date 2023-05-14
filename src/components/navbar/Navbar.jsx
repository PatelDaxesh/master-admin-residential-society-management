import React from 'react'
import { AppBar, Toolbar, Typography, Avatar, IconButton, Box, Stack } from "@mui/material"
import { colors } from '../../values/Colors';
import HamburgerIcon from '../../assets/images/hamburger.png'
import UserIcon from '../../assets/images/user.png'


export const Navbar = ({ username, toggleDrawer }) => {
  return (
    <AppBar style={{ background: colors.backgroundColor }} position='sticky' sx={{display:'flex'}}>
        <Toolbar variant='dense'>

            <Box flex={1}>
                <IconButton onClick={toggleDrawer} sx={{display:{xs:"flex", sm:"flex", md:"none"}, alignItems:'center'}}>
                    <Box display='flex' alignItems='center' component='img' src={HamburgerIcon} height='28px' width='28px'></Box>
                </IconButton>
            </Box>
            
            <Stack spacing={1} direction='row' display='flex' alignItems='center' bgcolor={colors.secondaryColor} padding={0.5} borderRadius={2}>
              <Avatar sx={{ backgroundColor: colors.secondaryTextColor, width:28, height:28 }}><Box component='img' src={UserIcon} height='28px' width='28px'></Box></Avatar>
              <Typography variant='body1' fontFamily='PoppinsSemiBold' color={colors.textColor}>{username}</Typography>
            </Stack>
        </Toolbar>

    </AppBar>
  )
}