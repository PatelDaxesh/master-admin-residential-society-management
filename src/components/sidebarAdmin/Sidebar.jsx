import React from 'react'
import { Drawer, Box } from "@mui/material"
import { DrawerMenu } from './SidebarMenuAdmin'

export const Sidebar = ({ drawerWidth, isOpen, toggleDrawer, selectedIndex, handleListItemClick}) => {
  return (
    <Box>
      <Drawer anchor='left' variant='temporary' sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, backgroundColor:'background'}} open={isOpen} onClick={toggleDrawer}>
        <Box width={drawerWidth}>
          {<DrawerMenu selectedIndex={selectedIndex} handleListItemClick={handleListItemClick}/>}
        </Box>
      </Drawer>

      <Drawer anchor='left' variant="permanent" sx={{ display: { xs: 'none', sm: 'none', md: 'block' },'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, overflowX:'hidden'}}}>
        <Box width={drawerWidth}>
          {<DrawerMenu selectedIndex={selectedIndex} handleListItemClick={handleListItemClick}/>}
        </Box>
      </Drawer>
    </Box>
  )
}
