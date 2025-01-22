import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


const router = creteBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
  },
  {
    path: "/dashboard",
    element: <DashboardPage/>,
    children:[
      {path:"/dashboard/chats/:id", element:<ChatPage/>}
    ]
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
