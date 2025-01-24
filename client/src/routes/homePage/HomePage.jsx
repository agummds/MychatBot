import React from "react";
import "./homepage.css";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

function HomePage() {
  return (
    <div className="homepage">
      <div className="left">
        <h1>PROTECT</h1>
        <h2>Procurement Tech for Efficient Cost Tracking</h2>
        <h3>Melindungi proses pengadaan dari inefisiensi dan kecurangan</h3>
        <Link to="/dashboard">Get Started</Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">{/* <div className="bg"></div> */}</div>
          <img
            src="https://static.vecteezy.com/system/resources/previews/023/841/800/original/adorable-blue-bots-small-cute-robots-generated-by-ai-free-png.png"
            alt=""
            className="bot"
          ></img>
          <div className="chat">
            <img src="https://static.vecteezy.com/system/resources/previews/023/841/800/original/adorable-blue-bots-small-cute-robots-generated-by-ai-free-png.png"></img>
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "Bot : Kami diciptakan untuk memberantas kecurangan",
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                "Bot : Kami diciptakan untuk memberantas korupsi",
                1000,
                "Bot : Kami diciptakan untuk memberantas ketidakjelasan",
                1000,
                "Bot : Kami diciptakan untuk keadilan",
                1000,
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
      <div className="terms">
      <img src="https://icon-library.com/images/protection-shield-icon/protection-shield-icon-2.jpg" alt=""/>
      <div className="links">
      <Link to="/">Terms of Service</Link>
      <span>|</span>
      <Link to="/">Privacy Police</Link>
      </div>
      </div>
    </div>
  );
}

export default HomePage;
