import React from "react";
import "./dashboardpage.css";
import {useMutation, useQueryClient} from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";
// import {useAuth} from "@clerk/clerk-react"

function DashboardPage() {

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  // const {userId} = useAuth()
  const mutation = useMutation({
    mutationFn: (text) =>{
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }).then((res) => res.json());
    },
    onSuccess:(id) => {
      queryClient.invalidateQueries({ queryKey: ['userChats']})
      navigate(`/dashboard/chats/${id}`)
    }
  })


  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;
    mutation.mutate(text);

  };

  return (
    <div className="dashboardPage">
      <div className="texts">
        <div className="logo">
          <img
            src="https://icon-library.com/images/protection-shield-icon/protection-shield-icon-2.jpg"
            alt=""
          />
          <h1>RAKYAT </h1>
        </div>
        <div className="options">
          <div className="option">
            <img
              src="https://static.vecteezy.com/system/resources/previews/037/296/960/original/ai-generated-chatting-conversation-logo-free-png.png"
              alt=""
            />
            <span>Create a New Chat</span>
          </div>
          <div className="option">
            <img
              src="https://static.vecteezy.com/system/resources/previews/037/296/960/original/ai-generated-chatting-conversation-logo-free-png.png"
              alt=""
            />
            <span>Create a New Chat</span>
          </div>
          <div className="option">
            <img
              src="https://static.vecteezy.com/system/resources/previews/037/296/960/original/ai-generated-chatting-conversation-logo-free-png.png"
              alt=""
            />
            <span>Create a New Chat</span>
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input type="text" name="text" placeholder="Tanyakan keraguan anda!" />
          <button>
            <img src="https://www.pngmart.com/files/3/Up-Arrow-PNG-Transparent-Image.png" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default DashboardPage;
