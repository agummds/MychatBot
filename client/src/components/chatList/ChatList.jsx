import React from 'react'
import './chatList.css'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'


const ChatList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch( `{import.meta.env.VITE_API_URL}/api/userchats`,{
        credentials: "include",
      }).then((res) =>res.json()),
  });

  return (
    <div className='chatList'>
    <span className='title'>DASHBOARD</span>
    <Link to="/dashboard">Create a new Chat</Link>
    <Link to="/">Explore PROTECT</Link>
    <Link to="/">Contact</Link>
    <hr/>
    <span className='title'>RECENT CHATS</span>

    <div className='list'>
    { isPending? "Loading..." : error? "Ada yang salah" : data?.map(chat =>{
      <Link to={`/dashboard/chats/${chat._id}`} Key={chat._id}>My chat title</Link>
    })}
    </div>
    <hr/>      
    </div>
  )
}

export default ChatList
