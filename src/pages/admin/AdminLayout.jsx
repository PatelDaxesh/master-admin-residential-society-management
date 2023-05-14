import React, { useState } from 'react'
import { Outlet } from "react-router-dom"
import { Navbar } from '../../components/navbar/Navbar'
import { Sidebar } from '../../components/sidebarAdmin/Sidebar'
import { Box } from "@mui/material"

export const AdminLayout = ({user}) => {
  const username = user
  // const username = "dax"
  const drawerWidth = '250px'

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = ()=>{
    setIsOpen(state=> !state)
  }

  return (
    <>
      <Navbar username={username} toggleDrawer={toggleDrawer} />
      <Sidebar drawerWidth={drawerWidth} isOpen={isOpen} toggleDrawer={toggleDrawer}/>
      <Box sx={{marginLeft:{xs:'0', sm:'0', md:drawerWidth}}}>
        <Outlet context={user}/>
      </Box>
    </>
  )
}