import './rootLayout.css'
import {Link, Outlet} from "react-router-dom"

const RootLayout =()=> {
    return(
    <div className= 'rootLayout'>

    <header>
        <Link to="/">
            <img src="/Chatbot/src/layouts/logo.jpg" alt=''/>
            <span>PROTECT</span>
        </Link>
    </header>
    <main>
       <Outlet/>
    </main>
    
    </div>
    )
}

export default RootLayout