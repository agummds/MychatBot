import { Outlet } from 'react-router-dom'
import React from 'react'
import './dashboardLayout.css'

const DashboardLayout = () => {
  return (
    <div className=''DashboardLayout>
    <div className='menu'>MENU</div>
    <div className='content'>
    <Outlet/>
    </div>
      
    </div>
  )
}

export default DashboardLayout
