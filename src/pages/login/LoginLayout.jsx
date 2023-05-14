import React from 'react'
import { Outlet } from "react-router-dom"

export const LoginLayout = ({user}) => {
  return (
    <>
    <Outlet context={user}/>
    </>
  )
}