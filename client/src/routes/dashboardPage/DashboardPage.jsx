import React from "react";
import './dashboardpage.css'

function DashboardPage() {
  return (
    <div className="dashboardPage">
      <div className="texts">
        <div className="logo">
          <img src="https://icon-library.com/images/protection-shield-icon/protection-shield-icon-2.jpg" alt="" />
          <h1>RAKYAT </h1>
        </div>
        <div className="options">
          <div className="option">
            <img
              src="https://static.vecteezy.com/system/resources/previews/037/296/960/original/ai-generated-chatting-conversation-logo-free-png.png"
              alt=""/>
              <span>Create a New Chat</span>
          </div>
          <div className="option">
            <img
              src="https://static.vecteezy.com/system/resources/previews/037/296/960/original/ai-generated-chatting-conversation-logo-free-png.png"
              alt=""/>
              <span>Create a New Chat</span>
          </div>
          <div className="option">
            <img
              src="https://static.vecteezy.com/system/resources/previews/037/296/960/original/ai-generated-chatting-conversation-logo-free-png.png"
              alt=""/>
              <span>Create a New Chat</span>
          </div>
        </div>
      </div>
      <div className="formContainer">
      <form>
        <input type='text' placeholder="Tanyakan keraguan anda!"/>
        <button>
          <img src="https://www.pngmart.com/files/3/Up-Arrow-PNG-Transparent-Image.png"/>
        </button>
      </form>
      </div>
    </div>
  );
}

export default DashboardPage;
