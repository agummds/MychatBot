import React from 'react'
import { useRef, useEffect } from 'react'
import './newPrompt.css'

const NewPrompt = () => {
    const endRef=useRef(null)
  
    useEffect(() =>{
      endRef.current.scrollIntoView({behavior:"smooth"});
    }, []);
    
  return (
    <>
    <div className='endChat' ref={endRef}></div>
    <form className='newForm'>
    <label htmlFor='file'>
    <img src='https://cdn3.iconfinder.com/data/icons/basic-regular-2/64/85-1024.png' alt=''/>
    </label>
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
