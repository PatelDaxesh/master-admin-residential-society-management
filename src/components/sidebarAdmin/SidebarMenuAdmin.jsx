import { Divider, List,ListItem, ListItemIcon, ListItemText, ListItemButton, Box, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"
import React from 'react'
import {useLocation} from 'react-router-dom'
import DashboardIcon from '../../assets/images/dashboard.png'
import SocietyIcon from '../../assets/images/society.png'
import AcceptRequestsIcon from '../../assets/images/acceptRequests.png'
import HousesIcon from '../../assets/images/house.png'
import ResidentsIcon from '../../assets/images/resident.png'
import FacultiesIcon from '../../assets/images/faculties.png'
import StudentsIcon from '../../assets/images/students.png'
import SubjectsIcon from '../../assets/images/subjects.png'
import ExamTypesIcon from '../../assets/images/examTypes.png'
import ExamsIcon from '../../assets/images/exams.png'
import UserIcon from '../../assets/images/user.png'
import { colors } from "../../values/Colors"

export const DrawerMenu = () => {
    const location = useLocation();
    return(
        <Box>

        <Typography variant="h5" fontFamily='PoppinsBold' color={colors.textColor} marginX={2} marginY={1} width='fit-content' padding={1} borderRadius={2} bgcolor={colors.secondaryColor}>
                Residential Society Management
        </Typography>

        <List>
            <ListItem>
                <ListItemButton sx={{borderRadius:2}} key='Dashboard' component={NavLink} to="/admin" selected={location.pathname==='/admin'?true:false}>  
                    <ListItemIcon>
                        <Box component='img' src={DashboardIcon} height='26px' width='26px'/>
                    </ListItemIcon>
                    <ListItemText primary='Dashboard'/>
                </ListItemButton>
            </ListItem>
            
            <ListItem>
                <ListItemButton sx={{borderRadius:2}} key='Society' component={NavLink} to="/admin/society" selected={location.pathname.match('/admin/society/*')?true:false}>
                    <ListItemIcon>
                        <Box component='img' src={SocietyIcon} height='26px' width='26px'/>
                    </ListItemIcon>
                    <ListItemText primary='Society'/>
                </ListItemButton>
            </ListItem>
            
            <ListItem>
                <ListItemButton sx={{borderRadius:2}} key='AcceptRequests' component={NavLink} to="/admin/acceptrequests" selected={location.pathname.match('/admin/acceptrequests/*')?true:false}>
                    <ListItemIcon>
                        <Box component='img' src={AcceptRequestsIcon} height='26px' width='26px'/>
                    </ListItemIcon>
                    <ListItemText primary='Accept Requests'/>
                </ListItemButton>
            </ListItem>

            <Divider />

            {/* <ListItem>
                <ListItemButton sx={{borderRadius:2}} key='Faculties' component={NavLink} to="/admin/faculties" selected={location.pathname.match('/admin/faculties/*')?true:false}>
                    <ListItemIcon>
                        <Box component='img' src={FacultiesIcon} height='26px' width='26px'/>
                    </ListItemIcon>
                    <ListItemText primary='Faculties'/>
                </ListItemButton>
            </ListItem>

            <ListItem>
                <ListItemButton sx={{borderRadius:2}} key='Students' component={NavLink} to="/admin/students" selected={location.pathname.match('/admin/students/*')?true:false}>
                    <ListItemIcon>
                        <Box component='img' src={StudentsIcon} height='26px' width='26px'/>
                    </ListItemIcon>
                    <ListItemText primary='Students'/>
                </ListItemButton>
            </ListItem>

            <Divider />

            <ListItem>
                <ListItemButton sx={{borderRadius:2}} key='Subjects' component={NavLink} to="/admin/subjects" selected={location.pathname.match('/admin/subjects/*')?true:false}>
                    <ListItemIcon>
                        <Box component='img' src={SubjectsIcon} height='26px' width='26px'/>
                    </ListItemIcon>
                    <ListItemText primary='Subjects'/>
                </ListItemButton>
            </ListItem>

            <Divider />

            <ListItem>
                <ListItemButton sx={{borderRadius:2}} key='ExamTypes' component={NavLink} to="/admin/examTypes" selected={location.pathname.match('/admin/examTypes/*')?true:false}>
                    <ListItemIcon>
                        <Box component='img' src={ExamTypesIcon} height='26px' width='26px'/>
                    </ListItemIcon>
                    <ListItemText primary='ExamTypes'/>
                </ListItemButton>
            </ListItem>

            <ListItem>
                <ListItemButton sx={{borderRadius:2}} key='Exams' component={NavLink} to="/admin/exams" selected={location.pathname.match('/admin/exams/*')?true:false}>
                    <ListItemIcon>
                        <Box component='img' src={ExamsIcon} height='26px' width='26px'/>
                    </ListItemIcon>
                    <ListItemText primary='Exams'/>
                </ListItemButton>
            </ListItem> */}

            <Divider />

            <ListItem>
                <ListItemButton sx={{borderRadius:2}} key='Account' component={NavLink} to="/admin/account" selected={location.pathname.match('/admin/account/*')?true:false}>
                    <ListItemIcon>
                        <Box component='img' src={UserIcon} height='26px' width='26px'/>
                    </ListItemIcon>
                    <ListItemText primary='Account'/>
                </ListItemButton>
            </ListItem>
        </List>
    </Box>
    )
}