import React from 'react'
import { useRef, useEffect } from 'react'
import './newPrompt.css'
import Upload from '../upload/Upload'

const NewPrompt = () => {
    const endRef=useRef(null)
  
    useEffect(() =>{
      endRef.current.scrollIntoView({behavior:"smooth"});
    }, []);
    
  return (
    <>
    <div className='endChat' ref={endRef}></div>
    <form className='newForm'>
    <Upload/>
    <input id='file' type='file' multiple={false} hidden/>
    <input type='text' placeholder='Tanya lah...'/>
    <button>
        <img src='https://www.pngmart.com/files/3/Up-Arrow-PNG-Transparent-Image.png' alt=''/>
    </button>


    </form>
    </>
  )
}

export default NewPrompt
